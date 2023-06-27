import React from 'react';

const InfoCard = ({card}) => {
    const {name, descreption, icon, bgClass} = card;
    return (
        <div className={`card px-6 text-white md:card-side sm:card-side bg-base-100 shadow-xl ${bgClass}`}>
            <figure><img src={icon} alt="Movie"/></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{descreption}</p>
                
            </div>
            </div>
    );
};

export default InfoCard;