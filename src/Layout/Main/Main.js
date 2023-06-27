import React from 'react';
import Navbar from '../../Pages/Home/Home/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Pages/Home/Home/Shared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;