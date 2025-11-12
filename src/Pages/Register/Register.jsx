import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';

const Register = () => {
    const { setUser, createUser, loginWithGoogle ,updateUser } = use(AuthContext);
    const [error, setError] = useState(false);

    // navigation
    const navigate= useNavigate();


    // Show Password
    const [showPassword, setShowPassword] = useState(false);
    // Show PAssword
    const handleToggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const from = e.target;
        const displayName = from.name.value;
        const photoURL = from.photo.value;
        const email = from.email.value;
        const password = from.password.value;
        // console.log({ displayName, photoURL, email, password });

        // Password validation
        if (!/.{6,}/.test(password)) {
            setError('Password must be at least 8 characters long.');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setError('Password must contain at least one uppercase letter.');
            return;
        } else if (!/[a-z]/.test(password)) {
            setError('Password must contain at least one lowercase letter.');
            return;
        } else if (!/\d/.test(password)) {
            setError('Password must contain at least one number.');
            return;
        } else if (!/[@$!%*?&]/.test(password)) {
            setError('Password must contain at least one special character.');
            return;
        } else {
            setError('');
        }

        // register with email/password
        console.log('clicked');
        createUser(email, password)
            .then((result) => {
                // Signed up 
                const user = result.user;
                // Update User
                updateUser({ displayName, photoURL })
                    .then(() => {
                        setUser({ ...user, displayName, photoURL });
                    })
                    .catch((err) => {
                        console.log(err);
                        setUser(user);
                    });
                setUser(user);
                toast.success('User Registration Successfull!!')
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorCode, errorMessage);
            });


    };


    //  login with google
    const handleLoginWithGoogle = (e) => {
        e.preventDefault();
        loginWithGoogle()
            .then((result) => {
                // Signed up 
                const user = result.user;
                setUser(user);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="hero bg-base-200 min-h-screen">


            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-2xl text-center text-green-900 font-bold">Register now!</h1>
                    <form onSubmit={handleRegister}>
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input
                                name='name'
                                type="text"
                                className="input"
                                placeholder="Name"
                            />

                            <label className="label">Photo URL</label>
                            <input
                                name='photo'
                                type="text"
                                className="input"
                                placeholder="Photo URL"
                            />

                            <label className="label">Email</label>
                            <input
                                name='email'
                                type="email"
                                className="input"
                                placeholder="Email"
                                required
                            />

                            {/* password */}
                            <div className="relative">
                                <label className="label">Password</label>
                                <input
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    className="input"
                                    placeholder="Password"
                                />
                                <button
                                    onClick={handleToggleShowPassword}
                                    className="btn btn-xs absolute right-6 bottom-2">
                                    {showPassword ? <FaEyeSlash
                                    /> : <IoMdEye />}
                                </button>
                            </div>


                            {
                                !error ? '' : <p className='text-sm text-red-600 text-center'>{error}</p>
                            }
                            <button className="btn bg-[#006747] text-white mt-4">Register</button>
                        </fieldset>
                    </form>
                    <button
                        onClick={handleLoginWithGoogle}
                        className='btn bg-white'><FcGoogle />Login with Google</button>

                    <p>Already have any account?Please <Link
                        className='text-green-600 underline'
                        to='/auth/login'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );

}

export default Register;