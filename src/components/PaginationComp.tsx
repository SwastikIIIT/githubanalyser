import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

interface PaginationProps{
    arr:number[],
    totalPages:number,
    currentPage:number,
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
}

const PaginationComp = ({arr,setCurrentPage,currentPage,totalPages}:PaginationProps) => {
  return (
    <Pagination>
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
  )
}

export default PaginationComp;
