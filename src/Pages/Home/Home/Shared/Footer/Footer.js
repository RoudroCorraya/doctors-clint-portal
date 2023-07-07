import React from 'react';
import { Link } from 'react-router-dom';
import footerbg from '../../../../../assets/images/footer.png';

const Footer = () => {
    return (
        <footer style={{
            background: `url(${footerbg})`,
            backgroundSize: 'cover',
            
            
        }} className="p-10 -mt-6">
           <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center'>
           
           <div className='my-3'>
            <h5 className='footer-title '>Services</h5>
            <Link to='/' className="link link-hover block">Design</Link>
            <Link to='/' className="link link-hover block">Branding</Link>
            <Link to='/' className="link link-hover block">Marketing</Link>
            <Link to='/' className="link link-hover block">Advertisement</Link>
           </div>
           <div className='my-3'>
            <h5 className='footer-title '>COMPANY</h5>
            <Link to='/' className="link link-hover block">About us</Link>
            <Link to='/' className="link link-hover block">Contact</Link>
            <Link to='/' className="link link-hover block">Jobs</Link>
            <Link to='/' className="link link-hover block">Press kit</Link>
           </div>
           <div className='my-3'>
            <h5 className='footer-title '>LEGAL</h5>
            <Link to='/' className="link link-hover block">Terms of use</Link>
            <Link to='/' className="link link-hover block">Privacy policy</Link>
            <Link to='/' className="link link-hover block">Cookie policy</Link>
           </div>
           </div>

            <div className='text-center mt-16'>
                <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
            </div>
            </footer>
    );
};

export default Footer;