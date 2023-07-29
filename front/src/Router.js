import {createBrowserRouter,} from "react-router-dom";
  
import App from './App.jsx'
import Register from "./module/user/register/Register.jsx";
import Landing from "./module/user/landing/Landing.jsx";
import Login from "./module/user/login/Login.jsx";
import Upage from "./module/user/userpage/Upage.jsx";
import Contact from "./components/contact/Contact.jsx";
import Profile from "./components/profile/Profile.jsx";
  
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
        {
         path: "/user",
         element: <Upage/>, 
         children:[
          {
            path:"",
            element: <Contact/>
          },
          {
            path:"/user/profile",
            element: <Profile/>
          }
         ]
        },
      ]
    },
  
  ]);
  
  export default Router
  
  