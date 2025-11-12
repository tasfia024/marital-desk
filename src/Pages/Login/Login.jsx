import React, { use, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { FaEyeSlash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';

const Login = () => {
    const { setUser, login, loginWithGoogle, resetPassword } = use(AuthContext);
    // Show Password
    const [showPassword, setShowPassword] = useState(false);
    // get email
    const emailRef = useRef();
    const [email, setEmail] = useState('');

    // navigation
    const navigate = useNavigate();

    // login with email/password
    const handleLogin = (e) => {
        e.preventDefault();
        const from = e.target;
        const email = from.email.value;
        const password = from.password.value;
        // console.log({ email, password });
        login(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                toast.success('Logged in successfully!!');
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorCode, errorMessage);
            });
    }

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

    // Show Password
    const handleToggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    // Reset Password
    const handleResetPassword = (e) => {
        e.preventDefault();

        if (!email) {
            toast.warn('Please enter your email address first.');
            return;
        }
        resetPassword(email)
            .then(() => {
                window.open("https://mail.google.com", "_blank");
                // toast.success('Check your email!')
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-2xl text-center text-green-900 font-bold">Login now!</h1>
                    <form onSubmit={handleLogin}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input
                                name='email'
                                type="email"
                                className="input"
                                placeholder="Email"
                                ref={emailRef}
                                value={email}
                                onChange={handleEmailChange}
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
                            <Link
                                onClick={handleResetPassword}
                                className="hover:underline mt-2"
                            >
                                Forgot password?
                            </Link>
                            <button className="btn bg-[#006747] text-white  mt-4">Login</button>
                        </fieldset>

                    </form>
                    <button
                        onClick={handleLoginWithGoogle}
                        className='btn bg-white'><FcGoogle />Login with Google
                    </button>

                    <p>Does not have any account?Please <Link
                        className='text-green-600 underline'
                        to='/auth/register'>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;