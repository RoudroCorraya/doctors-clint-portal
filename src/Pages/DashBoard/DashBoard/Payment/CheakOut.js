import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';



const CheakOut = ({ paymentInfoData }) => {
    const [carderror, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transectionId, setTransectionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [process, setprocess] = useState(false);

    const { price, patient, email, _id } = paymentInfoData;
    const stripe = useStripe();
    const elements = useElements();
    //stripe payment system secret feaching start
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('http://localhost:5000/create-payment-intent', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessTocken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);
    //stripe payment system secret feaching end
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }
        setSuccess('');
        setprocess(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        console.log('payment', paymentIntent);
        if (paymentIntent.status === 'succeeded') {

            const payment = {
                price,
                transectionId: paymentIntent.id,
                email,
                bookingId: _id,
                


            }
            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessTocken')}`,
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('banan vul', data);
                    if (data.insertedId) {
                        setSuccess('congrats! Your payment completed');
                        setTransectionId(paymentIntent.id);
                    }
                })
        }
        setprocess(false);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary mt-4' type="submit" disabled={!stripe || !clientSecret || process}>
                    Pay
                </button>
            </form>
            <p className='text-red-500'>{carderror}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p className='text-green-500'>Your transectionId: <span className='font-bold'>{transectionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheakOut;