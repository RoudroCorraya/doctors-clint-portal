import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import useToken from '../../Hooks/useToken';

const SignUp = () => {
    //changing title start
    useEffect(()=>{
        document.title = 'Doctors-SignUp';
    }, [])
    //changing title end
    //createUser with Firebase Email and Password start
    const{createUser, updateUser} = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();
    const[createdUserEmail, setcreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    if(token){
        navigate('/');
    }

    //createUser with Firebase Email and Password end
    const {register, handleSubmit, formState: {errors}} = useForm();
    const handleSignUp = (data) =>{
        console.log(data);
        setSignUpError('');
        createUser(data.email, data.password)
        .then(res=>{
            const user = res.user;
            toast.success('user Created  SuccessFully')
            //updateUser firebase or setuser name navbar start
            const userInfo = {
                displayName: data.name
            }
            updateUser(userInfo)
            .then(()=>{
                
                saveUser(data.name, data.email);
            })
            .catch(err => console.log(err));
            //updateUser firebase or setuser name navbar end
            console.log(user);
        })
        .catch(error => {
            console.log(error);
            setSignUpError(error.message);
        })
    }
    const saveUser = (name, email) =>{
        const user = {name, email};
        fetch('https://doctor-server-portal.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log('save user',data);
            setcreatedUserEmail(email);
            // getUserToken(email);
            
        })
    }

    // const getUserToken = (email) =>{
    //     fetch(`https://doctor-server-portal.vercel.app/jwt?email=${email}`)
    //     .then(res=> res.json())
    //     .then(data =>{
    //         if(data.accessTocken){
    //             localStorage.setItem('accessTocken', data.accessTocken);
    //             navigate('/');
    //         }
    //     })
    // }

    return (
        <div className='flex justify-center items-center '>
            <div className='w-96 p-7'>
                <h3 className='text-2xl text-center font-bold'>SignUp</h3>
                <form onSubmit={handleSubmit(handleSignUp)} className=''>
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
                            minLength: {value: 6, message: 'Password must be 6 character or longer'},
                            pattern: {value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must be Strong with uppercase number and special character'}
                            })}  placeholder="" />
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                        
                        
                    </div>
                    
                    
                   
                   
                   
                    <input className='btn btn-accent mt-4 w-full' value="SignUp" type="submit" />
                </form>
                <p>New to Doctors portal <Link className='text-secondary' to='/login'> Have Account? LogIn</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;