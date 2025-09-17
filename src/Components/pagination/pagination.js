import ReactPaginate from 'react-paginate';
export default function PaginatedItems({ itemsPerPage , data,setPage }) {
    const pageCount=data.length/itemsPerPage;
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e)=>setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount<=1?0:pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-end gap-2"
        pageLinkClassName="pagination-link"
        activeLinkClassName="pagination-link-active bg-primary text-white"
      />
    </>
  );
}
