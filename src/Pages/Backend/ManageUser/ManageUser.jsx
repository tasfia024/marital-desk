import React, { useEffect, useState } from "react";
import { apiClient } from "../../../config/api";

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", email: "", mobile: "" });
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [addForm, setAddForm] = useState({ name: "", email: "", mobile: "", password: "" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await apiClient("api/v1/marital-desk/users");
            setUsers(res.users || []);
        } catch (err) {
            setError("Failed to fetch users");
        }
        setLoading(false);
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setEditForm({ name: user.name || "", email: user.email || "", mobile: user.mobile || "" });
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient(`api/v1/marital-desk/users/${editUser.id}`, "PUT", editForm);
            setEditUser(null);
            fetchUsers();
        } catch (err) {
            setError("Failed to update user");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await apiClient(`api/v1/marital-desk/users/${id}`, "DELETE");
            fetchUsers();
        } catch (err) {
            setError("Failed to delete user");
        }
    };
    return (
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-green-900">User List</h2>
                <button className="px-4 py-2 bg-green-700 text-white rounded" onClick={() => setAddModalOpen(true)}>Add User</button>
            </header>

            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <section>
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gradient-to-r from-[#013223] to-[#006747] text-white">
                                <tr>
                                    <th className="p-3">#</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Role</th>
                                    <th className="p-3">Mobile</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-100 text-gray-800">
                                        <td className="p-3">{idx + 1}</td>
                                        <td className="p-3">{user.name}</td>
                                        <td className="p-3">{user.role}</td>
                                        <td className="p-3">{user.mobile || "-"}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3 text-center space-x-2">
                                            <button className="px-3 py-1 bg-green-900 text-white rounded hover:bg-green-800" onClick={() => handleEdit(user)}>
                                                Edit
                                            </button>
                                            <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => handleDelete(user.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* Add User Modal */}
            {addModalOpen && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.4)", zIndex: 1000 }} className="flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md text-gray-800">
                        <h3 className="text-lg font-bold mb-4">Add User</h3>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                                await apiClient("api/v1/marital-desk/users", "POST", addForm);
                                setAddModalOpen(false);
                                setAddForm({ name: "", email: "", mobile: "", password: "" });
                                fetchUsers();
                            } catch (err) {
                                setError("Failed to add user");
                            }
                        }} className="space-y-4">
                            <input type="text" name="name" value={addForm.name} onChange={e => setAddForm({ ...addForm, name: e.target.value })} placeholder="Name" className="w-full p-2 border rounded" required />
                            <input type="email" name="email" value={addForm.email} onChange={e => setAddForm({ ...addForm, email: e.target.value })} placeholder="Email" className="w-full p-2 border rounded" required />
                            <input type="text" name="mobile" value={addForm.mobile} onChange={e => setAddForm({ ...addForm, mobile: e.target.value })} placeholder="Mobile" className="w-full p-2 border rounded" />
                            <input type="password" name="password" value={addForm.password} onChange={e => setAddForm({ ...addForm, password: e.target.value })} placeholder="Password" className="w-full p-2 border rounded" required />
                            <div className="flex justify-end space-x-2">
                                <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setAddModalOpen(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-green-700 text-white rounded">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editUser && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.4)", zIndex: 1000 }} className="flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md text-gray-800">
                        <h3 className="text-lg font-bold mb-4">Edit User</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <input type="text" name="name" value={editForm.name} onChange={handleEditChange} placeholder="Name" className="w-full p-2 border rounded" required />
                            <input type="email" name="email" value={editForm.email} onChange={handleEditChange} placeholder="Email" className="w-full p-2 border rounded" required />
                            <input type="text" name="mobile" value={editForm.mobile} onChange={handleEditChange} placeholder="Mobile" className="w-full p-2 border rounded" />
                            <div className="flex justify-end space-x-2">
                                <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setEditUser(null)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-green-700 text-white rounded">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default ManageUser;
