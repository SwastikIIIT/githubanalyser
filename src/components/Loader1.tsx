import { Skeleton } from '@/components/ui/skeleton';

const Loader1 = () => {
  return (
    <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
    </div>
  )
}

export default Loader1;