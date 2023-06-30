import React from 'react';

const AppointOption = ({ option, setTreatment }) => {
    const { _id, name, slots, price } = option;
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="card-title text-secondary mx-auto text-2xl font-bold">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Tyr Another Day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <p className='font-semibold'><small>Price : $ {price}</small></p>
                <div className="card-actions justify-center">
                    
                    
                    <label htmlFor="my-modal-3" disabled={slots.length === 0} className="btn btn-primary text-white" onClick={()=>setTreatment(option)}>Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointOption;