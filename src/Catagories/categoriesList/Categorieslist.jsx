/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import Header from "../../shared/Header/Header";
import logo from "../../assets/images/recipe-img.png";
import { BsThreeDots } from "react-icons/bs";
import Minheader from "../../shared/Min-header/Minheader";
import { MdDelete, MdOutlineEditCalendar, MdViewList } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import NotData from "../../shared/NoDate/NotData";
import DeletConfirmation from "../../shared/DeleteConfirmation/DeletConfirmation";
import { CATEGORY_URL, PrivateaxiosInstances } from "../../services/urls/Urls";
export default function Categorieslist() {
  const [categorylist, setcategorylist] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [categeryId, setcategeryId] = useState(0);
  const closePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  async function getAllCategries() {
    try {
      const response = await PrivateaxiosInstances.get(
        CATEGORY_URL.GET_CATOGERY
      );
      setcategorylist(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function deletcategry(id) {
    console.log(id);
    try {
      const response = await PrivateaxiosInstances.delete(
        CATEGORY_URL.DELETE_CATOGERY(categeryId)
      );
      getAllCategries();
      console.log(response);
      // setcategorylist(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllCategries();
  }, []);
  return (
    <div>
      <Header
        title="Categories Items"
        discribtion="You can now add your items that any user can order it from the Application and you can edit"
        logo={logo}
      />
      <Minheader
        title={"Categories Table Details"}
        discribtion={"You can check all details"}
        btnName={"Add New Item"}
      />
      <table className="table  table-borderless">
        <thead className=" table-light ">
          <tr>
            <th scope="col" className="px-4 py-4 rounded-start-3  text-nowrap ">
              Id
            </th>
            <th scope="col" className="px-4 py-4  ">
              Name
            </th>
            <th scope="col" className="px-4 py-4  ">
              Create at
            </th>
            <th scope="col" className="px-4 py-4  ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {categorylist.length > 0 ? (
            categorylist.map((category) => (
              <tr key={category?.id}>
                <td data-label="Item Name" className="px-4 py-4 ">
                  {category?.id}
                </td>
                <td data-label="Price" className="px-4 py-4 ">
                  {category?.name}
                </td>
                <td data-label="Description" className="px-4 py-4 text-wrap">
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
                  <ul className="dropdown-menu border-none w-100  z-3 position-absolute mt-2 rounded-2">
                    <li>
                      <a className="dropdown-item d-flex  align-items-center gap-2">
                        <MdViewList className="text-success fs-4" /> View
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item d-flex  align-items-center gap-2">
                        <MdOutlineEditCalendar className="text-success fs-4 " />
                        Edit
                      </a>
                    </li>
                    <li
                      onClick={function () {
                        setcategeryId(category.id);
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
                <NotData />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isPopupVisible && (
        <DeletConfirmation
          closePopup={closePopup}
          deletcategry={deletcategry}
          categoryid={categeryId}
        />
      )}
    </div>
  );
}
