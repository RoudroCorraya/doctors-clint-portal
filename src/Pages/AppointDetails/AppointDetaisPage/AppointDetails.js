import React, { useEffect, useState } from 'react';
import AppointBanner from '../AppointBanner/AppointBanner';
import AvailableAppointment from '../AvailableAppointment/AvailableAppointment';

const AppointDetails = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
     //changing title start
     useEffect(()=>{
        document.title = 'Doctors-Appointment';
    }, [])
    //changing title end
    return (
       
        <div>
            <AppointBanner selectedDate={selectedDate} setSelectedDate={setSelectedDate}></AppointBanner>
            <AvailableAppointment  selectedDate={selectedDate} setSelectedDate={setSelectedDate}></AvailableAppointment>
        </div>
    );
};

export default AppointDetails;