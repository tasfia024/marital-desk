import useRole from "../../../hooks/useRole";
import UserDashboard from "./UserDashboard";
import KaziDashboard from "./KaziDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
    const {userData}=useRole();
    console.log("user data-->",userData)
    return (
        <div className="">
            {
                userData?.role==="user" && <UserDashboard/>
            }
            {
                userData?.role==="kazi" && <KaziDashboard/>
            }
            {
                userData?.role==="super-admin" && <AdminDashboard/>
            }
        </div>
    );
};

export default Dashboard;
