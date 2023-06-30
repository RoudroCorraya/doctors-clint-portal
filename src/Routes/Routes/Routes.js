import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import LogIn from "../../Pages/LogIn/LogIn";
import Appointment from "../../Pages/Home/Appointment/Appointment";
import AppointDetails from "../../Pages/AppointDetails/AppointDetaisPage/AppointDetails";
import SignUp from "../../Pages/SignUp/SignUp";
import DashBoard from "../../Pages/DashBoard/DashBoard/DashBoard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashBoardLayOut from "../../Layout/DashBoardLayOut/DashBoardLayOut";
import Myappointment from "../../Pages/DashBoard/Myappointment/Myappointment";
import AllUsers from "../../Pages/DashBoard/AllUsers/AllUsers";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddDoctor from "../../Pages/DashBoard/AddDoctor/AddDoctor";
import ManageDoctors from "../../Pages/DashBoard/ManageDoctors/ManageDoctors";
import Payment from "../../Pages/DashBoard/DashBoard/Payment/Payment";
import DisplayError from "../../Pages/Home/Home/Shared/DisplayError/DisplayError";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
                
            },
            {
                path: '/login',
                element: <LogIn></LogIn>
            },
            {
                path: '/appointment',
                element: <AppointDetails></AppointDetails>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
       path: '/dashboard',
       element: <PrivateRoute><DashBoardLayOut></DashBoardLayOut></PrivateRoute>,
       errorElement: <DisplayError></DisplayError>,
       children: [
        {
            path: '/dashboard',
            element: <Myappointment></Myappointment>

        },
        {
            path: '/dashboard/allusers',
            element: <AdminRoute><AllUsers></AllUsers></AdminRoute>

        },
        {
            path: '/dashboard/adddoctor',
            element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>

        },
        {
            path: '/dashboard/managedoctors',
            element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>

        },
        {
            path: '/dashboard/payment/:_id',
            element: <AdminRoute><Payment></Payment></AdminRoute>,
            loader: ({params}) => fetch(`http://localhost:5000/bookings/${params._id}`)
            

        }
       ]
    }
])

export default router;