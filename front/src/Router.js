import {createBrowserRouter,} from "react-router-dom";
  
import App from './App.jsx'
import Register from "./module/user/register/Register.jsx";
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
import ServiceStepTwo from "./module/user/serviceStepTwo/ServiceStepTwo.jsx";
import ManagerLogin from "./module/admin/Alogin/ManagerLogin.jsx";
import Manager from "./module/admin/manager/Manager.jsx";
import { SuperAdmin } from "./module/admin/SuperAdmin/SuperAdmin.jsx";
import StudentListadmin from "./module/admin/manager/studentList/StudentList.jsx";
import Review from "./module/admin/manager/review/Review.jsx";
import Show from "./module/admin/manager/show/Show.jsx"
import Reviewed from "./module/admin/manager/reviewed/Reviewed.jsx";
import AdminLogin from "./module/admin/admin/AdminLog/AdminLogin.jsx";
import Admin from "./module/admin/admin/Admin.jsx";
import  Charts  from "./module/admin/admin/charts/Charts.jsx";
import All from "./module/admin/manager/all/All.jsx"
import AllUsers from "./module/admin/admin/allusers/AllUsers.jsx";
import AShow from "./module/admin/admin/Ashow/Ashow.jsx";
import AdminReset from "./module/admin/admin/AdminLog/AdminReset.jsx";
import AdminsList from "./module/admin/admin/adminslist/AdminsList.jsx";
import UserReset from "./module/user/login/UserReset.jsx";

  
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
            path:"/serviceStepTwo/:id/:id2",
            element: <ServiceStepTwo/>
          },
          {
            path:"/serviceStepTwo/:id/:id2/:num",
            element: <ServiceStepTwo/>
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
        },
        {
          path:"/ManagerLogin",
          element:<ManagerLogin/>        
        },
        {
          path:"/AdminLOgin",
          element:<AdminLogin/>        
        },
        {
          path:"/AdminReset",
          element:<AdminReset/>        
        },
        {
          path:"/resetpassword",
          element:<UserReset/>        
        },
        {
          path:"/resetpassword",
          element:<UserReset/>        
        },
        {
          path:"/manager",
          element:<Manager/>,   
          children:[
            {
              path:"",
              element:<StudentListadmin/>
              ,  
            },
            {
              path:"/manager/all",
              element:<All/>
              ,  
            },
            {
              path:"/manager/reviewed",
              element:<Reviewed/>,  
            },
            {
              path:"/manager/Review",
              element:<Review/>,  
            },
            {
              path:"/manager/show/:id",
              element:<Show/>,  
            },
          ]     
        },
        {
          path:"/Admin",
          element:<Admin/>,   
          children:[
            {
              path:"",
              element:<Charts/>,  
            },
            {
              path:"/Admin/all",
              element:<AllUsers/>,  
            },
            {
              path:"/Admin/show/:id",
              element:<AShow/>,  
            },
            {
              path:"/Admin/admins",
              element:<AdminsList/>,  
            },
            
          ]     
        },
        
      ]
    },
    
  
  ]);
  
  export default Router
  
  