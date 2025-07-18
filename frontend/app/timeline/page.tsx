"use client"; // make sure this is at the top if you're using App Router

import { useEffect, useState } from "react";
import axios from "@/lib/axios"; // your axios instance
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "../../styles/globals.css"

export default function TimelinePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      axios
        .get("/posts/timeline", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setPosts(res.data))
        .catch((err) => {
          console.error("Timeline fetch error:", err);
          alert("Failed to load timeline");
        });
    }
  }, []);

  return (
    <div>
        <Navbar />
      <h1 className="text-2xl font-bold">Timeline</h1>
      <Link href="/create-post">Create Post</Link> 
      {posts.map((post) => (
        <div key={post._id} className="bg-gray-300 text-black p-4 rounded-xl" >
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
      <div className="bg-red-500 text-white p-6 rounded-xl border-4 border-black">
  Tailwind Test Block
</div>

    </div>
  );
}
