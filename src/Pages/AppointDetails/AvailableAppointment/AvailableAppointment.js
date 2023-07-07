import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointOption from '../AppointOption/AppointOption';
import BookModal from '../BookModal/BookModal';
import { useQueries, useQuery } from 'react-query';
import Loading from '../../Home/Home/Shared/Loading/Loading';

const AvailableAppointment = ({selectedDate}) => {
    // const [appOptions, setAppOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP');

//exploring react query start
const {data : appOptions = [], refetch, isLoading} = useQuery({
    queryKey: ['appOptions', date],
    queryFn: async() => {
        const res = await fetch(`https://doctor-server-portal.vercel.app/appointoptions?date=${date}`);
        const data = await res.json();
        return data;
        
    }
});
if(isLoading){
    return <Loading></Loading>
}
//exploring react query start
    
    // useEffect(()=>{
    //     fetch('https://doctor-server-portal.vercel.app/appointoptions')
    //     .then(res => res.json())
    //     .then(data => setAppOptions(data))
    // },[])
    return (
        <section className='my-16'>
            <p className='text-center text-secondary font-bold'>Available Services on {format(selectedDate, 'PP')}</p>
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
            {
                appOptions.map(option => <AppointOption key={option._id} option={option} setTreatment={setTreatment}></AppointOption>)
            }
        </div>
       
            {treatment &&
                <BookModal
                 treatment={treatment}
                  selectedDate={selectedDate} 
                  setTreatment={setTreatment}
                  refetch={refetch}
                 ></BookModal>
            }
       
        </section>
    );
};

export default AvailableAppointment;