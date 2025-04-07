import { Skeleton } from '@/components/ui/skeleton';

const Loader2 = () => {
  return (
    <div className="space-y-4">
            <div className="h-64 w-full">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="flex justify-center">
                <p className="text-sm text-gray-500">Fetching recent activity...</p>
             </div>
     </div>
  )
}

export default Loader2