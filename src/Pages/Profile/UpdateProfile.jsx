import React, { use } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthContext';

const UpdateProfile = () => {
    // Navigate to home page
    const navigate = useNavigate();
    // AuthContext
    const { updateUser, setUser, user } = use(AuthContext);
    const handleUpdateUser = (e) => {
        e.preventDefault();
        const from = e.target;
        const displayName = from.name.value;
        const photoURL = from.photo.value;

        console.log({ displayName, photoURL });

        // Update User
        updateUser({ displayName, photoURL })
            .then(() => {
                setUser({...user,displayName,photoURL});
                toast.success('User profile updated successfully!!')
                navigate('/profile')
            })
            .catch((err) => {
                console.log(err);
                setUser(user);
            });
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="card  w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-2xl font-bold text-center text-[#006747]">Update Profile</h1>
                    <form onSubmit={handleUpdateUser}>
                        <fieldset className="fieldset">
                            {/* Name */}
                            <label className="label">Name</label>
                            <input
                                name='name'
                                type="text"
                                placeholder="Name"
                                className="w-full border border-gray-300 rounded-lg p-3 "
                            />
                            {/* PhotoURL */}
                            <label className="label">Photo URL</label>
                            <input
                                name='photo'
                                type="text"
                                placeholder="Photo URL"
                                defaultValue={user.photoURL || ''}
                                className="w-full border border-gray-300 rounded-lg p-3 "
                            />
                            <button className="bg-[#006747] text-white  font-semibold hover:bg-green-900 btn">Update </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;