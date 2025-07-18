'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { redirect, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSignup = async () => {
  try {
    await axios.post("/auth/signup", {  username, password });
    router.push("/login");
  } catch (error) {
    console.error("Signup error:", error);
    toast.error("Signup failed");
  }
};


  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-sm w-[240px] space-y-6 border p-10 rounded-xl shadow flex flex-col ">
        <h1 className="text-2xl font-bold text-center ">Sign Up</h1>
        <Input placeholder="Username" className='w-full'  value={username} onChange={e => setUsername(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button className="w-[265.6px] cursor-pointer " onClick={handleSignup}>Sign Up</Button>
      <p className=''>Already a Member? <span className='cursor-pointer underline uppercase ' onClick={()=>{redirect('/login')}}>Login</span>  </p>
      </div>
    </div>
  );
}
