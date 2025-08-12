"use client"
import { useRouter, useSearchParams } from "next/navigation"; 
import ReactPaginate from "react-paginate";


function Pagination({pageCount}:{pageCount : number}) {
    const router = useRouter()
    const searchParams = useSearchParams();
    const handlePageClick = (e:{selected:number}) =>{
        const page = e.selected+1;
        const currentSearchParams = new URLSearchParams(searchParams.toString())
        currentSearchParams.set("page",page.toString())
        currentSearchParams.set("per_page","5")
        router.push(`/store?${currentSearchParams.toString()}`)
    }
    return ( 
        <div>
        <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
        />
        </div>

     );
}

export default Pagination;