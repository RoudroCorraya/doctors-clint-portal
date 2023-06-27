import React, { useContext } from 'react';
import Navbar from '../../Pages/Home/Home/Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import { AuthContext } from '../../Contexts/AuthProvider';

const DashBoardLayOut = () => {
    const {user} = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="dashBoard-deawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                <Outlet></Outlet>
                    

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashBoard-deawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link to='/dashboard'>My Appointment</Link></li>
                        
                        {
                            isAdmin &&
                            <>
                            <li><Link to='/dashboard/allusers'>All Users</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
            
        </div>
    );
};

export default DashBoardLayOut;