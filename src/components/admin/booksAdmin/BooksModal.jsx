import React, { useState, useEffect } from "react";
import Modal from "../../shared/modal/Modal";
import "./BooksAdmin.css";
import Button from "../../shared/button/Button";
import { createBook, updateBook } from "../../../service/BookService";
import { fetchCategories } from "../../../service/CategoryService";
import {
  validateAlphabet,
  validateMinLength,
  validateNotEmpty,
} from "../../../utility/validation";

const BooksModal = ({
  title,
  isModalOpen,
  handleCloseModal,
  handleAddBook,
  selectedBook,
  setToastMessage,
  setToastType,
  setShowToast,
  setLoading
}) => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    quantity: 1,
    image: "",
    categoryName: "",
  });
  const [categoriesList, setcategoriesList] = useState([]);
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    quantity: "",
    categoryName: "",
  });

  useEffect(()=> {
    if(!isModalOpen){
      setBookData({
        title: "",
        author: "",
        quantity: 1,
        image: "",
        categoryName: "",
      })
    }
  }, [isModalOpen])

  useEffect(() => {
    if (selectedBook) {
      // console.log(categoriesList);
      
      const catItemObj = categoriesList.find(catItem => catItem.name === selectedBook.categoryName);
      // console.log(catItemObj);
      

      setBookData({
        title: selectedBook.title,
        author: selectedBook.author,
        quantity: selectedBook.quantity,
        image: selectedBook.image,
        categoryName: Number(catItemObj?.id) || "",
      });
    } else {
      setBookData({
        title: "",
        author: "",
        quantity: 1,
        image: "",
        categoryName: "",
      });
    }

    setErrors({
      title: "",
      author: "",
      quantity: "",
      categoryName: "",
    });
  }, [selectedBook]);

  

  const getCategoriesList = async () => {
    const categoryData = await fetchCategories();
    setcategoriesList(categoryData);
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  const validateBook = () => {
    
    bookData.author = bookData?.author?.trim();
    bookData.title = bookData?.title?.trim();

    let isValid = true;
    const newErrors = {
      title: "",
      author: "",
      quantity: "",
      categoryName: "",
    };

    if (!validateNotEmpty(bookData.title)) {
      newErrors.title = `Title is required!`;
      isValid = false;
    } else if (!validateMinLength(bookData.title, 3)) {
      newErrors.title = `Title should have atleast 3 characters!`;
      isValid = false;
    } else if (!validateAlphabet(bookData.title)) {
      newErrors.title = `Special characters/numbers are not alowed!`;
      isValid = false;
    }

    if (!validateNotEmpty(bookData.author)) {
      newErrors.author = `Author name is required!`;
      isValid = false;
    } else if (!validateMinLength(bookData.author, 3)) {
      newErrors.author = `Author name should have atleast 3 characters!`;
      isValid = false;
    } else if (!validateAlphabet(bookData.author)) {
      newErrors.author = `Special characters/numbers are not alowed!`;
      isValid = false;
    }

    if (!validateNotEmpty(bookData.categoryName)) {
      newErrors.categoryName = `Category is required!`;
      isValid = false;
    }

    if (!validateNotEmpty(bookData.quantity)) {
      newErrors.quantity = `Quantity is required!`;
      isValid = false;
    } else if (bookData.quantity < 1) {
      newErrors.quantity = `Quantity can't be less than 1`;
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
    }
    
    return isValid;
  };

  const handleAdd = async () => {
    if (validateBook()) {
      try {
        const catId = Number(bookData.categoryName);
        delete bookData.categoryName;
        bookData.categoryId = catId;
        setLoading(true)
        const data = await createBook(bookData);
        setToastMessage(data?.message || "Book added successfully!");
        setShowToast(true);
        setToastType("success");
        handleAddBook();
        handleCloseModal();
      } catch (error) {
        setToastMessage(error?.message || "Error occurred while saving the book.");
        setToastType("error");
        setShowToast(true);
      } finally {
        setLoading(false)
        setErrors({
          title: "",
          author: "",
          quantity: "",
          categoryName: "",
        });
        setBookData({
          author: '',
          categoryName: '',
          image: null,
          quantity: '',
          title: '',
        })
      }
    }
  };

  const handleEdit = async () => {
    if (validateBook()) {
      try {
        const catId = Number(bookData.categoryName);
        delete bookData.categoryName;
        bookData.categoryId = catId;

        setLoading(true)
        const data = await updateBook(bookData, selectedBook?.id);
        setToastMessage(data?.message || "Book updated successfully!");
        setShowToast(true);
        setToastType("success");
        handleAddBook();
      } catch (error) {
        setToastMessage(error?.message || "Error in updating this book!");
        setShowToast(true);
        setToastType("error");
      } finally {
        handleCloseModal();
        setLoading(false)
        setErrors({
          title: "",
          author: "",
          quantity: "",
          categoryName: "",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setErrors({ ...errors, [e.target.id]: '' });
    setBookData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
      <div>
        <div className="form-group">
          <label
            htmlFor="title"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Title:
          </label>
          <div>
          <input
            className="login-input"
            type="text"
            id="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
          {errors.title && <div className="error-text">{errors.title}</div>}
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="author"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Author:
          </label>
          <div>
          <input
            className="login-input"
            type="text"
            id="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
          {errors.author && <div className="error-text">{errors.author}</div>}
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="quantity"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Quantity:
          </label>
          <div>
          <input
            className="login-input"
            type="number"
            id="quantity"
            value={bookData.quantity}
            onChange={handleChange}
            required
          />
          {errors.quantity && (
            <div className="error-text">{errors.quantity}</div>
          )}
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="image"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Image:
          </label>
          <input
            className="login-input"
            type="text"
            id="image"
            value={bookData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="quantity"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Category:
          </label>
          <div className="select-parent">
          <select
            className="login-input modal-select select-error"
            value={bookData.categoryName}
            id="categoryName"
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categoriesList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryName && <div className="error-text">{errors.categoryName}</div>}
          </div>
        </div>
        <div className="modal-button">
          {!selectedBook && (
            <Button onClick={handleAdd} type="submit" text={"Add"} />
          )}
          {selectedBook && (
            <Button onClick={handleEdit} type="submit" text={"Edit"} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BooksModal;
