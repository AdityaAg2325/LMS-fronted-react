import React, { useEffect, useState } from "react";
import AdminHOC from "../../shared/HOC/AdminHOC";
import "./BooksAdmin.css";
import Button from "../../shared/button/Button";
import BooksModal from "./BooksModal";
import Table from "../../shared/table/Table";
import Paginate from "../../shared/pagination/Paginate";
import {
  deleteBooks,
  fetchAllBooks,
} from "../../../service/BookService";
import AssignUserModal from "./AssignUserModal";
import Toast from "../../shared/toast/Toast";
import searchLogo from "../../../assets/magnifying-glass.png";
import ConfirmDeletePopup from "../../shared/confirmDeletePopup/ConfirmDeletePopup";

const BooksAdmin = ({setLoading}) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookList, setBookList] = useState([]);
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

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState(null)

  const loadBooks = async () => {
    if(search.length>2 || search.length==0){
    try {
      setLoading(true);
      const data = await fetchAllBooks(pageNumber, pageSize, search);
      setBookList(data?.content);
      setTotalPages(data?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  } 
}

  const handleOpenModal = (book = null) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value.trim());
  };

  const fields = [
    {
      index: 1,
      title: "Sr. No.",
    },
    {
      index: 2,
      title: "Title",
    },
    {
      index: 3,
      title: "Author",
    },
    {
      index: 5,
      title: "Total Quantity",
    },
    {
      index: 6,
      title: "Available Quantity",
    },
    {
      index: 7,
      title: "Category",
    },
    {
      index: 8,
      title: "Actions",
    },
    {
      index: 9,
      title: "Issuances",
    },
  ];

  async function handleDeleteBook() {
    try {
      setLoading(true)
      const data = await deleteBooks(bookToDelete?.id)
      setToastMessage(data?.message || "Book deleted successfully!");
      setToastType("success");
      setShowToast(true);
      await loadBooks();
    } catch (error) {
      setToastMessage(error?.message || "Book cannot be deleted as it is issued by a user.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsConfirmPopupOpen(false)
      setBookToDelete(null)
      setLoading(false)
    }
  }

  const handleOpenConfirmDeletePopup = (book) => {
    setIsConfirmPopupOpen(true);
    setBookToDelete(book);
  }

  const openAssignUser = (book = null) => {
    setSelectedBook(book);
    setIsAssignModalOpen(true);
  };
  const closeAssignUser = () => {
    setIsAssignModalOpen(false);
    setSelectedBook(null);
  };

  const handleAddBook = () => {
    loadBooks();
  };

  useEffect(() => {
    const timout = setTimeout(() => {
      if(search.length>2 || search.length==0){
        if(search && pageNumber>0){
          setPageNumber(0)
        }
          loadBooks();
        }
      }, 1000)
    return () => clearTimeout(timout);
  }, [search, pageNumber, pageSize]);

  return (
    <div className="admin-section">
      <div className="admin-page-mid">
        <h2 className="admin-page-header">Available Books</h2>
        <div className="admin-page-search-add">
        <div className="admin-page-search">
          <div className="search">
            <input
              type="text"
              placeholder="Search by Title"
              className="searchbar"
              onChange={handleSearchChange}
            ></input>
            <div className="search-icon" >
              <img src={searchLogo} alt="!" className="search-logo" />
            </div>
          </div>
          <Button
            text="Add Book"
            type="button"
            onClick={() => handleOpenModal(null)}
          />
        </div>
        </div>
      </div>
      {bookList && bookList.length > 0 ?
      <Table
        onEditClick={handleOpenModal}
        fields={fields}
        entries={bookList}
        type={"book"}
        onDeleteClick={handleOpenConfirmDeletePopup}
        onAssignClick={openAssignUser}
        pageNumber={pageNumber}
        pageSize={pageSize}
      /> : <div className="no-data-found">No data found</div>
    }
      <BooksModal
        title={selectedBook ? "Edit Book" : "Add New Book"}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleAddBook={handleAddBook}
        selectedBook={selectedBook}
        setToastMessage={setToastMessage}
        setToastType={setToastType}
        setShowToast={setShowToast}
        setLoading={setLoading}
      />
      <AssignUserModal
        title={"Assign To User"}
        isAssignModalOpen={isAssignModalOpen}
        closeAssignModal={closeAssignUser}
        selectedBook={selectedBook}
        setToastMessage={setToastMessage}
        setToastType={setToastType}
        setShowToast={setShowToast}
        setLoading={setLoading}
      />
      <div className="paginate">
        {bookList && bookList.length>0 ? 
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
      onClose={()=> setIsConfirmPopupOpen(false)}
      onConfirm={handleDeleteBook}
      />
    </div>
  );
};

export default AdminHOC(BooksAdmin);
