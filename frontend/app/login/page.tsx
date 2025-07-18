'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post("/auth/login", { username, password });
      console.log("Login success:", res.data);
      localStorage.setItem("token", res.data.access_token);

      window.location.href = "/timeline";
    } catch (error) {
      console.error("Login error", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-sm w-[240px] space-y-6 border p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button className="w-full" onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
}
