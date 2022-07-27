import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function Paginationbar({maxPage, curPage, setPage}) {
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(10);
    useEffect(() => {

    })
    const changePage = (nextPage) => {
        if(nextPage < 1 || nextPage > maxPage)
            return;
        if(nextPage < start) {
            setStart(start - 10);
            setEnd(end - 10);
            setPage(nextPage);
            return;
        }
        if(nextPage > end) {
            setStart(start + 10);
            setEnd(end + 10);
            setPage(nextPage);
            return;
        }
        setPage(nextPage);
    }
    return (
            <Pagination>
                <Pagination.First onClick={()=>changePage(1)}/>
                <Pagination.Prev onClick={()=>changePage(curPage - 1)}/>
                    {Array(maxPage).fill().map((num, page) => {
                        if(page + 1 >= start && page + 1 <= end)
                            return <Pagination.Item key={page} onClick={()=>changePage(page + 1)} active={curPage === page + 1}>{page + 1}</Pagination.Item>
                    })}
                <Pagination.Next onClick={()=>changePage(curPage + 1)} />
                <Pagination.Last onClick={()=>changePage(maxPage)} />
            </Pagination>
    );
  }
                                 
export default Paginationbar;