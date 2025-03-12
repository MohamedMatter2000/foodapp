/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { BsThreeDots } from "react-icons/bs";
import { MdDelete, MdOutlineEditCalendar, MdViewList } from "react-icons/md";
import { useFoodApp } from "../../../context/AppFoodProvider";
import DeletConfirmation from "../../../shared/DeleteConfirmation/DeletConfirmation";
import Header from "../../../shared/Header/Header";
import logo from "../../../assets/images/recipe-img.png";
import NotData from "../../../shared/NoDate/NotData";
import Spinner from "../../../shared/NoDate/Spinner";
import { useState } from "react";
import AddandEdit from "../AddandEditCategory/AddandEdit";
export default function Categorieslist() {
  const [currentCategry, setcurrentCategry] = useState();
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
    chooseDelete,
    setChooseDelete,
  } = useFoodApp();
  return (
    <>
      <Header
        title="Categories Items"
        discribtion="You can now add your items that any user can order it from the Application and you can edit"
        logo={logo}
      />
      <div class="d-block d-md-flex justify-content-between align-content-center mt-2 py-1 ">
        <div class="lh-1">
          <h5 class="h5 ">Categories Table Details</h5>
          <p class="fs-6 ">You can check all details</p>
        </div>
        <div class=" mt-3 ">
          <button
            onClick={function () {
              setMode("Add");
              CloseAndOpen();
            }}
            class="btn btn-success d-block mx-auto flex gap-4 align-content-center px-5"
          >
            Add New Item
          </button>
        </div>
      </div>
      <table className="table table-striped  table-hover text-center align-middle">
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
                  className="dropup-center dropup z-3 px-4 py-4 position-relative"
                >
                  <BsThreeDots
                    className="fa fa-ellipsis  dropup-center dropup fs-5 "
                    data-bs-toggle="dropdown"
                  />
                  <ul className="dropdown-menu  border-none w-100  z-6 position-absolute mt-2 rounded-2">
                    <li>
                      <a className="dropdown-item d-flex  align-items-center gap-2">
                        <MdViewList className="text-success fs-4" /> View
                      </a>
                    </li>
                    <li
                      onClick={function () {
                        CloseAndOpen();
                        setcurrentCategry(category);
                        setMode("Update");
                      }}
                    >
                      <a className="dropdown-item d-flex  align-items-center gap-2">
                        <MdOutlineEditCalendar className="text-success fs-4 " />
                        Edit
                      </a>
                    </li>
                    <li
                      onClick={function () {
                        setcategeryId(category?.id);
                        closePopup();
                      }}
                    >
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
      {isPopupVisible && <DeletConfirmation />}
      {show && (
        <AddandEdit
          closeAdd={CloseAndOpen}
          currentCategry={currentCategry}
          show={show}
          Mode={Mode}
        />
      )}
    </>
  );
}
