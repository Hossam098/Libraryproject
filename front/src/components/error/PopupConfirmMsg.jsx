import React from 'react';
import './PopupError.css';
import { useTranslation } from 'react-i18next';

const PopupConfirmMsg = ({ message, onClose , onSubmit }) => {


  const [t] = useTranslation();

  
  return (
    <div className="popup-error">
      <div className="popup-error-content">
        <div className="popup-error-message" style={{color:"#003C70"}}>{message}</div>
        <div className="popup-error-close" onClick={onClose}>
          &#10006;
        </div>

        
        {/* <button className="popup-login-button" onClick={handleLogin} style={{width: '100%'}}>
        {t('Login')}
        </button> */}
        <div>
          <button className="popup-login-button" onClick={onSubmit} style={{width: '100%',background:"#003C70"}}>
          {t('confirm')}
          </button>
          <button className="popup-login-button" onClick={onClose} style={{width: '100%' }}>
          {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirmMsg;