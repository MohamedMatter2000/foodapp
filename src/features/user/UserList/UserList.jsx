import Header from "../../../shared/Header/Header";
import logo from "../../../assets/images/recipe-img.png";
import Paginations from "../../../shared/pagination/Pagination";
import Table from "../../../shared/ReusableTable/Table";
import ActionTable from "../../../shared/ActionTable/ActionTable";
import SubHeader from "../../../shared/SubHeader/SubHeader";
import { CiSearch } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { PrivateaxiosInstances } from "../../../services/Api/ApInstance";
import { USER_URLS } from "../../../services/Api/APiconfig";
import { useState } from "react";
import { useEffect } from "react";
import useModal from "../../../hooks/useModal";
import ViewUser from "../ViewUser/ViewUser";
import usePagination from "../../../hooks/usePagination";
import DeletConfirmation from "../../../shared/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
export default function UserList() {
  const {
    TotalofPages,
    getTotalofPages,
    currentPage,
    setcurrentPage,
    ShowNextButton,
    ShowPrevButton,
  } = usePagination();
  const { isOpen, closeModal, openModal } = useModal();
  const [users, setusers] = useState([]);
  const [usersId, setusersId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteruser, setfilteruser] = useState({
    searchname: "",
    searchemail: "",
    selectrole: "",
  });
  const viewuser = users?.filter((item) => item?.id === usersId);
  async function getUsers(pageSize, pageNumber, userName, email, groups) {
    setIsLoading(true);
    try {
      const response = await PrivateaxiosInstances.get(USER_URLS.GET_ALL_USER, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
          userName: userName,
          email: email,
          groups: groups,
        },
      });
      setusers(response?.data?.data);
      getTotalofPages(response?.data?.totalNumberOfPages);
    } catch (error) {
      toast.error("Failed to get users");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getUsers(
      6,
      currentPage + 1,
      filteruser.searchname,
      filteruser.searchemail,
      filteruser.selectrole
    );
  }, [
    currentPage,
    filteruser.searchname,
    filteruser.searchemail,
    filteruser.selectrole,
  ]);
  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      await PrivateaxiosInstances.delete(USER_URLS.DELETE_USER(usersId));
      getUsers(6, currentPage + 1);
      toast.success("The user was removed successfully");
    } catch (error) {
      toast.error("Failed to remove user");
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const handleSearchName = (e) => {
    setfilteruser({
      ...filteruser,
      searchname: e.target.value,
    });
  };
  const handleSearchEmail = (e) => {
    console.log(e.target.value);
    setfilteruser({
      ...filteruser,
      searchemail: e.target.value,
    });
  };
  const handleSelectRole = (e) => {
    console.log(e.target.value);
    setfilteruser({
      ...filteruser,
      selectrole: e.target.value,
    });
  };
  const handleViewUser = (id) => {
    setusersId(id);
    openModal("ViewUser");
  };
  const handleViewDelete = (id) => {
    setusersId(id);
    openModal("DeleteUser");
  };
  const columns = [
    {
      key: "id",
      title: "Id",
      render: (row) => row?.id,
    },
    { key: "userName", title: "Name", render: (row) => row?.userName },
    { key: "country", title: "Country", render: (row) => row?.country },
    { key: "email", title: "Email", render: (row) => row?.email },
    {
      key: "group",
      title: "Role",
      render: (row) => row?.group?.name,
    },
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
          showEdit={false}
          onView={() => handleViewUser(row?.id)}
          onDelete={() => handleViewDelete(row?.id)}
        />
      ),
    },
  ];
  return (
    <>
      <Header
        title="Users List"
        discribtion="You can now Search your User and filter by Name or Email or Role in Application"
        logo={logo}
      />
      <SubHeader
        title={"Users Table Details"}
        discribtion={"You can check all details"}
      />
      <div className="total-search-container d-flex flex-column flex-lg-row gap-3 my-3">
        <div className="search-input-wrapper position-relative w-100">
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
        <div className="search-input-wrapper position-relative w-100">
          <div className="search-icon position-absolute top-50 translate-middle-y ms-3">
            <MdAlternateEmail className="fs-5 text-muted" />
          </div>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control ps-5 py-2 rounded-3 border"
            onChange={handleSearchEmail}
          />
        </div>
        <div className="role-select-wrapper w-100">
          <select
            className="form-select py-2 rounded-3"
            aria-label="Select user role"
            onChange={handleSelectRole}
          >
            <option value="">All Roles</option>
            <option value="1">Admin</option>
            <option value="2">User</option>
          </select>
        </div>
      </div>
      <Table
        columns={columns}
        data={users}
        isLoading={isLoading}
        message={"No User Available"}
      />
      {isOpen("ViewUser") && (
        <ViewUser
          data={viewuser[0]}
          show={isOpen("ViewUser")}
          onHide={closeModal}
          key={viewuser}
        />
      )}
      {isOpen("DeleteUser") && (
        <DeletConfirmation
          show={isOpen("DeleteUser")}
          onHide={closeModal}
          onDelete={() => handleDeleteUser(usersId)}
          isLoading={isLoading}
        />
      )}
      {users.length > 0 && (
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
