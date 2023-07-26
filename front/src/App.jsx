import './App.css';
import { useTranslation } from 'react-i18next';
import {Outlet} from 'react-router-dom';
import { API_URL } from './config';
import Toggle from './components/togglrLang/Toggle';


function App() {

  const [t, i18n] = useTranslation();

  return (
    <div className="App">
      <Outlet/>
    </div>
  );
}

export default App;
