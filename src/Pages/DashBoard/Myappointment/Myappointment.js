import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const Myappointment = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    //exploring tanquery system for loading data start

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessTocken')}`
                }
            });
            const data = await res.json();
            console.log('booking', data);
            return data;
        }
    })

    //exploring tanquery system for loading data start
    return (
        <div>
            <h2 className='text-3xl mb-5'>My Appointments</h2>
            <div className="overflow-x-auto">
                <table className="table">
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
                            bookings.map((booking, i) => <tr key={booking._id}>
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
                        {/* <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                            <td>Blue</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Myappointment;