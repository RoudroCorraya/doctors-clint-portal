import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const BookModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name: treatmentName, slots, price } = treatment;
    const { user } = useContext(AuthContext);
    const date = format(selectedDate, 'PP');
    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const slot = form.slot.value;
        console.log(slot)
        const booking = {
            appointmentDate: date,
            treatment: treatmentName,
            patient: name,
            slot,
            email,
            phone,
            price

        }
        fetch('https://doctor-server-portal.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log('posting data from modal', data);
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking Confirmed');
                    refetch();
                }
                else {
                    toast.error(data.message);
                }

            })
        console.log('forn data cheak', booking);

    }

    return (
        <div>

            <div className='addModal'>
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative text-center">
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                        <form onSubmit={handleBooking} className=''>

                            <h3 className='font-semibold text-2xl text-center my-5'>Fokira {treatmentName}</h3>


                            <input className='w-full rounded-lg h-11 my-2' disabled type='text' value={date} name='rate'></input>
                            <select name='slot' className="select select-bordered w-full">

                                {

                                    slots.map((slot, i) => <option value={slot} key={i}>{slot}</option>)
                                }
                            </select>
                            <input className='w-full input-bordered rounded-lg h-11 my-2' type='text' defaultValue={user?.displayName} disabled placeholder='type here' name='name'></input>
                            <input className='w-full input-bordered rounded-lg h-11 my-2' type='text' defaultValue={user?.email} disabled placeholder='type here' name='email'></input>
                            <input className='w-full input-bordered rounded-lg h-11 my-2' type='text' placeholder='Phone' name='phone'></input>
                            
                            <button className='btn btn-accent w-full   rounded-lg my-4' type='submit'>Submit</button> 
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookModal;