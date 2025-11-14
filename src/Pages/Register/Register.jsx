import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';

const Register = () => {
    const { setUser, createUser } = use(AuthContext);
    const [error, setError] = useState(false);

    // navigation
    const navigate = useNavigate();

    // Show Password
    const [showPassword, setShowPassword] = useState(false);
    const handleToggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const from = e.target;
        const displayName = from.name.value;
        const email = from.email.value;
        const password = from.password.value;

        // Password validation
        if (!/.{8,}/.test(password)) {
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

        try {
            await createUser(displayName, email, password);
            toast.success('User Registration Successful!');
            navigate('/');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

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
                                required
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
                                !error ? '' : <p className="text-sm text-red-600 text-center">{error}</p>
                            }
                            <button type="submit" className="btn bg-[#006747] text-white mt-4">Register</button>
                        </fieldset>
                    </form>

                    <p>Already have any account? Please <Link
                        className="text-green-600 underline"
                        to='/login'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );

}

export default Register;