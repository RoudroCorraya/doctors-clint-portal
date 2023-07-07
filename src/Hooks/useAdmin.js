import { useEffect, useState } from "react"

const useAdmin = (email) =>{
    const [isAdmin, setAdmin] = useState(false);
    const [isAdminLoading, setisAdminLoading] = useState(true);


    useEffect(()=>{
        if(email){
            fetch(`https://doctor-server-portal.vercel.app/users/admin/${email}`)
            .then(res=> res.json())
            .then(data =>{
                console.log(data);
                setAdmin(data.isAdmin);
                setisAdminLoading(false);
            })
        }
    },[email]);
    
    return [isAdmin, isAdminLoading];
}
export default useAdmin;