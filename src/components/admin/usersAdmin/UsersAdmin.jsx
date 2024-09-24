import React, { useEffect, useState } from "react";
import AdminHOC from "../../shared/HOC/AdminHOC";
import Button from "../../shared/button/Button";
import Table from "../../shared/table/Table";
import UsersModal from "./UsersModal";
import Paginate from "../../shared/pagination/Paginate";
import {
  fetchAllUsers,
  deleteUsers,
} from "../../../service/UserService";
import AssignBookModal from "./AssignBookModal";
import Toast from "../../shared/toast/Toast";
import searchLogo from "../../../assets/magnifying-glass.png";
import ConfirmDeletePopup from "../../shared/confirmDeletePopup/ConfirmDeletePopup";

const UsersAdmin = ({setLoading}) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  let height = window.innerHeight;

  const pageSizeByHeight = () => {

  if(height>=1024){
    return 15
  }else if (height<=1024){
    return 10
  }}
  const [pageSize, setPageSize] = useState(pageSizeByHeight());
  const handleResize = () => {
    height = window.innerHeight;
    const newSize = pageSizeByHeight();
    setPageSize(newSize);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);

  const [totalPages, setTotalPages] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const loadUsers = async () => {
    if(search.length>2 || search.length==0){
    try {
      setLoading(true)
      const data = await fetchAllUsers(pageNumber, pageSize, search);
      setUserList(data?.content);
      setTotalPages(data?.totalPages);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false)
    }
  }}

  const handleOpenModal = (user = null) => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const fields = [
    {
      index: 1,
      title: "Sr. No.",
    },
    {
      index: 2,
      title: "Name",
    },
    {
      index: 3,
      title: "Mobile",
    },
    {
      index: 4,
      title: "E-Mail",
    },
    {
      index: 5,
      title: "Actions",
    },
    {
      index: 6,
      title: "Issuances",
    },
  ];

  const handleAddUser = () => {
    loadUsers();
  };

  const handleDeleteUser = async () => {
    try {
      setLoading(true)
      const data = await deleteUsers(userToDelete?.mobileNumber);
      setToastMessage(data?.message || "User deleted successfully!");
      setToastType("success");
      setShowToast(true);
      await loadUsers();
    } catch (error) {
      setToastMessage(error?.message || "Error occurred while deleting the User.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsConfirmPopupOpen(false);
      setUserToDelete(null);
      setLoading(false)
    }
  };

  const handleOpenConfirmDeletePopup = (user) => {
    setIsConfirmPopupOpen(true);
    setUserToDelete(user);
  };


  useEffect(() => {
    const timout = setTimeout(() => {
      if(search.length>2 || search.length==0){
        if(search){
          setPageNumber(0)
        }
          loadUsers();
        }
        
      }, 1000)
    return () => clearTimeout(timout);
  }, [search, pageNumber, pageSize]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.trim());
  };

  const handleSearchClick = async () => {
    await loadUsers();
  };

  const closeAssignBook = () => {
    setIsAssignModalOpen(false);
    setSelectedUser(null);
  };

  const openAssignUser = (user = null) => {
    setSelectedUser(user);
    setIsAssignModalOpen(true);
  };

  return (
    <div className="admin-section">
      <div className="admin-page-mid">
        <h2 className="admin-page-header">Available Users</h2>
        <div className="admin-page-search">
          <div className="search">
            <input
              type="text"
              placeholder="Search by Mobile Number"
              className="searchbar"
              onChange={handleSearchChange}
            />
            <div className="search-icon" onClick={handleSearchClick}></div>
            <img src={searchLogo} alt="!" className="search-logo" />
          </div>
          <Button
            text="Add User"
            type="button"
            onClick={() => handleOpenModal(null)}
          />
        </div>
      </div>
      {userList && userList.length>0 ? 
      <Table
        onEditClick={handleOpenModal}
        fields={fields}
        entries={userList}
        type={"user"}
        onDeleteClick={handleOpenConfirmDeletePopup}
        onAssignClick={openAssignUser}
        pageNumber={pageNumber}
        pageSize={pageSize}
      /> : <div className="no-data-found">No data found</div>}
      <UsersModal
        title={selectedUser ? "Edit User" : "Add New User"}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        selectedUser={selectedUser}
        handleAddUser={handleAddUser}
        setToastMessage={setToastMessage} 
        setToastType={setToastType}
        setShowToast={setShowToast}
        setLoading={setLoading}
      />
      <AssignBookModal
        title={"Assign Book"}
        isAssignModalOpen={isAssignModalOpen}
        closeAssignModal={closeAssignBook}
        selectedUser={selectedUser}
        setToastMessage={setToastMessage}
        setToastType={setToastType}
        setShowToast={setShowToast}
        setLoading={setLoading}
      />
      <div className="paginate">
        {userList && userList.length>0 ? 
        <Paginate
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={setPageNumber}
        /> : <div></div>}
      </div>
      <Toast
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <ConfirmDeletePopup
        isOpen={isConfirmPopupOpen}
        onClose={() => setIsConfirmPopupOpen(false)}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default AdminHOC(UsersAdmin);
