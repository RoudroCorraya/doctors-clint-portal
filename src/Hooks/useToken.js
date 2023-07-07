import { useEffect, useState } from "react";

const useToken = (email) => {
    const [token, setToken] = useState('');
    useEffect(() => {
       if(email){
        fetch(`https://doctor-server-portal.vercel.app/jwt?email=${email}`)
        .then(res => res.json())
        .then(data => {
            if (data.accessTocken) {
                localStorage.setItem('accessTocken', data?.accessTocken);
                setToken(data.accessTocken);
            }
        })
       }
    }, [email]);
    return [token];
}
export default useToken;