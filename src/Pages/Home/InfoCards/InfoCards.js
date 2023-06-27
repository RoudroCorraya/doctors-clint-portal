import React from 'react';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {
    const cardData = [
        {
            id: 1,
            name: 'opening Hours',
            descreption: 'open 9.00 am to 5.00 pm',
            icon: clock,
            bgClass: 'bg-gradient-to-r from-primary to-secondary',
        },
        {
            id: 12,
            name: 'Our location',
            descreption: 'Brooklyn, NY 10036, United States',
            icon: marker,
            bgClass: 'bg-gradient-to-r from-accent to-accent',
        },
        {
            id: 3,
            name: 'Contact Us',
            descreption: 'open 9.00 am to 5.00 pm',
            icon: phone,
            bgClass: 'bg-gradient-to-r from-primary to-secondary',
        },
    ]
    return (
        <div className='grid  mt-8 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                cardData.map(card => <InfoCard key={card.id} card={card}></InfoCard>)
            }
        </div>
    );
};

export default InfoCards;