import LineChart from './LineChart'
import { Github } from 'lucide-react'

interface PushEvent {
    pushEvents: {
      date: string[];
      commits: number[];
    }
  }
  
const PushEvent = ({pushEvents}:PushEvent) => {
  return (
     <>
      {pushEvents.date.length===0 ? (
                 <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
                        <Github size={48} className="text-gray-300 mb-4" />
                         <p className="text-gray-500 text-center">No commit activity found in the last 7 days</p>
                 </div>
                 ):(
                <>
                    <div className="flex justify-center items-center h-96 w-full mb-8">
                        <LineChart xcoordinates={pushEvents.date} ycoordinates={pushEvents.commits}/>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                         Recent commit activity from the last weeks
                    </p>
                </>
      )}
     </>
  )
}

export default PushEvent