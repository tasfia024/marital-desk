import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import AdminLayout from "../Layout/AdminLayout"; // Import the new layout
import PrivateRoute from "../Components/PrivateRoute";
import PublicRoute from '../Components/PublicRoute';
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import About from "../Pages/About/About";
import Services from "../Pages/Services/Services";
import Profile from "../Pages/Backend/Profile/Profile";
import UpdateProfile from "../Pages/Backend/Profile/UpdateProfile";
import Dashboard from "../Pages/Backend/Dashboard/Dashboard";
import MarriageProposal from "../Pages/Backend/MarriageProposal/MarriageProposal";
import MarriageApplication from "../Pages/Backend/MarriageApplication/MarriageApplication";
import KaziApplication from "../Pages/Backend/KaziApplication/KaziApplication";
import KaziApplicationForm from "../Pages/Backend/KaziApplication/KaziApplicationForm";
import KaziApplicationView from "../Pages/Backend/KaziApplication/KaziApplicationView";
import DivorceApplication from "../Pages/Backend/DivorceApplication/DivorceApplication";
import MarriageCertificate from "../Pages/Backend/MarriageCertificate/MarriageCertificate";
import ManageUser from "../Pages/Backend/ManageUser/ManageUser";

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
            { path: 'marriage-proposals', Component: MarriageProposal },
            { path: 'marriage-applications', Component: MarriageApplication },
            { path: 'divorce-applications', Component: DivorceApplication },
            { path: 'kazi-applications', Component: KaziApplication },
            { path: 'kazi-applications/new', Component: KaziApplicationForm },
            { path: 'kazi-applications/edit/:id', Component: KaziApplicationForm },
            { path: 'kazi-applications/view/:id', Component: KaziApplicationView },
            { path: 'marriage-certificates', Component: MarriageCertificate },
            { path: 'manage-users', Component: ManageUser },
        ]
    }
]);

export default router;