import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Paginate() {

    const[items, setItems] = useState([]);

    useEffect(() => {
        const getComments =async () =>{
            const res=await fetch(
                `https://mockrestapi.herokuapp.com/api/employee?pageNo=1&limit=5`
            );
            const data =await res.json();
            setItems(data);
        };
        getComments();
    },[]);

    console.log(items);

    const fetchComments =async (currentPage) =>{
        const res=await fetch(
            `https://mockrestapi.herokuapp.com/api/employee?pageNo=${currentPage}&limit=5`
        );
        const data =await res.json();
        return data;
    };

    const handlePage =async (data) =>{
        console.log(data.selected);
        let currentPage=data.selected+1
        const commentsFormServer = await fetchComments(currentPage);
        setItems(commentsFormServer);
    }
    return(
        <div>
            <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={5}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePage}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={'active'}
        />
        </div>
    )
}

export default Paginate;