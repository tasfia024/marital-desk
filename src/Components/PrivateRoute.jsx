import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
