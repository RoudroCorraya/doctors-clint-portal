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

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
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
       children: [
        {
            path: '/dashboard',
            element: <Myappointment></Myappointment>

        },
        {
            path: '/dashboard/allusers',
            element: <AdminRoute><AllUsers></AllUsers></AdminRoute>

        }
       ]
    }
])

export default router;