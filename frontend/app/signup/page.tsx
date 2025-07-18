'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSignup = async () => {
  try {
    await axios.post("/auth/signup", {  username, password });
    window.location.href = "/login";
  } catch (error) {
    console.error("Signup error:", error);
    alert("Signup failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-80 space-y-6 border p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <Input placeholder="Username" className='w-full mx-20 h-20' value={username} onChange={e => setUsername(e.target.value)} />
        {/* <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /> */}
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button className="w-full" onClick={handleSignup}>Sign Up</Button>
      </div>
    </div>
  );
}
