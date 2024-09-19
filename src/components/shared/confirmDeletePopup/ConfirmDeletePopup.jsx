import React from 'react';
import './ConfirmDeletePopup.css';

const ConfirmDeletePopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-container">
        <h3 className="confirm-modal-header">Confirm Delete</h3>
        <p className="confirm-modal-message">Are you sure you want to delete this item?</p>
        <div className="confirm-modal-buttons">
          <button className="button btn-cancel" onClick={onClose}>Cancel</button>
          <button className="button btn-confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
