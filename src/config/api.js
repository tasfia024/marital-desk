import { BASE_URL } from './baseUrl';

// For authenticated requests
export const apiClient = async (endpoint, method = "GET", body = null) => {
    const token = localStorage.getItem("token");

    const options = {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    // If body is FormData → DO NOT touch headers/body
    if (body instanceof FormData) {
        options.body = body;
    }
    // Normal JSON request
    else if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    const res = await fetch(`${BASE_URL}/${endpoint}`, options);

    if (!res.ok) {
        const errorData = await res.json();
        if (errorData.field && errorData.message) {
            throw errorData;
        }
        throw new Error(errorData.message || "API request failed");
    }

    return res.json();
};


// For public requests (no auth)
export const publicApi = async (endpoint, method = 'GET', body = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    const res = await fetch(`${BASE_URL}/${endpoint}`, options);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'API request failed');
    }
    return res.json();
};

// Usage:
// import { apiClient, publicApi } from '../config/apiClient';
// const getProfile = async () => {
//     try {
//         const data = await apiClient('api/user/profile');
//     } catch (error) {}
// };
// const getPublicData = async () => {
//     try {
//         const data = await publicApi('api/public/data');
//     } catch (error) {}
// };