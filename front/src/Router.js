import {createBrowserRouter,} from "react-router-dom";
  
import App from './App.jsx'
import Register from "./module/user/register/Register.jsx";
import Landing from "./module/user/landing/Landing.jsx";
import Login from "./module/user/login/Login.jsx";
import Upage from "./module/user/userpage/Upage.jsx";
import Profile from "./module/user/profile/Profile.jsx";
import Home from "./module/user/home/Home.jsx";
import Service from "./module/user/service/Service.jsx";
import Instructons from "./module/user/instructions/Instructons.jsx";
import Paymentcode from "./module/user/payment/Paymentcode.jsx";
import Myser from "./module/user/myser/Myser.jsx";
import AllService from "./module/user/AllService/AllService.jsx";
import About from "./module/user/about/About.jsx"
import Contact from "./module/user/contact/Contact.jsx"

  
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {
         path: "",
         element: <Upage/>,
         children:[
          {
            path:"",
            element: <Home/>
          },
          {
            path:"/about",
            element: <About/>
          },
          {
            path:"/contact",
            element: <Contact/>
          },
          {
            path:"/profile",
            element: <Profile/>
          },
          {
            path:"/allServices",
            element: <AllService/>
          },
          {
            path:"/Myservices",
            element: <Myser/>
          },
          {
            path:"/service/:id",
            element: <Service/>
          },
          {
            path:"/instructions/:id",
            element: <Instructons/>
          },
          {
            path:"/pay/:id",
            element: <Paymentcode/>
          }
         ] 
        },
        {
         path: "/register",
         element: <Register/>, 
        },
        {
         path: "/login",
         element: <Login/>, 
        }
      ]
    },
  
  ]);
  
  export default Router
  
  