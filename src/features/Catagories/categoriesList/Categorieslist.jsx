import DeletConfirmation from "../../../shared/DeleteConfirmation/DeleteConfirmation";
import Header from "../../../shared/Header/Header";
import logo from "../../../assets/images/recipe-img.png";
import { useEffect, useState } from "react";
import Paginations from "../../../shared/pagination/Pagination";
import { CiSearch } from "react-icons/ci";
import Categoriesdata from "../categoriesData/Categoriesdata";
import SubHeader from "../../../shared/SubHeader/SubHeader";
import usePagination from "../../../hooks/usePagination";
import useModal from "../../../hooks/useModal";
import Table from "../../../shared/ReusableTable/Table";
import ActionTable from "../../../shared/ActionTable/ActionTable";
import { PrivateaxiosInstances } from "../../../services/Api/ApInstance";
import { CATEGORY_URL } from "../../../services/Api/APiconfig";
import { toast } from "react-toastify";
export default function Categorieslist() {
  const {
    TotalofPages,
    getTotalofPages,
    currentPage,
    setcurrentPage,
    ShowNextButton,
    ShowPrevButton,
  } = usePagination();
  const { isOpen, closeModal, openModal } = useModal();
  const [categories, setcategories] = useState([]);
  const [categoryId, setcategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchname, setsearchname] = useState("");
  const currentCategory = categories?.filter(
    (item) => item?.id === categoryId
  )[0];
  async function getAllCategries(pageSize, pageNumber, name) {
    setIsLoading(true);
    try {
      const response = await PrivateaxiosInstances.get(
        CATEGORY_URL.GET_CATOGERY,
        {
          params: {
            pageSize: pageSize,
            pageNumber: pageNumber,
            name: name,
          },
        }
      );
      setcategories(response.data.data);
      getTotalofPages(response?.data?.totalNumberOfPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  const handleDeleteCategory = async () => {
    setIsLoading(true);
    try {
      await PrivateaxiosInstances.delete(
        CATEGORY_URL.DELETE_CATOGERY(categoryId)
      );
      getAllCategries(6, currentPage + 1);
      toast.success("Category was removed successfully");
    } catch (error) {
      toast.error("Failed to remove Category");
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };
  const handleSearchName = (e) => {
    setsearchname(e.target.value);
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
  useEffect(() => {
    getAllCategries(6, currentPage + 1, searchname);
  }, [currentPage, searchname]);
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
          showEdit={true}
          showView={false}
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
      <div className="search-input-wrapper position-relative w-100 mb-4">
        <div className="search-icon position-absolute top-50 translate-middle-y ms-3">
          <CiSearch className="fs-5 text-muted" />
        </div>
        <input
          type="search"
          placeholder="Search by name"
          className="form-control ps-5 py-2 rounded-3 border"
          onChange={handleSearchName}
        />
      </div>
      <Table
        columns={columns}
        data={categories}
        isLoading={isLoading}
        message={"No Category Available"}
      />
      {isOpen("AddCategory") && (
        <Categoriesdata
          closeAdd={closeModal}
          currentCategory={currentCategory}
          refreshCategories={() =>
            getAllCategries(6, currentPage + 1, searchname)
          }
        />
      )}
      {isOpen("DeleteCategory") && (
        <DeletConfirmation
          show={isOpen("DeleteCategory")}
          onHide={closeModal}
          onDelete={() => handleDeleteCategory(categoryId)}
          isLoading={isLoading}
        />
      )}
      {categories.length >= 0 && (
        <Paginations
          TotalofPages={TotalofPages}
          setcurrentPage={setcurrentPage}
          ShowNextButton={ShowNextButton}
          ShowPrevButton={ShowPrevButton}
        />
      )}
    </>
  );
}
