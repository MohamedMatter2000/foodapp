import Header from "../../../shared/Header/Header";
import logo from "../../../assets/images/recipe-img.png";
import Paginations from "../../../shared/pagination/Pagination";
import Table from "../../../shared/ReusableTable/Table";
import ActionTable from "../../../shared/ActionTable/ActionTable";
import SubHeader from "../../../shared/SubHeader/SubHeader";
import { CiSearch } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import useModal from "../../../hooks/useModal";
import ViewUser from "../ViewUser/ViewUser";
import usePagination from "../../../hooks/usePagination";
import DeletConfirmation from "../../../shared/DeleteConfirmation/DeleteConfirmation";
import { useDeleteUser, useUsers } from "../../../services/apiUser";
import Filter from "../../../shared/Filter/Filter";
export default function UserList() {
  const {
    totalPages,
    currentPage,
    updateTotalPages,
    updateCurrentPage,
    ShowNextButton,
    ShowPrevButton,
  } = usePagination();
  const { isOpen, closeModal, openModal } = useModal();
  const [usersId, setusersId] = useState("");
  const [filteruser, setfilteruser] = useState({
    searchname: "",
    searchemail: "",
    selectrole: "",
  });
  const {
    data: users,
    isLoading,
    error,
  } = useUsers({
    pageSize: 6,
    pageNumber: currentPage,
    userName: filteruser.searchname,
    email: filteruser.searchemail,
    groups: filteruser.selectrole,
  });
  useEffect(() => {
    if (users?.totalNumberOfPages) {
      updateTotalPages(users.totalNumberOfPages);
    }
  }, [users?.totalNumberOfPages, updateTotalPages]);
  const viewuser = users?.data?.filter((item) => item?.id === usersId)[0];
  const { isDeleting, deleteUser } = useDeleteUser();
  function handleDeleteUsers(id) {
    deleteUser(id, {
      onSuccess: () => {
        closeModal();
      },
    });
  }
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
      <Filter
        inputs={[
          {
            type: "search",
            placeholder: "Search by name",
            icon: CiSearch,
            onChange: handleSearchName,
            value: filteruser.searchname,
            show: true,
          },
          {
            type: "email",
            placeholder: "Enter Email",
            icon: MdAlternateEmail,
            onChange: handleSearchEmail,
            value: filteruser.searchemail,
            show: true,
          },
        ]}
        selects={[
          {
            label: "All Roles",
            data: [
              { id: "1", name: "Admin" },
              { id: "2", name: "User" },
            ],
            onChange: handleSelectRole,
            value: filteruser.selectrole,
            show: true,
          },
        ]}
      />
      <Table
        columns={columns}
        data={users?.data}
        message={"No User Available"}
        isLoading={isLoading}
        error={error}
      />
      {isOpen("ViewUser") && (
        <ViewUser
          data={viewuser}
          show={isOpen("ViewUser")}
          onHide={closeModal}
          key={viewuser?.id}
        />
      )}
      {isOpen("DeleteUser") && (
        <DeletConfirmation
          show={isOpen("DeleteUser")}
          onHide={closeModal}
          onDelete={() => handleDeleteUsers(usersId)}
          isLoading={isDeleting}
        />
      )}
      {users?.data?.length > 0 && totalPages > 1 && (
        <div className="mt-4">
          <Paginations
            TotalofPages={totalPages}
            currentPage={currentPage}
            updateCurrentPage={updateCurrentPage}
            ShowNextButton={ShowNextButton}
            ShowPrevButton={ShowPrevButton}
          />
        </div>
      )}
    </>
  );
}
