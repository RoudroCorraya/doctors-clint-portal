import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Home/Home/Shared/Loading/Loading';
import ConfirmationModal from '../../Home/Home/Shared/ConfirmationModal/ConfirmationModal';
import { toast } from 'react-hot-toast';

const ManageDoctors = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null);
    const closeModal = () =>{
        setDeleteDoctor(null);
    }
   
    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctor-server-portal.vercel.app/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessTocken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });
    const DeleteSucessModal = (doctor) =>{
        console.log('deleted',doctor);
        fetch(`https://doctor-server-portal.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessTocken')}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.deletedCount > 0){
                refetch();
                toast.success(`${doctor.name} Deleted Successfully`)
            }
            
        })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            
            <h3 className='text-3xl mb-5'>Manage Doctors</h3>
            <div className="overflow-x-auto">
                <table className="table sm:table-xs md:table-md lg:table-lg">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="lg:w-24 sm:w-12 md:w-16 rounded-full">
                                            <img src={doctor.image} alt='doctor.jpj' />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.speciality}</td>
                                <td>
                                    <label onClick={()=>setDeleteDoctor(doctor)} htmlFor="confirm-modal" className="btn btn-sm bg-red-500">Delete</label>
                                    
                                </td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deleteDoctor && <ConfirmationModal
                title={`are you sure to Delete ? `}
                message={`After delete, ${deleteDoctor.name} will be unavailable permanently`}
                closeModal={closeModal}
                sucessButtonName ="Delete"
                DeleteSucessModal={DeleteSucessModal}
                deleteDoctorData={deleteDoctor}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;