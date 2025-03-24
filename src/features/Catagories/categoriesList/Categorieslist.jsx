import { BsThreeDots } from "react-icons/bs";
import { MdDelete, MdOutlineEditCalendar, MdViewList } from "react-icons/md";
import { useFoodApp } from "../../../context/AppFoodProvider";
import DeletConfirmation from "../../../shared/DeleteConfirmation/DeletConfirmation";
import Header from "../../../shared/Header/Header";
import logo from "../../../assets/images/recipe-img.png";
import NotData from "../../../shared/NoDate/NotData";
import Spinner from "../../../shared/NoDate/Spinner";
import { useState } from "react";
import Paginations from "../../../shared/pagination/Pagination";
import { CiSearch } from "react-icons/ci";
import Categoriesdata from "../categoriesData/Categoriesdata";
import Minheader from "../../../shared/Min-header/Minheader";
export default function Categorieslist() {
  const [currentCategry, setcurrentCategry] = useState("");
  const [show, setShow] = useState(false);
  const [Mode, setMode] = useState("");
  const CloseAndOpen = () => {
    setShow(!show);
  };
  const {
    categorylist,
    closePopup,
    isPopupVisible,
    setcategeryId,
    isLoading,
    setSearchQueryCategory,
    TotalofPages,
    setcurrentPage,
    ShowNextButton,
    ShowPrevButton,
  } = useFoodApp();
  function handleSearchBar(e) {
    setSearchQueryCategory(e.target.value);
  }
  function handleAddCategory() {
    setMode("Add");
    CloseAndOpen();
  }
  function handleEditCategory(category) {
    setcurrentCategry(category);
    CloseAndOpen();
    setMode("Update");
  }
  function handleDeleteCategory(id) {
    console.log(id);
    setcategeryId(id);
    closePopup();
  }

  console.log(currentCategry);

  return (
    <>
      <Header
        title="Categories Items"
        discribtion="You can now add your items that any user can order it from the Application and you can edit"
        logo={logo}
      />
      <Minheader
        title={"Categories Table Details"}
        discribtion={"You can check all details"}
        btnName={"Add New Category"}
        handleBtnAction={handleAddCategory}
      />
      <div
        className="search mb-3  w-100 d-flex justify-content-between align-items-center"
        style={{ marginLeft: "-20px" }}
      >
        <div
          className=" position-relative fs-5 "
          style={{ left: "40px", marginTop: "-4px" }}
        >
          <CiSearch />
        </div>
        <input
          type="search"
          placeholder="Search"
          className="w-100  px-5 py-2 rounded-3  border-1 border"
          onChange={handleSearchBar}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-borderless  table-hover text-center align-middle">
          <thead className="table-secondary overflow-visible">
            <tr>
              <th scope="col" className="px-1 py-4 rounded-start-3 text-nowrap">
                Id
              </th>
              <th scope="col" className="px-1 py-4 ">
                Name
              </th>
              <th scope="col" className="px-1 py-4 ">
                Create at
              </th>
              <th scope="col" className="px-1 py-4 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categorylist?.length > 0 ? (
              categorylist.map((category) => (
                <tr key={category?.id}>
                  <td data-label="Item Name">{category?.id}</td>
                  <td data-label="Price">{category?.name} </td>
                  <td data-label="Description" className="text-wrap">
                    {new Date(category?.creationDate).toLocaleString()}
                  </td>
                  <td
                    data-label="Action"
                    className="dropup-center dropup  px-4 py-4 "
                  >
                    <BsThreeDots
                      className="fa fa-ellipsis  dropup-center dropup fs-5 "
                      data-bs-toggle="dropdown"
                    />
                    <ul className="dropdown-menu  border-none w-100  mt-2 rounded-2">
                      <li>
                        <a className="dropdown-item d-flex  align-items-center gap-2">
                          <MdViewList className="text-success fs-4" /> View
                        </a>
                      </li>
                      <li onClick={() => handleEditCategory(category)}>
                        <a className="dropdown-item d-flex  align-items-center gap-2">
                          <MdOutlineEditCalendar className="text-success fs-4 " />
                          Edit
                        </a>
                      </li>
                      <li onClick={() => handleDeleteCategory(category.id)}>
                        <a className="dropdown-item d-flex  align-items-center gap-2">
                          <MdDelete
                            className="text-success fs-4 cursor-pointer "
                            data-toggle="modal"
                            data-target="#exampleModal"
                          />
                          Delete
                        </a>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan={7}>
                  {isLoading ? <Spinner /> : <NotData />}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {categorylist?.length > 0 ? (
        <Paginations
          TotalofPages={TotalofPages}
          setcurrentPage={setcurrentPage}
          ShowNextButton={ShowNextButton}
          ShowPrevButton={ShowPrevButton}
        />
      ) : null}
      {isPopupVisible && <DeletConfirmation />}
      {show && (
        <Categoriesdata
          closeAdd={CloseAndOpen}
          currentCategry={currentCategry}
          show={show}
          Mode={Mode}
        />
      )}
    </>
  );
}
