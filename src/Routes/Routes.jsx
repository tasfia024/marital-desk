import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import KaziDashboard from "../Pages/Dashboards/Kazi-Dashboard/KaziDashboard";
import AuthLayout from "../Layout/AuthLayout";
import About from "../Pages/About/About";
import Services from "../Pages/Services/Services";
import Profile from "../Pages/Profile/Profile";
import UpdateProfile from "../Pages/Profile/UpdateProfile";
import UserDashboard from "../Pages/Dashboards/UserDashboard";
import AdminDashboard from "../Pages/Dashboards/AdminDashboard/AdminDashboard";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
        {
            index: true,
            Component: Home,
        },
        {
            path:'/about',
            Component: About
        },
        {
            path:'/services',
            Component:Services
        },
        {
            path:'/kaziDashboard',
            Component: KaziDashboard
        },
        {
            path:'/userDashboard',
            Component: UserDashboard
        },
        {
            path:'/adminDashboard',
            Component: AdminDashboard,
        },
        {
            path:'/profile',
            Component: Profile
        },
        
    ]
  },
  {
    path: '/auth',
    element:<AuthLayout></AuthLayout>,
    children:[
        {
            path:'/auth/login',
            Component: Login
        },
        {
            path:'/auth/register',
            Component: Register
        },
        {
            path:'/auth/updateProfile',
            Component: UpdateProfile
        },
    ]
  }
]);

export default router;