'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { redirect, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        toast.error('Enter valid credentials')
        return
      }
      const res = await axios.post("/auth/login", { username, password });
      console.log("Login success:", res.data);
      localStorage.setItem("token", res.data.access_token);

      router.push("/timeline");
      toast.success(`Welcome ${username}`)
    } catch (error) {
      console.error("Login error", error.response?.data || error.message);
      // alert(error.response?.data?.message || "Login failed");
      toast.error("Login Failed")
      setUsername("")
      setPassword("")
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-sm w-[240px] space-y-6 border p-10 rounded-xl shadow flex flex-col ">
        <h1 className="text-2xl font-bold text-center ">Login</h1>
        <Input placeholder="Username" className='w-full' value={username} onChange={e => setUsername(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button className="w-[265.6px] cursor-pointer " onClick={handleLogin}>Login</Button>
        <p className=' text-center text-nowrap'>Don't have an account? <span className='cursor-pointer underline uppercase ' onClick={() => { redirect('/signup') }}>Sign Up</span>  </p>

      </div>
    </div>
  );
}
