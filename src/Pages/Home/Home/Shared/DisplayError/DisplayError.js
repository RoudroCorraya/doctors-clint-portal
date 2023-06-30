import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../../../Contexts/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogOut = () =>{
        logOut()
        .then(()=>{
            navigate('/login');
        })
        .catch(err=>console.error(err))
    }
    return (
        <div>
            <p className='text-red-500'>SomeThin Were Wrong</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h4 className='text-3xl'>please <button onClick={handleLogOut} className='btn' to='/login'>SignOut</button> and LogIn Again</h4>
        </div>
    );
};

export default DisplayError;