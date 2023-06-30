import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import Loading from '../../Home/Home/Shared/Loading/Loading';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_IMAGEBB_KEY;
    const navigate = useNavigate();
    const {data: spacialities, isLoading} = useQuery({
        queryKey: ['speciality'],
        queryFn: async () =>{
          const res = await  fetch('http://localhost:5000/appointmentspeciallyty');
          const data = await res.json();
          return data;
        }
    })
    const handleAddDoctor = (data) => {
        console.log(data.image[0]);
        const formData = new FormData();

        const image = data.image[0];
        formData.append('image', image);
        
        const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url);
                const doctor = {
                    name: data.name,
                    email: data.email,
                    speciality: data.speciality,
                    image: imgData.data.url

                }
                //save doctor info to data base or hiting the api to store adddoctor info start
                fetch('http://localhost:5000/doctors', {
                    method : 'POST',
                    headers: {
                        'content-type' : 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessTocken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res=> res.json())
                .then( result =>{
                    console.log(result);
                    toast.success(`Dr.${data.name} Added Successfully`);
                    navigate('/dashboard/managedoctors');
                })
                //save doctor info to data base or hiting the api to store adddoctor info end
            }
        })
    }
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='w-96 p-7'>
            <h3 className='text-3xl mb-5'>Add Doctor</h3>
            <form onSubmit={handleSubmit(handleAddDoctor)} className=''>
                {/* <Header /> */}
                <div className='from-control w-full max-w-xs'>
                    <label className='label'>Name</label>
                    <input className='w-full py-2 border-solid bg-slate-300' type='text' {...register("name", {
                        required: 'Name Is  Required',

                    })} placeholder="" />
                    {errors.name && <p className='text-red-600'>{errors.name.message}</p>}

                </div>
                <div className='from-control w-full max-w-xs'>
                    <label className='label'>Email</label>
                    <input className='w-full py-2 border-solid bg-slate-300' type='email' {...register("email",
                        {
                            required: 'Email Is  Required',


                        })} placeholder="" />
                    {errors.email && <p className='text-red-600'>{errors.email.message}</p>}

                </div>
                <div className='from-control w-full max-w-xs'>
                    <label className='label'>Password</label>
                    <input type='password' className='w-full py-2 border-solid bg-slate-300' {...register("password", {
                        required: "Password is Required",
                        minLength: { value: 6, message: 'Password must be 6 character or longer' },
                        pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must be Strong with uppercase number and special character' }
                    })} placeholder="" />
                    {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                    {/* {signUpError && <p className='text-red-600'>{signUpError}</p>} */}


                </div>
                <div className='from-control w-full max-w-xs'>
                    <label className='label'>Speciality</label>

                    <select {...register('speciality')}
                     className="select select-bordered w-full max-w-xs border-solid bg-slate-300">
                       
                        {
                            spacialities.map(speciality => <option
                                 key={speciality._id} 
                                 value={speciality.name}
                                 >{speciality.name}</option> )
                        }
                        {/* <option>Han Solo</option> */}
                        
                    </select>


                </div>
                <div className='from-control w-full max-w-xs'>
                    <label className='label'>Photo</label>
                    <input className='w-full py-2 border-solid bg-slate-300' type='file' {...register("image", {
                        required: 'Photo Is  Required',

                    })} placeholder="" />
                    {errors.image && <p className='text-red-600'>{errors.image.message}</p>}

                </div>




                <input className='btn btn-accent mt-4 w-full' value="Add Doctor" type="submit" />
            </form>
        </div>
    );
};

export default AddDoctor;