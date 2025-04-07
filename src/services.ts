
export interface UserData{
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
};


export interface Repository{
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
};


export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    description:string,
    push_id: number;
    size: number;
    distinct_size: number;
    ref: string;
    head: string;
    before: string;
    commits: {
      sha: string;
      author: {
        email: string;
        name: string;
      };
      message: string;
      distinct: boolean;
      url: string;
    }[];
  };
  public: boolean;
  created_at: string;
}


export interface Commit{
  pushEvents:{
    date: string[],
    commits: number[]
  },
  createEvents:{
     date:string,
     repoName:string,
     description:string
  }[],
  watchEvents:{
    date: string,
    starredRepo: string,
  }[]
};

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  'Content-Type': 'application/json'
};


export const fetchUserData=async(username:string)=>{
  try {
    const response=await fetch(`https://api.github.com/users/${username}`);
    if(!response.ok) {
      return {success:false,message:'User not found'};
    }
    const result=await response.json();
    return {success:true,result:result};
  }catch (error) {
    console.log(error);
    return {success:false,message:`Failed to fetch user data`}
  }
};


export const fetchUserRepos=async(username:string)=>{
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if(!response.ok)
    return {success:false,message:'No repo found'};
    const result=await response.json();
    return {success:true,result:result};
  } catch (error) {
    console.log(error);
    return {success:false,message:`Failed to fetch repositories`};
  }
};

export const processCommits=(pushEvents:GitHubEvent[],createEvents:GitHubEvent[],watchEvents:GitHubEvent[])=>{
    
  const recentCommits=new Map<string,number>();
  pushEvents.forEach((event:GitHubEvent)=>{
     const date=event.created_at.split("T")[0];
     const commits=event.payload.commits.length;
     recentCommits.set(date,(recentCommits.get(date) || 0)+commits);
  });
     let pushHistory;
     const sortedDates=Array.from(recentCommits.keys()).sort();
     if(sortedDates.length>0)
     {
        const formatDate=sortedDates.map((dateString)=>{
            const formatted=new Date(dateString);
            return `${formatted.toLocaleString('default',{month:'short'})} ${formatted.getDate()}`;
        })

          pushHistory={
          date:formatDate,
          commits:sortedDates.map((item)=>recentCommits.get(item) || 0)
        }
    }
    else
    {
          pushHistory={
            date:[],
            commits:[]
          }
    }

    const createHistory:{date:string,repoName:string,description:string}[]=[];
    createEvents.forEach((event:GitHubEvent)=>{
      const date=event.created_at.split("T")[0];
      const repoName=event.repo.name.split("/")[1];
      const description=event.payload.description;
      createHistory.push({date,repoName,description});
    })
    
      const watchHistory:{date:string,starredRepo:string}[]=[];
      watchEvents.forEach((event:GitHubEvent)=>{
       const date=event.created_at.split("T")[0];
       const starredRepo=event.repo.name.split("/")[1];
       watchHistory.push({date,starredRepo});
      })
   
      return({pushHistory,createHistory,watchHistory});
 }

 export const fetchEvents=async(username:string)=>{
      try{
          const response=await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
          if(!response.ok) {
            return {success:false,message:'Events not found'};
          }
          const result=await response.json();
          return {success:true,result:result};
      }
      catch(err)
      {
        console.log(err);
        return {success:false,message:`Failed to fetch user events`}
      }
 }
