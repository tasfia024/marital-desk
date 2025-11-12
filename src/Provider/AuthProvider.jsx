import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../Firebase/firebase.init';


const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // console.log(user);
    // Register with Email/Password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // Login with Google
    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    // login with email/password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    // Logout
    const logout = () => {
        return signOut(auth);
    }
    // Forget password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }
    // Update Profile
    const updateUser = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    }
    // Email verification

    // Store data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);
    // Auth data
    const authData = {
        user,
        setUser,
        createUser,
        loginWithGoogle,
        login,
        logout,
        resetPassword,
        updateUser,
    }
    return <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;