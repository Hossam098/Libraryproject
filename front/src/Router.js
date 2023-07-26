import {createBrowserRouter,} from "react-router-dom";
  
import App from './App.jsx'
import Register from "./module/user/register/Register.jsx";
import Landing from "./module/user/landing/Landing.jsx";
import Login from "./module/user/login/Login.jsx";
  
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {
         path: "",
         element: <Landing/>, 
        },
        {
         path: "/regester",
         element: <Register/>, 
        },
        {
         path: "/login",
         element: <Login/>, 
        },
      ]
    },
  
  ]);
  
  export default Router
  
  