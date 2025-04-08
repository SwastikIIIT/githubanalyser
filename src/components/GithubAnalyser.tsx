import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Github} from 'lucide-react';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Commit, fetchEvents, fetchUserData, fetchUserRepos, GitHubEvent, processCommits, Repository, UserData } from '@/services';
import Loader1 from './Loader1';
import PushEvent from './PushEvent';
import WatchEvent from './WatchEvent';
import CreateEvent from './CreateEvent';
import RepoCard from './RepoCard';

const GitHubProfileAnalyzer = () => {
  const [username,setUsername]=useState<string>('');
  const [userData,setUserData]=useState<UserData | null>(null);
  const [repos,setRepos]=useState<Repository[]>([]);
  const [commitData, setCommitData] = useState<Commit>({pushEvents:{date:[],commits:[]},createEvents:[],watchEvents:[]});  
  const [loading1,setLoading1]=useState<boolean>(false);
  const [currentPage,setCurrentPage]=useState<number>(1);
  const itemsperPage=6;
  const totalPages=Math.ceil(repos.length/itemsperPage);
  const arr=[];
   for(let i=1;i<=totalPages;i++)
    arr.push(i);

  const lastIndex=itemsperPage*currentPage;
  const firstIndex=lastIndex-itemsperPage;
  const filteredRepos=repos.slice(firstIndex,lastIndex);

  const handleSearch=async()=>{
      setUserData(null);
      setRepos([]);
      setCommitData({pushEvents:{date:[],commits:[]},createEvents:[],watchEvents:[]});
      setCurrentPage(1);

      if(!username.trim())
      {
        toast.error("Error",{description: "Please enter a GitHub username"});
        return;
      }
      setLoading1(true);
    
     try
     {
        const userResponse=await fetchUserData(username);
        if(!userResponse.success)
        {
          toast('Error',{description:userResponse.message});
          setLoading1(false);
          return;
        }
        setUserData(userResponse.result);
        
        const repoResponse=await fetchUserRepos(username);
        if(!repoResponse.success)
        {
          toast('Error',{description:repoResponse.message});
          return;
        }
        setRepos(repoResponse.result);
       
        await fetchCommitActivity();
      
     }
      catch(error)
      {
        console.log(error);
        toast.error("Error",{description: "Failed to fetch GitHub data" });
        setUserData(null);
        setRepos([]);
        setCommitData({pushEvents:{date:[],commits:[]},createEvents:[],watchEvents:[]});
     }
     finally{
      setLoading1(false);
    }
  };

  const fetchCommitActivity=async()=>{
    try
    {
        const eventResponse=await fetchEvents(username);
        if(!eventResponse.success)
        {
           toast.error("Error",{description:eventResponse.message});
           return null;
        }

        console.log("Response",eventResponse.result);
        const pushEvents=eventResponse.result.filter((item:GitHubEvent)=>(item.type==='PushEvent'));
        const createEvents=eventResponse.result.filter((item:GitHubEvent)=>(item.type==='CreateEvent'));
        const watchEvents=eventResponse.result.filter((item:GitHubEvent)=>(item.type==='WatchEvent'));
        console.log("Push Events",pushEvents);

       const {pushHistory,createHistory,watchHistory}=processCommits(pushEvents,createEvents,watchEvents);
       setCommitData({pushEvents:pushHistory,createEvents:createHistory,watchEvents:watchHistory});
        
    }
    catch(err)
    {
      console.log(err);
      toast.error("Failed to fetch commit activity");
    }
  }

  return (
    <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">GitHub Analyzer Test</h1>
      <Card className="w-full shadow-lg border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github size={30} />
            GitHub Profile Analyzer
          </CardTitle>
          <CardDescription className='ml-1 mt-1 text-gray-600'>
            Enter a GitHub username to view their repositories and activity
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex gap-3 mb-6">
            <Input
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              onKeyDown={(e)=>e.key==='Enter' && handleSearch()}
              className="focus-visible:outline-none focus-visible:border focus-visible:border-blue-200 transition-colors"
            />
            <Button className="cursor-pointer text-white font-medium" onClick={handleSearch} disabled={loading1}>
              {loading1?'Loading...':'Analyze'}
              {!loading1 && <Search className="ml-2 h-4 w-4"/>}
            </Button>
          </div>
          
          {loading1 && (<Loader1/>)}
          
          {userData  && !loading1 && (
            <>
              <div className="flex flex-col md:flex-row gap-6 mb-8 mt-8 p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex justify-center">
                      <img 
                        src={userData.avatar_url} 
                        alt={userData.name} 
                        className="rounded-full w-36 h-36 border-4 border-white shadow-md object-cover"
                      />
                  </div>
                  <div className="flex flex-col justify-center mx-auto md:mx-0">
                    <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">{userData.name}</h2>
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                      <p className="text-base font-medium text-center md:text-left">@{userData.login}</p>
                    </a>
                    {userData.bio && <p className="mt-2 text-gray-700 font-serif text-center md:text-left">{userData.bio}</p>}
                    <div className="flex flex-wrap gap-5 mt-3 text-sm justify-center md:justify-normal">
                      <div className="flex items-center">
                        <span className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full">
                          {userData.public_repos} repositories
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 font-medium px-3 py-1 rounded-full">
                          {userData.followers} followers
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-purple-100 text-purple-800 font-medium px-3 py-1 rounded-full">
                          {userData.following} following
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
            
              
              <Tabs defaultValue="repositories">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="repositories" className='cursor-pointer'>Repositories</TabsTrigger>
                  <TabsTrigger value="commits" className=' cursor-pointer'>Activity Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="repositories" className="mt-4">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 pl-1">Recent Repositories</h3>
                  {repos.length===0?(
                    <div className="p-10 text-center bg-gray-50 rounded-lg border border-gray-100">
                       <p className="text-gray-500">No repositories found</p>
                    </div>
                  ):(
                    <>
                    <div className="space-y-4">
                      <RepoCard repos={filteredRepos}/>
                    </div>

                    <Pagination className="flex justify-center items-center mt-6">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            className={`cursor-pointer ${currentPage===1?'opacity-50 pointer-events-none':''}`}
                            onClick={()=>setCurrentPage((prev)=>Math.max(1,prev-1))}
                          />
                          </PaginationItem>
                         {arr.map((page:number,index:number)=>{
                          return (
                            <PaginationItem className="cursor-pointer" key={index}>
                              <PaginationLink 
                                isActive={page===currentPage}
                                onClick={()=>setCurrentPage(page)}
                                >
                                    {page}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        })
                        }
                        <PaginationItem>
                          <PaginationNext 
                             className={`cursor-pointer ${currentPage===totalPages?'opacity-50 pointer-events-none':''}`}
                             onClick={()=>setCurrentPage((prev)=>Math.min(totalPages,prev+1))}
                          />
                          </PaginationItem>
                      </PaginationContent>
                  </Pagination>
                  </>
                  )}
                </TabsContent>
                
                <TabsContent value="commits" className="mt-4">
                <h3 className="flex justify-center text-xl font-semibold mb-4 text-gray-800 pl-1">
                    Activity Dashboard
                  </h3>

                      <div className="space-y-8">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
                              <h4 className="font-medium text-blue-800">Commit Activity</h4>
                            </div>
                            <div className="p-4">
                              <PushEvent pushEvents={commitData.pushEvents} />
                            </div>
                        </div>
                      
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="bg-green-50 px-4 py-3 border-b border-gray-200">
                              <h4 className="font-medium text-green-800">Starred Activity</h4>
                            </div>
                            <div className="p-4">
                              <WatchEvent username={username} watchEvents={commitData.watchEvents} />
                            </div>
                      </div>
                      
                       <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="bg-purple-50 px-4 py-3 border-b border-gray-200">
                              <h4 className="font-medium text-purple-800">Create Events</h4>
                            </div>
                            <div className="p-4">
                              <CreateEvent username={username} createEvents={commitData.createEvents} />
                            </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  </>
          )}
        </CardContent>

        <CardFooter className="flex justify-center items-center text-sm text-gray-500">
           Swastik Sharma
        </CardFooter>
      </Card>
    </div>
  );
}

export default GitHubProfileAnalyzer;
