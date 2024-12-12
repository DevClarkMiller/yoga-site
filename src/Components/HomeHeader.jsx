import React from 'react'
import { Link } from 'react-router-dom';

const HomeHeader = () => {
    return (
        <header className='shadow-sm'>
            <Link to='/' className='no-underline text-black text-4xl font-bold font-Poetson nice-trans hover:text-5xl'>Home</Link>
        </header>
    );
}

export default HomeHeader