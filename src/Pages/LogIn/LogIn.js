import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../Hooks/useToken';
import { toast } from 'react-hot-toast';

const LogIn = () => {
    const { signIn } = useContext(AuthContext);
    const [logInerror, setLogInerror] = useState('');
    const [loginUserEmail, setloginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.form?.pathname || '/';
    if (token) {
        toast.success('LogIn Successfully');
        navigate(from, { replace: true });
    }
    const handleLogin = (data) => {
        console.log(data);
        setLogInerror('');
        signIn(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                setloginUserEmail(data.email)

            })
            .catch(error => {
                console.error(error);
                setLogInerror(error.message);
            })

    }
    const { register, formState: { errors }, handleSubmit } = useForm();
    return (
        <div className='flex justify-center items-center '>
            <div className='w-96 p-7'>
                <h3 className='text-2xl text-center font-bold'>LogIn</h3>
                <form onSubmit={handleSubmit((handleLogin))}>
                    {/* <Header /> */}
                    <div className='from-control w-full max-w-xs'>
                        <label className='label'>Email</label>
                        <input className='w-full py-2 border-solid bg-slate-300' type='email'  {...register("email", { required: 'Email Is required' })} placeholder="" />
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className='from-control w-full max-w-xs'>
                        <label className='label'>Password</label>
                        <input type='password' className='w-full py-2 border-solid bg-slate-300' {...register("password", {
                            required: 'Password Is required',
                            minLength: { value: 6, message: 'password must be 6 character or Longer' }
                        })} placeholder="" />
                        {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                        <label className='label'>Forget Password ?</label>

                    </div>





                    <input className='btn btn-accent w-full' value="LogIn" type="submit" />
                    <div>
                        {logInerror &&

                            <p className='text-red-600'>{logInerror}</p>

                        }
                    </div>
                </form>
                <p>New to Doctors portal <Link className='text-secondary' to='/signup'>Create New Account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default LogIn;