import React from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const AllUsers = () => {
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    });

    const handleMakeAdmin = (_id) =>{
        fetch(`http://localhost:5000/users/admin/${_id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessTocken')}`
            }
        })
        .then(res => res.json())
        .then( data =>{
            console.log(data);
            if(data.modifiedCount > 0){
                toast.success('make admin success');
                refetch();
            }
        })
    }
    return (
        <div>
            <h3 className='text-3xl mb-5'>All Users</h3>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>{i+1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user?.role !== 'admin' && <button onClick={()=>handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Amin</button>}</td>
                                <td><button className='btn btn-xs btn-error'>Dlete</button></td>
                            </tr> )
                        }
                        {/* <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                            <td>Blue</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;