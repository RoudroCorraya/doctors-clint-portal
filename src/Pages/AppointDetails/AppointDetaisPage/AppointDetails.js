import React, { useState } from 'react';
import AppointBanner from '../AppointBanner/AppointBanner';
import AvailableAppointment from '../AvailableAppointment/AvailableAppointment';

const AppointDetails = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div>
            <AppointBanner selectedDate={selectedDate} setSelectedDate={setSelectedDate}></AppointBanner>
            <AvailableAppointment  selectedDate={selectedDate} setSelectedDate={setSelectedDate}></AvailableAppointment>
        </div>
    );
};

export default AppointDetails;