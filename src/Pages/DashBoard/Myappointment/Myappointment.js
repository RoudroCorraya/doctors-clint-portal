import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loading from '../../Home/Home/Shared/Loading/Loading';

const Myappointment = () => {
    const { user } = useContext(AuthContext);
    const url = `https://doctor-server-portal.vercel.app/bookings?email=${user?.email}`;
    //exploring tanquery system for loading data start

    const { data: bookings = [] , refetch, isLoading} = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            if(!user){
                return [];
            }
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessTocken')}`
                }
            });
           
            refetch();
            const data = await res.json();
            console.log('booking', data);
            
            return data;
        }
    });
   console.log(bookings);

   if(isLoading){
    return <Loading></Loading>
}
    //exploring tanquery system for loading data start
    return (
        <div className='overflow-x-hidden'>
            <h2 className='text-3xl mb-5'>My Appointments</h2>
            <div className="overflow-x-auto">
                <table className="table sm:table-xs md:table-md lg:table-lg">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.patient}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid &&
                                        <Link
                                            to={`/dashboard/payment/${booking._id}`}><button className='btn btn-primary'>Pay</button></Link>
                                    }
                                    {
                                        booking.price && booking.paid &&
                                        <button className='btn btn-primaray disabled text-green-400'>Paid</button>
                                    }
                                </td>
                            </tr>)
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Myappointment;