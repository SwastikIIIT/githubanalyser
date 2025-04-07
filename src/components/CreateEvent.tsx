import { GitFork } from "lucide-react"


interface CreateEvent {
    username:string,
    createEvents: {
        date: string,
        repoName: string,
        description:string
    }[]
}


const CreateEvent = ({username,createEvents}:CreateEvent) => {
  return (
    <>
    <div className="pt-2">
                 <h3 className="text-lg font-medium mb-4 flex items-center">
                      <GitFork className="mr-2 h-5 w-5" />
                      Repository Creation Timeline
                </h3>
                        
                 {createEvents.length===0 ? (
                         <div className="flex flex-col items-center justify-center h-32 bg-gray-50 rounded-lg border border-gray-200">
                            <GitFork size={24} className="text-gray-300 mb-2" />
                         <p className="text-gray-500 text-center">No repository creation events found</p>
                        </div>
                        ) : (
                        <div className="relative border-l-2 border-blue-200 pl-6 ml-4 space-y-6">
                            {createEvents.map((obj,index)=>(
                              <div key={index} className="relative">
                                <div className="absolute -left-8.25 mt-11 w-4 h-4 rounded-full bg-blue-500"></div>
                                <div className="mb-1 text-sm text-gray-500">{obj.date}</div>
                                <div className="p-3 border rounded-md hover:bg-gray-50">
                                  <p className="font-medium">
                                    <a href={`https://github.com/${username}/${obj.repoName}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                                      {obj.repoName}
                                    </a>
                                  </p>
                                 {obj.description && (
                                    <p className="text-sm mt-1 text-gray-600">{obj.description}</p>
                                )}
                          </div>
                         </div>
                      ))}
                   </div>
                 )}
            </div>
    </>
  )
}

export default CreateEvent