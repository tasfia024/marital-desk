
import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router";
import { apiClient } from "../../../config/api";
import { AuthContext } from '../../../Provider/AuthContext';
import { BASE_URL } from '../../../config/baseUrl';

const MarriageProposalForm = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();

    // Determine if current user is groom or bride
    const isGroom = user?.gender?.toLowerCase() === 'male';
    const isBride = user?.gender?.toLowerCase() === 'female';

    const [form, setForm] = useState({
        groomId: isGroom ? user?.id : "",
        groomFather: isGroom ? "" : "",
        groomMother: isGroom ? "" : "",
        groomReligion: isGroom ? "" : "",
        groomOccupation: isGroom ? "" : "",
        groomEducation: isGroom ? "" : "",
        groomAddress: isGroom ? user?.address || "" : "",

        brideId: isBride ? user?.id : "",
        brideFather: isBride ? "" : "",
        brideMother: isBride ? "" : "",
        brideReligion: isBride ? "" : "",
        brideOccupation: isBride ? "" : "",
        brideEducation: isBride ? "" : "",
        brideAddress: isBride ? user?.address || "" : "",

        kaziId: "",
    });

    const [users, setUsers] = useState([]);
    const [allKazis, setAllKazis] = useState([]);
    const [filteredKazis, setFilteredKazis] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchOtherParty, setSearchOtherParty] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedOtherParty, setSelectedOtherParty] = useState(null);
    const [kaziSearchDistrict, setKaziSearchDistrict] = useState("");
    const [kaziSearchUpazila, setKaziSearchUpazila] = useState("");

    // Fetch users and kazis
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [usersRes, kazisRes] = await Promise.all([
                    apiClient("api/v1/marital-desk/users"),
                    apiClient("api/v1/marital-desk/approved-kazis"),
                ]);
                setUsers(usersRes.users || []);
                setAllKazis(kazisRes.applications || []);
                setFilteredKazis(kazisRes.applications || []);
            } catch (err) {
                setError("Failed to fetch data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter kazis by district and upazila
    useEffect(() => {
        let filtered = allKazis;

        if (kaziSearchDistrict) {
            filtered = filtered.filter(k =>
                k.district?.toLowerCase().includes(kaziSearchDistrict.toLowerCase())
            );
        }

        if (kaziSearchUpazila) {
            filtered = filtered.filter(k =>
                k.upazila?.toLowerCase().includes(kaziSearchUpazila.toLowerCase())
            );
        }

        setFilteredKazis(filtered);
    }, [kaziSearchDistrict, kaziSearchUpazila, allKazis]);

    // Filter users for the other party
    useEffect(() => {
        if (searchOtherParty) {
            const filtered = users.filter(u => {
                // If current user is groom, show only female users (brides)
                if (isGroom) {
                    return u.gender?.toLowerCase() === 'female' &&
                        (u.name?.toLowerCase().includes(searchOtherParty.toLowerCase()) ||
                            u.email?.toLowerCase().includes(searchOtherParty.toLowerCase()));
                }
                // If current user is bride, show only male users (grooms)
                else if (isBride) {
                    return u.gender?.toLowerCase() === 'male' &&
                        (u.name?.toLowerCase().includes(searchOtherParty.toLowerCase()) ||
                            u.email?.toLowerCase().includes(searchOtherParty.toLowerCase()));
                }
                return false;
            });
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    }, [searchOtherParty, users, isGroom, isBride]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelectOtherParty = (selectedUser) => {
        setSelectedOtherParty(selectedUser);
        if (isGroom) {
            setForm(prev => ({
                ...prev,
                brideId: selectedUser.id,
                brideFather: "",
                brideMother: "",
                brideReligion: "",
                brideOccupation: "",
                brideEducation: "",
                brideAddress: selectedUser.address || "",
            }));
        } else if (isBride) {
            setForm(prev => ({
                ...prev,
                groomId: selectedUser.id,
                groomFather: "",
                groomMother: "",
                groomReligion: "",
                groomOccupation: "",
                groomEducation: "",
                groomAddress: selectedUser.address || "",
            }));
        }
        setSearchOtherParty("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!form.groomId || !form.brideId || !form.kaziId) {
            setError("Groom, Bride, and Kazi selection are required.");
            return;
        }

        // Validate groom fields
        if (!form.groomFather || !form.groomMother || !form.groomReligion || !form.groomOccupation || !form.groomEducation || !form.groomAddress) {
            setError("All groom fields are required.");
            return;
        }

        // Validate bride fields
        if (!form.brideFather || !form.brideMother || !form.brideReligion || !form.brideOccupation || !form.brideEducation || !form.brideAddress) {
            setError("All bride fields are required.");
            return;
        }

        setError("");
        try {
            await apiClient("api/v1/marital-desk/marriage-applications", "POST", {
                ...form,
                proposedBy: user?.id,
            });
            navigate("/marital-desk/marriage-proposals");
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to create marriage proposal");
        }
    };

    if (!isGroom && !isBride) {
        return (
            <main className="flex-1 p-10">
                <header className="border-b border-gray-300 pb-4 mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Marriage Proposal</h2>
                </header>
                <section className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <p className="text-red-600 font-semibold">Error: Please update your profile with gender information before creating a marriage proposal.</p>
                </section>
            </main>
        );
    }

    if (loading) {
        return (
            <main className="flex-1 p-10">
                <p className="text-center">Loading...</p>
            </main>
        );
    }

    return (
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Marriage Proposal Form</h2>
                <a href="javascript:void(0);" className="px-4 py-2 bg-gray-300 rounded font-semibold" onClick={() => navigate("/marital-desk/marriage-proposals")}>Back</a>
            </header>

            <section>
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full">
                    {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

                    {/* ===== CURRENT USER DETAILS CARD ===== */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-300">
                        <h3 className="text-lg font-bold mb-4 text-blue-800">{isGroom ? "Your Details (Groom)" : "Your Details (Bride)"}</h3>
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                                {user?.image ? (
                                    <img src={`${BASE_URL}${user.image}`} crossOrigin="anonymous" alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white text-3xl">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-xl font-bold text-gray-800">{user?.name}</p>
                                <p className="text-gray-600">{user?.email}</p>
                                <p className="text-gray-600">{user?.mobile}</p>
                            </div>
                        </div>
                    </div>

                    {/* ===== GROOM SECTION ===== */}
                    <div className="mb-8 pb-6 border-b">
                        <h3 className="text-xl font-bold mb-4 text-blue-700">Groom Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {isGroom ? (
                                <>
                                    <div>
                                        <label className="block mb-1 font-medium">Groom ID <span className="text-red-600">*</span></label>
                                        <input type="text" value={form.groomId} disabled className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="md:col-span-2">
                                        <label className="block mb-1 font-medium">Search and Select Groom <span className="text-red-600">*</span></label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search by name or email..."
                                                value={searchOtherParty}
                                                onChange={(e) => setSearchOtherParty(e.target.value)}
                                                className="w-full border rounded px-3 py-2 bg-white"
                                            />
                                            {filteredUsers.length > 0 && (
                                                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow-lg mt-1 max-h-48 overflow-y-auto z-10">
                                                    {filteredUsers.map(u => (
                                                        <div
                                                            key={u.id}
                                                            onClick={() => handleSelectOtherParty(u)}
                                                            className="p-3 hover:bg-blue-100 cursor-pointer border-b last:border-b-0 flex items-center gap-3"
                                                        >
                                                            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                                                                {u.image ? (
                                                                    <img src={`${BASE_URL}${u.image}`} crossOrigin="anonymous" alt={u.name} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white text-sm font-bold">
                                                                        {u.name?.charAt(0).toUpperCase()}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold">{u.name}</p>
                                                                <p className="text-sm text-gray-600">{u.email}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {form.groomId && selectedOtherParty && (
                                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                                                    {selectedOtherParty.image ? (
                                                        <img src={`${BASE_URL}${selectedOtherParty.image}`} crossOrigin="anonymous" alt={selectedOtherParty.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white font-bold">
                                                            {selectedOtherParty.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">✓ {selectedOtherParty.name}</p>
                                                    <p className="text-xs text-gray-600">{selectedOtherParty.email}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                            <div>
                                <label className="block mb-1 font-medium">Father's Name <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    name="groomFather"
                                    value={form.groomFather}
                                    onChange={handleChange}
                                    disabled={isGroom && !form.groomId}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Mother's Name <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    name="groomMother"
                                    value={form.groomMother}
                                    onChange={handleChange}
                                    disabled={isGroom && !form.groomId}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Religion <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    name="groomReligion"
                                    value={form.groomReligion}
                                    onChange={handleChange}
                                    disabled={isGroom && !form.groomId}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Occupation <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    name="groomOccupation"
                                    value={form.groomOccupation}
                                    onChange={handleChange}
                                    disabled={isGroom && !form.groomId}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Education <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    name="groomEducation"
                                    value={form.groomEducation}
                                    onChange={handleChange}
                                    disabled={isGroom && !form.groomId}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-1 font-medium">Address <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    name="groomAddress"
                                    value={form.groomAddress}
                                    onChange={handleChange}
                                    disabled={isGroom && !form.groomId}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ===== BRIDE SECTION ===== */}
                    <div className="mb-8 pb-6 border-b">
                        <h3 className="text-xl font-bold mb-4 text-pink-700">Bride Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {isBride ? (
                                <>
                                    <div>
                                        <label className="block mb-1 font-medium">Bride ID <span className="text-red-600">*</span></label>
                                        <input type="text" value={form.brideId} disabled className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="md:col-span-2">
                                        <label className="block mb-1 font-medium">Search and Select Bride <span className="text-red-600">*</span></label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search by name or email..."
                                                value={searchOtherParty}
                                                onChange={(e) => setSearchOtherParty(e.target.value)}
                                                className="w-full border rounded px-3 py-2 bg-white"
                                            />
                                            {filteredUsers.length > 0 && (
                                                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow-lg mt-1 max-h-48 overflow-y-auto z-10">
                                                    {filteredUsers.map(u => (
                                                        <div
                                                            key={u.id}
                                                            onClick={() => handleSelectOtherParty(u)}
                                                            className="p-3 hover:bg-pink-100 cursor-pointer border-b last:border-b-0 flex items-center gap-3"
                                                        >
                                                            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                                                                {u.image ? (
                                                                    <img src={u.image} alt={u.name} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white text-sm font-bold">
                                                                        {u.name?.charAt(0).toUpperCase()}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold">{u.name}</p>
                                                                <p className="text-sm text-gray-600">{u.email}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {form.brideId && selectedOtherParty && (
                                            <div className="mt-4 p-3 bg-pink-50 border border-pink-200 rounded flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                                                    {selectedOtherParty.image ? (
                                                        <img src={selectedOtherParty.image} alt={selectedOtherParty.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white font-bold">
                                                            {selectedOtherParty.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">✓ {selectedOtherParty.name}</p>
                                                    <p className="text-xs text-gray-600">{selectedOtherParty.email}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                            <div>
                                <label className="block mb-1 font-medium">Father's Name <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    name="brideFather"
                                    value={form.brideFather}
                                    onChange={handleChange}
                                    disabled={isBride && !form.brideId}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Mother's Name <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    name="brideMother"
                                    value={form.brideMother}
                                    onChange={handleChange}
                                    disabled={isBride && !form.brideId}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Religion <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    name="brideReligion"
                                    value={form.brideReligion}
                                    onChange={handleChange}
                                    disabled={isBride && !form.brideId}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Occupation <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    name="brideOccupation"
                                    value={form.brideOccupation}
                                    onChange={handleChange}
                                    disabled={isBride && !form.brideId}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Education <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    name="brideEducation"
                                    value={form.brideEducation}
                                    onChange={handleChange}
                                    disabled={isBride && !form.brideId}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-1 font-medium">Address <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    name="brideAddress"
                                    value={form.brideAddress}
                                    onChange={handleChange}
                                    disabled={isBride && !form.brideId}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ===== KAZI SECTION ===== */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 text-green-700">Select Kazi (Marriage Registrar)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <label className="block mb-1 font-medium">Search by District</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Dhaka"
                                    value={kaziSearchDistrict}
                                    onChange={(e) => setKaziSearchDistrict(e.target.value)}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Search by Upazila</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Gulshan"
                                    value={kaziSearchUpazila}
                                    onChange={(e) => setKaziSearchUpazila(e.target.value)}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Kazi <span className="text-red-600">*</span></label>
                                <select
                                    name="kaziId"
                                    value={form.kaziId}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                >
                                    <option value="">-- Select a Kazi ({filteredKazis.length}) --</option>
                                    {filteredKazis.map(kazi => (
                                        <option key={kazi.id} value={kazi.id}>
                                            {kazi.name} ({kazi.district}, {kazi.upazila})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* ===== SUBMIT BUTTON ===== */}
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/marital-desk/marriage-proposals")}
                            className="px-6 py-2 bg-gray-400 text-white rounded font-semibold hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-700 text-white rounded font-semibold hover:bg-green-800"
                        >
                            Submit Marriage Proposal
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default MarriageProposalForm;
