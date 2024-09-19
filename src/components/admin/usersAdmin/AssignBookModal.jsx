import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../../../service/BookService";
import { createIssuance } from "../../../service/IssuanceService";
import Modal from "../../shared/modal/Modal";
import Button from "../../shared/button/Button";
import {
  validateNotEmpty,
} from "../../../utility/validation";

const AssignBookModal = ({
  title,
  isAssignModalOpen,
  closeAssignModal,
  selectedUser,
  setToastMessage,
  setToastType,
  setShowToast,
  setLoading
}) => {

  const initialState = {
    userId: selectedUser?.id || "",
    bookId: "",
    type: "In house",
    returnTime: "",
  };

  const navigate = useNavigate();

  const [assignBookData, setAssignBookData] = useState({
    ...initialState,
    userId: selectedUser?.id,
  });
  const [bookList, setBookList] = useState([]);
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState({
    returnTime: ""
  });

  const resetState = () => setAssignBookData(initialState);
  const loadBooks = async () => {
    const data = await fetchBooks();
    setBookList(data);
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {
      returnTime: ''
    }
    const currentTime = new Date().toLocaleTimeString('en-US', {hour12: false});
    if (!validateNotEmpty(assignBookData.returnTime)) {
      newErrors.returnTime = `Return time is required!`
      isValid = false;
    }
      if (!validateNotEmpty(assignBookData.bookId)){
        newErrors.bookId = `Book is required!`
        isValid = false;
      } 
    else if (assignBookData.returnTime < currentTime) {
      newErrors.returnTime = `Return time can't be before than current time!`
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
    }
    return isValid;
  }

  useEffect(() => {
    setAssignBookData({
      bookId: "",
      returnTime: "",
      type: "In house",
      userId: selectedUser?.id || "",
    });
    setErrors({
      returnTime: ""
    });
  }, [selectedUser]);

  useEffect(() => {
    if (isAssignModalOpen === false) {
      resetState();
      setAuthor("");
    }
  }, [isAssignModalOpen]);

  useEffect(() => {
    loadBooks();
  }, []);

  const getReturnTime = (type) => {
    if (type === 'Take away') {
      const selectedDate = assignBookData.returnTime;
      const currentTime = new Date().toLocaleTimeString('en-US', {hour12: false});

      const finalReturnTime = `${selectedDate}T${currentTime}`;
      console.log(finalReturnTime);
      
      return finalReturnTime;
    } else {
      const selectedTime = assignBookData.returnTime;
      const currentDate = new Date().toLocaleDateString('en-CA');

      const finalReturnTime = `${currentDate}T${selectedTime}:00`;
      console.log(finalReturnTime);
      
      return finalReturnTime;
    }
  }

  const handleAssign = async () => {
    if (validate()) {
      try {
        setLoading(true)
        assignBookData.returnTime = getReturnTime(assignBookData.type)
        const data = await createIssuance(assignBookData);
        navigate("/issuance");
      } catch (error) {
        setToastMessage(error?.message || "This book is not available for issuance!");
        setShowToast(true);
        setToastType("error");
      } finally {
        closeAssignModal();
        setLoading(false)
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setErrors({ ...errors, [e.target.id]: "" });
    setAssignBookData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === 'returnTime') {
      setAssignBookData((prev) => {
        return {
          ...prev,
          "returnTime": e.target.value
        } 
      })
    }

    if (id === "bookId") {
      setAssignBookData((prevData) => {
        setAuthor(getBookDetails(value, "author"));
        return {
          ...prevData,
          bookId: getBookDetails(value, "id"),
        };
      });
    }
  };

  const getBookDetails = (text = "", what = "id") => {
    const arr = text.split(".");
    const id = arr[0];
    const name = arr[1];
    return what === "id" ? parseInt(id) : name;
  }

  return (
    <Modal isOpen={isAssignModalOpen} onClose={closeAssignModal} title={title}>
      <div className="">
        <div className="form-group">
          <label
            htmlFor="userId"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            User:
          </label>
          <select
            id="userId"
            className="login-input modal-select"
            defaultValue={selectedUser?.id}
            value={selectedUser?.id}
            disabled
          >
            <option selected value={selectedUser?.id}>
              {selectedUser?.name}
            </option>
          </select>
        </div>
        <div className="form-group">
          <label
            htmlFor="bookId"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Book:
          </label>
          <div className="select-parent">
          <select
            className="login-input modal-select select-error"
            value={`${assignBookData.bookId}.${author}`}
            id="bookId"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          >
            <option value="">Select Book</option>
            {bookList.map((book) => (
              <option key={book?.id} value={`${book?.id}.${book?.author}`}>
                {book.title}
              </option>
            ))}
          </select>
          {errors.bookId && <div className="error-text">{errors.bookId}</div>}
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
          <input
            className="login-input"
            type="text"
            id="author"
            value={author}
            disabled
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="type"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Type:
          </label>
          <select
            defaultValue={assignBookData.type}
            className="login-input modal-select"
            value={assignBookData.type}
            id="type"
            onChange={handleChange}
            required
          >
            <option selected value={"In house"}>
              {"In house"}
            </option>
            <option value={"Take away"}>{"Take away"}</option>
          </select>
        </div>

        <div className="form-group">
          <label
            htmlFor="returnTime"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Expected Return:
          </label>
          <div>
            {assignBookData?.type === 'Take away' ? <input
              className="login-input"
              type="date"
              id="returnTime"
              value={assignBookData.returnTime}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            /> : 
            <input
            className="login-input"
            type="time"
            id="returnTime"
            value={assignBookData.returnTime}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[1]}
          />}
            {errors.returnTime && <div className="error-text">{errors.returnTime}</div>}
          </div>
        </div>
        <div className="modal-button">
          <Button onClick={handleAssign} type="submit" text={"Assign"} />
        </div>
      </div>
    </Modal>
  );
};

export default AssignBookModal;
