import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { Navigate } from 'react-router';

const PublicRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return !user ? children : <Navigate to="/marital-desk/dashboard" replace />;
};

export default PublicRoute;