import { useState } from "react";
export default function usePagination() {
  const [TotalofPages, setTotalofPages] = useState(null);
  const [currentPage, setcurrentPage] = useState(0);
  function getTotalofPages(total) {
    setTotalofPages(total);
  }
  const ShowNextButton = currentPage !== TotalofPages - 1;
  const ShowPrevButton = currentPage !== 0;
  return {
    TotalofPages,
    getTotalofPages,
    currentPage,
    setcurrentPage,
    ShowNextButton,
    ShowPrevButton,
  };
}
