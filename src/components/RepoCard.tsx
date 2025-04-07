import { Card, CardContent} from '@/components/ui/card';
import { Repository } from '@/services';
import { Calendar, Code, GitFork, Star } from 'lucide-react';


const RepoCard=({repos}:{repos:Repository[]}) => {
  return (
    <>
    {repos.map(repo=>(
        <Card key={repo.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-5">
                     <div className="flex justify-between items-start">
                         <div className='flex-1'>
                            <h4 className="font-semibold text-lg">
                              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 hover:underline transition-colors"
                              >
                                 {repo.name}
                              </a>
                            </h4>
                            <p className="text-gray-600 mt-2 line-clamp-2  w-[95%]">
                              {repo.description || 'No description available'}
                            </p>
                        </div>
                        <div className="ml-4 text-right flex flex-col gap-2 mt-6">
                            <div className="flex items-center justify-end text-gray-700">
                              <Star size={16} className="mr-1 text-yellow-500" />
                              <span className="font-medium">{repo.stargazers_count}</span>
                            </div>
                            <div className="flex items-center justify-end text-gray-700">
                              <GitFork size={16} className="mr-1 text-gray-500" />
                              <span className="font-medium">{repo.forks_count}</span>
                            </div>
                       </div>
                       </div>
                       <div className="flex flex-wrap justify-between mt-4 pt-3 border-t border-gray-300 text-sm text-gray-700">
                          <div className="flex items-center">
                              <Code size={16} className="mr-1 text-black font-bold"/>
                              <span className="bg-gray-100 px-2 py-1 rounded">
                                  {repo.language || 'Not specified'}
                              </span>
                          </div>
                          <div className='flex items-center'>
                              <Calendar size={16} className='mr-1  text-black font-bold'/>
                              <span>Updated : {new Date(repo.updated_at).toLocaleDateString()}</span>
                           </div>
                        </div>
                </CardContent>
         </Card>
        ))}
    </>
  )
}

export default RepoCard
