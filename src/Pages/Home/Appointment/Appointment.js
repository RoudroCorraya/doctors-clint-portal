import React from 'react';
import appointmentimg from '../../../assets/images/doctor.png';
import appointmentBg from '../../../assets/images/appointment.png';
import PrimaryButton from '../../../Components/PromaryButton/PrimaryButton';


const Appointment = () => {
    return (
        <section className='mt-16' style={{
            background: `url(${appointmentBg})`
        }}>
            <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <img src={appointmentimg} className="-mt-32 hidden md:block lg: w-1/2 rounded-lg shadow-2xl" alt='doctor.png'/>
                <div>
                <h4 className="text-lg text-primary font-bold">Appointment</h4>
                <h1 className="text-4xl text-white font-bold">Make an appointment Today</h1>
                <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <PrimaryButton>Appointment</PrimaryButton>
                </div>
            </div>
            </div>
        </section>
    );
};

export default Appointment;