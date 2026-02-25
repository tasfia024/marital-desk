import { useState, useEffect } from 'react';
import { use } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { apiClient } from '../config/api';

const useRole = () => {
    const { user: contextUser, updateUser } = use(AuthContext);
    const [userData, setUserData] = useState(contextUser || {});
    const [isRoleLoading, setIsRoleLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            // If we already have user data with role, use that
            if (contextUser?.role) {
                setUserData(contextUser);
                return;
            }

            // If user is logged in but no role data, fetch from API
            if (contextUser?.email) {
                try {
                    setIsRoleLoading(true);
                    const response = await apiClient(`api/auth/user-profile`);
                    
                    if (response?.user) {
                        setUserData(response.user);
                        // Update context with latest user data
                        if (updateUser) {
                            updateUser(response.user);
                        }
                    }
                } catch (err) {
                    console.error('Error fetching user role:', err);
                    setError(err.message || 'Failed to fetch user role');
                    setUserData({});
                } finally {
                    setIsRoleLoading(false);
                }
            } else {
                // No user logged in
                setUserData({});
                setIsRoleLoading(false);
            }
        };

        fetchUserRole();
    }, [contextUser, updateUser]);

    return { userData, isRoleLoading, error };
};

export default useRole;