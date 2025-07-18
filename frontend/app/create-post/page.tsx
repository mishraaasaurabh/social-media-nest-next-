'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import Navbar from '@/components/Navbar';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const token = localStorage.getItem("token");

  const handleCreate = async () => {
    try {
      await axios.post("/posts", { title, description },{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      alert("Post created")
      window.location.href = "/timeline";
    } catch(err) {
      console.error("create-post error",err)
      alert("Post failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 space-y-6 px-4">
        <h2 className="text-xl font-semibold">Create New Post</h2>
        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <Textarea placeholder="Description" rows={5} value={description} onChange={e => setDescription(e.target.value)} />
        <Button className="w-full" onClick={handleCreate}>Post</Button>
      </div>
    </>
  );
}
