import React, { useEffect } from 'react';
import Banner from './Banner/Banner';
import InfoCards from '../InfoCards/InfoCards';
import Services from '../Services/Services';
import Exceptional from '../Exceptional/Exceptional';
import Appointment from '../Appointment/Appointment';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    //changing title start
    useEffect(()=>{
        document.title = 'Doctors-Home';
    }, [])
    //changing title end
    return (
        <div className='mx-10'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <Exceptional></Exceptional>
            <Appointment></Appointment>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;