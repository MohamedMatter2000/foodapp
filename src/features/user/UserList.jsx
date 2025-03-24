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
import Paginations from "../../shared/pagination/Pagination";
import { CiSearch } from "react-icons/ci";
import Minheader from "../../shared/Min-header/Minheader";
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
    setSearchEmailUser,
    setgroups,
  } = useFoodApp();
  console.log(Users);
  function handleNameSearchBar(e) {
    setSearchQueryUser(e.target.value);
  }
  function handleEmailSearchBar(e) {
    setSearchEmailUser(e.target.value);
  }
  function handleSelectAdmin(e) {
    console.log(e.target.value);
    setgroups(e.target.value);
  }
  return (
    <>
      <Header
        title="Users List"
        discribtion="You can now Search your User and filter by Name or Email or Role in Application"
        logo={logo}
      />
      <Minheader
        title={"Users Table Details"}
        discribtion={"You can check all details"}
      />
      <div className="Total-search-tag-cate d-flex  flex-column flex-lg-row gap-3   my-3">
        <div
          className="search  w-100 d-flex justify-content-between align-items-center"
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
          className="search   w-100 d-flex justify-content-between align-items-center"
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
        <div className="selecteduser w-100">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleSelectAdmin}
          >
            <option selected key={0} value={"both"}>
              Role
            </option>
            <option key={1} value={1}>
              admin
            </option>
            <option key={2} value={2}>
              user
            </option>
          </select>
        </div>
      </div>
      <div className="table-responsive">
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
                Role
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
                  <td data-label="Price">{user?.group.name} </td>
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
      </div>

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
