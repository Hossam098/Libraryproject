import './App.css';
import { useTranslation } from 'react-i18next';
import {Outlet} from 'react-router-dom';
import { API_URL } from './config';
import Toggle from './components/togglrLang/Toggle';
import React from 'react';


function App() {

  const [t, i18n] = useTranslation();
  React.useEffect(() => {
    localStorage.setItem('i18nextLng', 'ar');
    i18n.changeLanguage(localStorage.getItem('i18nextLng'));
  }, []);
    
  return (
    <div className="App">
      <Outlet/>
    </div>
  );
}

export default App;
