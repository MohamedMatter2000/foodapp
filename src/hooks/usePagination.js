// import { useState } from "react";

// export default function usePagination() {
//   const [TotalofPages, setTotalofPages] = useState(null);
//   const [currentPage, setcurrentPage] = useState(1);
//   function getTotalofPages(total) {
//     setTotalofPages(total);
//   }
//   const ShowNextButton = currentPage < TotalofPages;
//   const ShowPrevButton = currentPage > 1;
//   return {
//     TotalofPages,
//     getTotalofPages,
//     currentPage,
//     setcurrentPage,
//     ShowNextButton,
//     ShowPrevButton,
//   };
// }
// import { useState, useCallback } from "react";

// export default function usePagination() {
//   const [TotalofPages, setTotalofPages] = useState(null);
//   const [currentPage, setcurrentPage] = useState(1);
//   function getTotalofPages(total) {
//     setTotalofPages(total);
//   }
//   const resetToFirstPage = useCallback(() => {
//     setcurrentPage(1);
//   }, []);
//   const ShowNextButton = TotalofPages && currentPage < TotalofPages;
//   const ShowPrevButton = currentPage > 1;
//   return {
//     TotalofPages,
//     getTotalofPages,
//     currentPage,
//     setcurrentPage,
//     resetToFirstPage,
//     ShowNextButton,
//     ShowPrevButton,
//   };
// }
import { useState, useCallback, useEffect } from "react";
export default function usePagination(initialPage = 1) {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const updateTotalPages = useCallback((total) => {
    setTotalPages(total);
  }, []);
  const updateCurrentPage = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );
  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);
  const ShowNextButton = totalPages > 0 && currentPage < totalPages;
  const ShowPrevButton = currentPage > 1;
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);
  return {
    totalPages,
    currentPage,
    updateTotalPages,
    updateCurrentPage,
    resetToFirstPage,
    ShowNextButton,
    ShowPrevButton,
  };
}
