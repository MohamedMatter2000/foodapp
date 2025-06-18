/* eslint-disable react/prop-types */
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
function Paginations({
  TotalofPages,
  setcurrentPage,
  ShowNextButton,
  ShowPrevButton,
}) {
  function handlePagesChange({ selected }) {
    setcurrentPage(selected);
  }
  return (
    <div className="paginations">
      <ReactPaginate
        breakLabel={<span>...</span>}
        breakClassName="fs-4"
        nextLabel={ShowNextButton ? <FaAngleDoubleRight /> : null}
        marginPagesDisplayed={1} // Show 1 pages at the start and end
        pageRangeDisplayed={2} // Show 2 pages around the current page
        pageCount={Math.ceil(TotalofPages)}
        previousLabel={
          ShowPrevButton ? (
            <span>
              <FaAngleDoubleLeft />
            </span>
          ) : null
        }
        previousClassName={
          ShowPrevButton ? "px-3 py-1  bg-success rounded-2 text-light" : ""
        }
        nextClassName={
          ShowNextButton ? "px-3 py-1 bg-success rounded-2 text-light" : ""
        }
        previousLinkClassName={ShowPrevButton ? "text-light" : ""}
        nextLinkClassName={ShowNextButton ? "text-light" : ""}
        onPageChange={handlePagesChange}
        activeClassName="bg-success text-light"
        renderOnZeroPageCount={null}
        containerClassName="d-flex align-items-center
        justify-content-end gap-3"
        pageClassName="px-3 py-1 shadow rounded-2 "
      />
    </div>
  );
}

export default Paginations;
