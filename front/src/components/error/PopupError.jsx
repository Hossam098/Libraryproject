import React from 'react';
import './PopupError.css';

const PopupError = ({ message, onClose }) => {
  return (
    <div className="popup-error">
      <div className="popup-error-content">
        <div className="popup-error-message">{message}</div>
        <div className="popup-error-close" onClick={onClose}>
          &#10006;
        </div>
      </div>
    </div>
  );
};

export default PopupError;