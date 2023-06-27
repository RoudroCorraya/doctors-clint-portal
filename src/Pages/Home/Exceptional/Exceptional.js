import React from 'react';
import exceptionalimg from '../../../assets/images/treatment.png'

const Exceptional = () => {
    return (
        <div className='grid gap-18 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-28'>
            <div className='w-2/3 mx-auto'>
                <img src={exceptionalimg} alt='treatment.png'></img>
            </div>
            <div className='my-auto'>
                <h2 className='text-5xl font-bold mb-7'>Exceptional Dental Care, on Your Terms</h2>
                <p className='mb-7'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <button className='btn btn-primary bg-gradient-to-r from-primary to-secondary'>GET STARTED</button>
            </div>
        </div>
    );
};

export default Exceptional;