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

  useEffect(() => {
    if (selectedIssuance) {
      setIssuanceData({
        userId: selectedIssuance?.user?.id,
        bookId: selectedIssuance?.book?.id,
        status: selectedIssuance?.status,
        returnTime: selectedIssuance?.expectedReturnTime,
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
  }, [selectedIssuance]);

  const handleEdit = async () => {
    try {
      setLoading(true)
      const data = await updateIssuance(issuanceData, selectedIssuance?.id);
      setToastMessage(data?.message || "Issuance updated successfully!");
      setShowToast(true);
      setToastType("success");
      handleEditIssuance();
    } catch (error) {
      setToastMessage(error?.message || "An Error Occured");
      setShowToast(true);
      setToastType("error");
    } finally {
      handleCloseModal();
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setIssuanceData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
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
          <input
            className="login-input"
            type="datetime-local"
            id="returnTime"
            value={issuanceData.returnTime}
            onChange={handleChange}
          />
        </div>
        <div className="modal-button">
          <Button onClick={handleEdit} type="submit" text={"Update"} />
        </div>
      </div>
    </Modal>
  );
};

export default IssuanceModal;
