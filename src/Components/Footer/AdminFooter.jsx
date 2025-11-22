import React from 'react';

const AdminFooter = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-4 text-center mt-auto shadow-inner">
            <span>&copy; {new Date().getFullYear()} Marital Desk Admin. All rights reserved.</span>
        </footer>
    );
};

export default AdminFooter;
