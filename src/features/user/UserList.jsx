import Header from "../../shared/Header/Header";
import logo from "../../assets/images/recipe-img.png";
import { useFoodApp } from "../../context/AppFoodProvider";
import { BsThreeDots } from "react-icons/bs";
import DeletConfirmation from "../../shared/DeleteConfirmation/DeletConfirmation";
import NotData from "../../shared/NoDate/NotData";
import Spinner from "../../shared/NoDate/Spinner";
import {
  MdAlternateEmail,
  MdDelete,
  MdOutlineEditCalendar,
  MdViewList,
} from "react-icons/md";
import { IoEarthSharp } from "react-icons/io5";
import Paginations from "../../shared/pagination/Pagination";
import { CiSearch } from "react-icons/ci";
export default function UserList() {
  const {
    Users,
    closePopup,
    isPopupVisible,
    isLoading,
    setChooseDelete,
    setuserId,
    setSearchQueryUser,
    ShowPrevButtonruser,
    ShowNextButtonuser,
    setcurrentPageuser,
    TotalofPagesUser,
    setSearchCountryUser,
    setSearchEmailUser,
  } = useFoodApp();
  function handleNameSearchBar(e) {
    setSearchQueryUser(e.target.value);
  }
  function handleEmailSearchBar(e) {
    setSearchEmailUser(e.target.value);
  }
  function handleCountrySearchBar(e) {
    setSearchCountryUser(e.target.value);
    console.log(e.target.value);
    console.log(typeof e.target.value);
  }
  return (
    <>
      <Header
        title="Categories Items"
        discribtion="You can now add your items that any user can order it from the Application and you can edit"
        logo={logo}
      />
      <div className="d-block d-md-flex justify-content-between align-content-center mt-4 py-1 ">
        <div className="lh-1">
          <h5 className="h5 ">Users Table Details</h5>
          <p className="fs-6 ">You can check all details</p>
        </div>
      </div>
      <div className="Total-search-tag-cate d-flex  gap-3 my-3">
        <div
          className="search mb-3  w-50 d-flex justify-content-between align-items-center"
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
            onChange={handleNameSearchBar}
          />
        </div>
        <div
          className="search mb-3  w-25 d-flex justify-content-between align-items-center"
          style={{ marginLeft: "-20px" }}
        >
          <div
            className=" position-relative fs-5 "
            style={{ left: "40px", marginTop: "-4px" }}
          >
            <IoEarthSharp />
          </div>
          <input
            type="text"
            placeholder="Enter Country"
            className="w-100 px-5 py-2 rounded-3  border-1 border"
            onChange={handleCountrySearchBar}
          />
        </div>
        <div
          className="search mb-3  w-50 d-flex justify-content-between align-items-center"
          style={{ marginLeft: "-20px" }}
        >
          <div
            className=" position-relative fs-5 "
            style={{ left: "40px", marginTop: "-4px" }}
          >
            <MdAlternateEmail />
          </div>
          <input
            type="text"
            placeholder="Enter Email"
            className="w-100  px-5 py-2 rounded-3  border-1 border"
            onChange={handleEmailSearchBar}
          />
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
              Country
            </th>
            <th scope="col" className="px-1 py-4 ">
              Email
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
          {Users?.length > 0 ? (
            Users.map((user) => (
              <tr key={user?.id}>
                <td data-label="Item Name">{user?.id}</td>
                <td data-label="Price">{user?.userName} </td>
                <td data-label="Price">{user?.country} </td>
                <td data-label="Price">{user?.email} </td>
                <td data-label="Description" className="text-wrap">
                  {new Date(user?.creationDate).toLocaleString()}
                </td>
                <td
                  data-label="Action"
                  className="dropup-center dropup  px-4 py-4 position-relative"
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
                    <li>
                      <a className="dropdown-item d-flex  align-items-center gap-2">
                        <MdOutlineEditCalendar className="text-success fs-4 " />
                        Edit
                      </a>
                    </li>
                    <li
                      onClick={function () {
                        setuserId(user?.id);
                        closePopup();
                        setChooseDelete("user");
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
      {Users.length > 0 ? (
        <Paginations
          TotalofPages={TotalofPagesUser}
          setcurrentPage={setcurrentPageuser}
          ShowNextButton={ShowNextButtonuser}
          ShowPrevButton={ShowPrevButtonruser}
        />
      ) : null}
      {isPopupVisible && <DeletConfirmation />}
    </>
  );
}
