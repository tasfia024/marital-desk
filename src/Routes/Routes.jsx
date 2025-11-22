import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import AdminLayout from "../Layout/AdminLayout"; // Import the new layout
import PrivateRoute from "../Components/PrivateRoute";
import PublicRoute from '../Components/PublicRoute';
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import KaziDashboard from "../Pages/Backend/Dashboard/KaziDashboard";
import About from "../Pages/About/About";
import Services from "../Pages/Services/Services";
import Profile from "../Pages/Backend/Profile/Profile";
import UpdateProfile from "../Pages/Backend/Profile/UpdateProfile";
import AdminDashboard from "../Pages/Backend/Dashboard/AdminDashboard";
import Dashboard from "../Pages/Backend/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            { index: true, Component: Home },
            { path: '/about', Component: About },
            { path: '/services', Component: Services },
            { path: '/profile', Component: Profile },
            {
                path: '/login', Component: () => (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                )
            },
            {
                path: '/register', Component: () => (
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                )
            },
        ]
    },
    {
        path: "/marital-desk",
        Component: (props) => (
            <PrivateRoute>
                <AdminLayout {...props} />
            </PrivateRoute>
        ),
        children: [
            { path: 'dashboard', Component: Dashboard },
            { path: 'kazi-dashboard', Component: KaziDashboard },
            { path: 'admin-dashboard', Component: AdminDashboard },
        ]
    }
]);

export default router;