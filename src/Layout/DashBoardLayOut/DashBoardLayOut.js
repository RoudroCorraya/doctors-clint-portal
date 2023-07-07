import React, { useContext, useEffect } from 'react';

import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import { AuthContext } from '../../Contexts/AuthProvider';
// import Navbar from '../../Pages/Home/Home/Shared/Navbar/Navbar';
import DashNavbar from '../../Pages/Home/Home/Shared/Navbar/DashNavbar';

const DashBoardLayOut = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    //changing title start
    useEffect(() => {
        document.title = 'Doctors-DashBoard';
    }, [])
    //changing title end
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <DashNavbar></DashNavbar>


            <div className="drawer lg:drawer-open">
                <input id="dashBoard-deawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side">
                    <label htmlFor="dashBoard-deawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 md:w-80 sm:w-60 h-full  text-base-content bg-base-200 z-50">
                        {/* Sidebar content here */}
                        <li><Link to='/dashboard'>My Appointment</Link></li>

                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/allusers'>All Users</Link></li>
                                <li><Link to='/dashboard/adddoctor'>Add A Doctor</Link></li>
                                <li><Link to='/dashboard/managedoctors'>Manage Doctors</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashBoardLayOut;