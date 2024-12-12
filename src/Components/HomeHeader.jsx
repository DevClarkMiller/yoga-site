import React from 'react'
import { Link } from 'react-router-dom';

const HomeHeader = () => {
    return (
        <header className='shadow-sm'>
            <Link to='/' className='no-underline text-black text-4xl font-bold'>Home</Link>
        </header>
    );
}

export default HomeHeader