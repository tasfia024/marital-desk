import React from 'react';
import Navbar from '../Components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';
import Banner from '../Components/Header/Banner';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            
            <main className='min-h-[50vh] '>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Root;