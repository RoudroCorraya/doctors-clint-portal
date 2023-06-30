import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheakOut from './CheakOut';
import Loading from '../../../Home/Home/Shared/Loading/Loading';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log('kita', stripePromise);
const Payment = () => {
    const navigation = useNavigation();
    const paymentData = useLoaderData();
    const { treatment, appointmentDate, slot, price } = paymentData;
    if(navigation.state === 'loading'){
        return <Loading></Loading>
    }
    console.log('payment data', paymentData);
    return (
        <div>
            <h3 className='font-semibold text-3xl'>Payment For {treatment}</h3>
            <p className='text-xl'>Please Pay <strong>$ {price}</strong> for your appointment on {appointmentDate} at {slot}</p>
            <div className='w-96 my-6'>
                <Elements stripe={stripePromise}>
                    <CheakOut paymentInfoData={paymentData} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;