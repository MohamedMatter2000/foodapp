import DeletConfirmation from "../../../shared/DeleteConfirmation/DeleteConfirmation";
import Header from "../../../shared/Header/Header";
import logo from "../../../assets/images/recipe-img.png";
import { useEffect, useState } from "react";
import Paginations from "../../../shared/pagination/Pagination";
import Categoriesdata from "../categoriesData/Categoriesdata";
import SubHeader from "../../../shared/SubHeader/SubHeader";
import useModal from "../../../hooks/useModal";
import Table from "../../../shared/ReusableTable/Table";
import ActionTable from "../../../shared/ActionTable/ActionTable";
import {
  useCategories,
  useDeleteCategory,
} from "../../../services/apiCategory";
import usePagination from "../../../hooks/usePagination";
import Filter from "../../../shared/Filter/Filter";
export default function Categorieslist() {
  const [searchName, setSearchName] = useState("");
  const {
    totalPages,
    currentPage,
    updateTotalPages,
    updateCurrentPage,
    ShowNextButton,
    ShowPrevButton,
  } = usePagination();
  const {
    Categories,
    isPending: isLoadingCategories,
    totalNumberOfPages,
  } = useCategories({
    pageSize: 6,
    pageNumber: currentPage,
    name: searchName,
  });
  useEffect(() => {
    if (Categories) {
      updateTotalPages(totalNumberOfPages);
    }
  }, [Categories, updateTotalPages, totalNumberOfPages]);
  const { isOpen, closeModal, openModal } = useModal();
  const [categoryId, setcategoryId] = useState("");
  const currentCategory = Categories?.filter(
    (item) => item?.id === categoryId
  )[0];
  const { isDeleting, deleteCategory } = useDeleteCategory();
  function handleDeleteCategory(id) {
    deleteCategory(id, {
      onSuccess: () => {
        closeModal();
      },
    });
  }
  const handleSearchName = (e) => {
    setSearchName(e.target.value);
  };
  const handleViewDelete = (id) => {
    setcategoryId(id);
    openModal("DeleteCategory");
  };
  function handleAddCategory() {
    openModal("AddCategory");
    setcategoryId("");
  }
  function handleViewEdit(id) {
    setcategoryId(id);
    openModal("AddCategory");
  }
  const columns = [
    {
      key: "id",
      title: "Id",
      render: (row) => row?.id,
    },
    { key: "Name", title: "Name", render: (row) => row?.name },
    {
      key: "creationDate",
      title: "Create at",
      dateField: true,
      render: (row) => {
        return new Date(row?.creationDate).toLocaleString();
      },
    },
    {
      key: "action",
      title: "Action",
      render: (row) => (
        <ActionTable
          data={row}
          showView={false}
          showEdit={true}
          onDelete={handleViewDelete}
          onEdit={handleViewEdit}
        />
      ),
    },
  ];
  return (
    <>
      <Header
        title="Categories Items"
        discribtion="You can now add your items that any user can order it from the Application and you can edit"
        logo={logo}
      />
      <SubHeader
        title={"Categories Table Details"}
        discribtion={"You can check all details"}
        btnName={"Add New Category"}
        handleBtnAction={handleAddCategory}
      />

      <Filter
        showTags={false}
        searchValue={searchName}
        showCategory={false}
        searchPlaceholder="Search by name "
        onSearchChange={handleSearchName}
      />
      <Table
        columns={columns}
        data={Categories}
        isLoading={isLoadingCategories}
        message={"No Category Available"}
      />
      {isOpen("AddCategory") && (
        <Categoriesdata
          show={isOpen("AddCategory")}
          closeModal={closeModal}
          currentCategory={currentCategory}
          key={currentCategory?.id}
        />
      )}
      {isOpen("DeleteCategory") && (
        <DeletConfirmation
          show={isOpen("DeleteCategory")}
          onHide={closeModal}
          onDelete={() => handleDeleteCategory(categoryId)}
          isLoading={isDeleting}
        />
      )}
      {Categories?.length > 0 && totalPages > 1 && (
        <Paginations
          TotalofPages={totalPages}
          currentPage={currentPage}
          updateCurrentPage={updateCurrentPage}
          ShowNextButton={ShowNextButton}
          ShowPrevButton={ShowPrevButton}
        />
      )}
    </>
  );
}
