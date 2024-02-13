import React from 'react';

const ConfirmationPopup = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirmation-popup">
      <p>Are you sure you want to delete this item?</p>
      <div className="buttons">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
