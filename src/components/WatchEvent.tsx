import { Star } from 'lucide-react'

interface WatchEvent {
    username:string,
    watchEvents: {
        date: string,
        starredRepo: string,
    }[]
  }

const WatchEvent = ({username,watchEvents}:WatchEvent) => {
  return (
    <>
    <div className="pt-2">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                          <Star className="mr-2 h-5 w-5" />
                          Recently Starred Repositories
                </h3>
                        
                {watchEvents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                        <Star size={24} className="text-gray-300 mb-2" />
                        <p className="text-gray-500 text-center">No starred repositories found</p>
                      </div>
                    ) : (
                    <div className="space-y-3">
                      {watchEvents.map((obj,index)=>(
                         <div key={index} className="flex items-start p-3 border rounded-md hover:bg-gray-50">
                             <Star className="h-5 w-5 text-yellow-500 mr-3 mt-1" />
                          <div>
                            <p className="font-medium">
                                    <a href={`https://github.com/${username}/${obj.starredRepo}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                                        {obj.starredRepo}
                                    </a>
                                    </p>
                                    <p className="text-sm text-gray-500">{obj.date}</p>
                         </div>
                     </div>
                  ))}
              </div>
            )}
      </div>
    </>
  )
}

export default WatchEvent