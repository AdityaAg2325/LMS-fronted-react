import React, { useState, useEffect } from "react";
import Modal from "../../shared/modal/Modal";
import Button from "../../shared/button/Button";
import Toast from "../../shared/toast/Toast";
import { updateIssuance } from "../../../service/IssuanceService";

const IssuanceModal = ({
  title,
  isModalOpen,
  handleCloseModal,
  handleEditIssuance,
  selectedIssuance,
  setToastMessage,
  setToastType,
  setShowToast,
  setLoading
}) => {
  const [issuanceData, setIssuanceData] = useState({
    userId: "",
    bookId: "",
    status: "",
    returnTime: "",
    type: "",
  });

  const [errors, setErrors] = useState({
    returnTime: ""
  });

  const [dateChanged, setDateChanged] = useState(false);

  const getReturnTime = (type) => {
    if (type === 'Take away') {
      const selectedDate = issuanceData.returnTime;
      const currentTime = new Date().toLocaleTimeString('en-US', {hour12: false});

      const finalReturnTime = `${selectedDate}T${currentTime}`;
      
      return finalReturnTime;
    } else {
      const selectedTime = issuanceData.returnTime;
      const currentDate = new Date().toLocaleDateString('en-CA');

      const finalReturnTime = dateChanged ? `${currentDate}T${selectedTime}:00` : `${currentDate}T${selectedTime}`;
      setDateChanged(false);
      return finalReturnTime;
    }
  }

  const validate = () => {
    let isValid = true;
    const newErrors = {
      returnTime: ''
    }
    const currentTime = new Date().toLocaleTimeString('en-US', {hour12: false});
    if (issuanceData.returnTime < currentTime) {
      newErrors.returnTime = `Return time can't be before than current time!`
      isValid = false;
    }
    if(!isValid){
      setErrors(newErrors)
    }
    return isValid;
  }

  const getDate = (date) => {
    return new Date(date).toLocaleDateString('en-CA');
  }

  const getTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {hour12: false});
  }

  useEffect(() => {
    if (selectedIssuance) {
      setIssuanceData({
        userId: selectedIssuance?.user?.id,
        bookId: selectedIssuance?.book?.id,
        status: selectedIssuance?.status,
        returnTime: selectedIssuance?.type === 'In house' ? getTime(selectedIssuance?.expectedReturnTime) : getDate(selectedIssuance?.expectedReturnTime),
        status: selectedIssuance?.status,
        type: selectedIssuance?.type,
      });
    } else {
      setIssuanceData({
        userId: "",
        bookId: "",
        status: "",
        returnTime: "",
        type: "",
      });
    }
    setErrors({
      returnTime: ''
    })
  }, [selectedIssuance]);

  useEffect(() => {
    // if (!isModalOpen) {
      setDateChanged(false);
    // }
  }, [isModalOpen])

  const handleEdit = async () => {
    if(validate()){
    try {
      setLoading(true)
      issuanceData.returnTime = getReturnTime(issuanceData.type)
      const data = await updateIssuance(issuanceData, selectedIssuance?.id);
      setToastMessage(data?.message || "Issuance updated successfully!");
      setShowToast(true);
      setToastType("success");
      handleEditIssuance();
      setDateChanged(false);
    } catch (error) {
      setToastMessage(error?.message || "An Error Occured");
      setShowToast(true);
      setToastType("error");
    } finally {
      handleCloseModal();
      setLoading(false)
    }
  }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setIssuanceData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    
    if (id === 'returnTime') {
      setDateChanged(true);
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
      <div>
        <div className="form-group">
          <label
            htmlFor="status"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Status:
          </label>
          <select
            defaultValue={selectedIssuance?.id}
            className="login-input modal-select"
            value={issuanceData.status}
            id="status"
            onChange={handleChange}
            required
          >
            <option selected value={"Returned"}>
              {"Returned"}
            </option>
            <option value={"Issued"}>{"Issued"}</option>
          </select>
        </div>
        <div className="form-group">
          <label
            htmlFor="returnTime"
            className="label-text"
            style={{ marginBottom: "5px" }}
          >
            Return Time:
          </label>
          <div>
            {issuanceData?.type === 'Take away' ? <input
              className="login-input"
              type="date"
              id="returnTime"
              value={issuanceData.returnTime}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            /> : 
            <input
            className="login-input"
            type="time"
            id="returnTime"
            value={issuanceData.returnTime}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[1]}
          />}
            {errors.returnTime && <div className="error-text">{errors.returnTime}</div>}
          </div>
        </div>
        <div className="modal-button">
          <Button onClick={handleEdit} type="submit" text={"Update"} />
        </div>
      </div>
    </Modal>
  );
};

export default IssuanceModal;
