import React, { useState } from 'react';
import apponmtChair from '../../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

const AppointBanner = ({selectedDate, setSelectedDate}) => {
    
    return (
        <header>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse ">
                <div className='max-w-xs lg:w-1/2 mx-6'>
                <img src={apponmtChair} className="w-full rounded-lg shadow-2xl" alt='foinne.png'/>
                </div>
                    <div>
                       <DayPicker
                       mode='single'
                       selected={selectedDate}
                       onSelect={setSelectedDate}

                       />
                       
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointBanner;