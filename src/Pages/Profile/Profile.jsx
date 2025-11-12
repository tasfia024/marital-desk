import React, { useContext, useEffect, } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthContext';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Profile = () => {
    // animation
    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 100,
            once: true,
        });
    }, []);

    const { user, } = useContext(AuthContext);
    console.log(user);

    return (
        <div className="flex flex-col items-center mt-10 px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL || ''}
                            alt="User"
                            referrerPolicy="no-referrer"
                            className="w-24 h-24 rounded-full object-cover border-2 border-[#006747] "
                            data-aos="fade-down"
                            data-aos-delay="100"
                        />
                    ) : (
                        <FaUserCircle className="text-7xl text-gray-400" />
                    )}

                    <h2 className="text-2xl font-bold mt-2" data-aos="fade-up">
                        {user?.displayName || 'User'}
                    </h2>
                    <p className="text-gray-500" data-aos="fade-up" data-aos-delay="100">{user?.email}</p>
                    <Link
                        to='/auth/updateProfile'
                        className="btn bg-[#006747] hover:bg-green-900 text-white w-full"
                        data-aos="fade-up" 
                        data-aos-delay="200"
                    >Update Profile
                    </Link>


                </div>
            </div>
        </div>
    );
};

export default Profile;
