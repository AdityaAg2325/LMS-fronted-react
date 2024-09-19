import React, { useEffect, useState } from "react";
import AdminHOC from "../../shared/HOC/AdminHOC";
import Button from "../../shared/button/Button";
import Table from "../../shared/table/Table";
import CategoriesModal from "./CategoriesModal";
import Paginate from "../../shared/pagination/Paginate";
import {
  createCategory,
  deleteCategory,
  fetchAllCategories,
} from "../../../service/CategoryService";
import searchLogo from "../../../assets/magnifying-glass.png";
import Toast from "../../shared/toast/Toast";
import ConfirmDeletePopup from "../../shared/confirmDeletePopup/ConfirmDeletePopup";

const CategoriesAdmin = ({setLoading}) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
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
  const [categoryToDelete, setCategoryToDelete] = useState(null)


  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = await fetchAllCategories(pageNumber, pageSize, search);
      setCategoryList(data?.content);
      setTotalPages(data?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  const handleOpenModal = (category = null) => {
    setIsModalOpen(true);
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const fields = [
    {
      index: 1,
      title: "Category ID",
    },
    {
      index: 2,
      title: "Category",
    },
    {
      index: 4,
      title: "Actions",
    },
  ];

  const handleAddCategory = () => {
    loadCategories();
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      if (selectedCategory) {
      } else {
        // Create new user
        await createCategory(categoryData);
      }
      await loadCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  async function deleteCategories() {
    try {
      setLoading(true)
      const data = await deleteCategory(categoryToDelete.id);
      setToastMessage(data?.message || "Category deleted successfully!");
      setToastType("success");
      setShowToast(true);
      loadCategories();
    } catch (error) {
      setToastMessage(error?.message || "Cannot delete this category.");
      setToastType("error");
      setShowToast(true);
      setLoading(false)
    } finally {
      setIsConfirmPopupOpen(false)
      // setBookToDelete(null)
      setLoading(false)
    }
  }

  const handleOpenConfirmDeletePopup = (category) => {
    setIsConfirmPopupOpen(true);
    setCategoryToDelete(category);
  }

  useEffect(() => {
    loadCategories();
  }, [pageNumber, pageSize]);

  useEffect(() => {
    const timout = setTimeout(() => {
      if(search.length>2 || search.length==0){
          loadCategories();
        }
      }, 1000)
    return () => clearTimeout(timout);
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.trim());
  };
  const handleSearchClick = async () => {
    await loadCategories();
  };

  return (
    <div className="admin-section">
      <div className="admin-page-mid">
        <h2 className="admin-page-header">Available Categories</h2>
        <div className="admin-page-search">
          <div className="search">
            <input
              type="text"
              placeholder="Search Categories"
              className="searchbar"
              onChange={handleSearchChange}
            ></input>
            <div className="search-icon" onClick={handleSearchClick}>
            <img src={searchLogo} alt="!" className="search-logo" />
            </div>
          </div>
          <Button
            text="Add Category"
            type="button"
            onClick={() => handleOpenModal(null)}
          />
        </div>
      </div>
      <Table
        onEditClick={handleOpenModal}
        fields={fields}
        entries={categoryList}
        type={"category"}
        onDeleteClick={handleOpenConfirmDeletePopup}
        pageNumber={pageNumber}
        pageSize={pageSize}
      />
      <CategoriesModal
        title={selectedCategory ? "Edit Category" : "Add New Category"}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleSaveCategory={handleSaveCategory}
        handleAddCategory={handleAddCategory}
        selectedCategory={selectedCategory}
        setToastMessage={setToastMessage} // Pass toast state to BooksModal
        setToastType={setToastType}
        setShowToast={setShowToast}
        setLoading={setLoading}
      />
      <div className="paginate">
        <Paginate
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={setPageNumber}
        />
      </div>
      <Toast message={toastMessage} type={toastType} show={showToast} onClose={() => setShowToast(false)} />
      <ConfirmDeletePopup 
      isOpen={isConfirmPopupOpen}
      onClose={()=> setIsConfirmPopupOpen(false)}
      onConfirm={deleteCategories}
      />
    </div>
  );
};

export default AdminHOC(CategoriesAdmin);
