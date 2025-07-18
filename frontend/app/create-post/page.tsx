'use client';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import Navbar from '@/components/Navbar';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const router = useRouter()
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  useEffect(()=>{

    const token = localStorage?.getItem("token");
    if(!token){
      redirect('/login')
    }
  },[])
  
  const handleCreate = async () => {
    try {
      if(title=='' || description==''){
        toast.error("Enter Title and Description")
        return ;
      }
      const token = localStorage?.getItem("token");
      await axios.post("/posts", { title, description },{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      toast.success("Post Added!")
      setTitle('')
      setDescription('')
      router.push('/timeline')
    } catch(err) {
      console.error("create-post error",err)
      // alert("Post failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 space-y-6 px-4">
        <h2 className="text-xl font-semibold">Create New Post</h2>
        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <Textarea placeholder="Description" rows={5} value={description} onChange={e => setDescription(e.target.value)} />
        <Button className=" rounded-full hover:bg-blue-950 hover:text-white hover:font-bold cursor-pointer" onClick={handleCreate}>Post</Button>
      </div>
    </>
  );
}
