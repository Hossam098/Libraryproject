import React from 'react';
import './PopupError.css';
import { useTranslation } from 'react-i18next';

const PopupConfirmMsg = ({ message, onClose, onSubmit, blue }) => {


  const [t] = useTranslation();


  return (
    <div className="popup-error">
      <div className="popup-error-content">
        <div className="popup-error-message" style={{ color: "#19355A" }}>{message}</div>
        <div className="popup-error-close" onClick={onClose}>
          &#10006;
        </div>
        <div>
          <button
            className="popup-login-button"
            onClick={onSubmit}
            style={{ width: '100%', background: blue ? "#19355A"  : null}}
          >
            {t('confirm')}
          </button>
          <button className="popup-login-button" onClick={onClose} style={{ width: '100%' }}>
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirmMsg;