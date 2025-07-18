import Link from 'next/link';
import React from 'react';
import { Toaster } from 'react-hot-toast';
// import { AuthForm } from '../components/AuthForm';

const HomePage = () => {
  return (

    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster/>
      <h1 className="text-4xl font-bold mb-4 border-2 px-2 ">Welcome to the Social Media App</h1>
      <p className="mb-8">Connect with friends and share your thoughts!</p>
      <div className='flex gap-3 '>
        
      <Link href={"/login"}>
      <button className='follow-btn h-7 w-15'>Login</button>
      </Link>
      <Link href={"/signup"}>
      <button className='follow-btn h-7 w-15'>Signup</button>
      </Link>
      {/* <button className='follow-btn h-7 w-15'>Signup</button> */}
      </div>
      {/* <AuthForm /> */}
    </div>
  );
};

export default HomePage;