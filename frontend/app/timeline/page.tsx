"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "../../styles/globals.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function TimelinePage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUserId, setLoadingUserId] = useState(null); // 🔄 Follow/unfollow loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // ✅ client-side redirect
      return;
    }

    const fetchTimeline = async () => {
      try {
        const postsRes = await axios.get("/posts/timeline", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(postsRes.data);

        const usersRes = await axios.get("/users/recommendations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load timeline or recommendations");
      }
    };

    fetchTimeline();
  }, [router]);

  const handleFollowToggle = async (userId, isFollowing) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to login first.");
      return;
    }

    setLoadingUserId(userId);

    try {
      const endpoint = isFollowing
        ? `/users/${userId}/unfollow`
        : `/users/${userId}/follow`;

      await axios.post(endpoint, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(isFollowing ? "Unfollowed successfully" : "Followed successfully");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isFollowing: !isFollowing } : user
        )
      );
    } catch (err) {
      console.error("Follow/unfollow error:", err);
      toast.error("Failed to update follow status");
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="timeline-page">
      <Navbar />

      <main className="content-area" style={{ display: "flex", gap: "2rem" }}>
        <section className="posts-section" style={{ flex: 3 }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Timeline</h1>

          {posts.length === 0 && <p>No posts available.</p>}

          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <h2>{post.title}</h2>
              <p>by {post.author?.username || "Unknown"}</p>
              <p>{post.description}</p>
            </div>
          ))}
        </section>

        <aside
          className="timeline-sidebar"
          style={{
            flex: 1,
            backgroundColor: "#f9f9f9",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            height: "fit-content",
          }}
        >
          <h3>Who to follow</h3>
          {users.length === 0 && <p>No user recommendations.</p>}
          <ul
            className="user-list"
            style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}
          >
            {users.map((user) => (
              <li
                key={user._id}
                className="user-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <span>{user.username}</span>
                <button
                  className="follow-btn"
                  onClick={() =>
                    handleFollowToggle(user._id, user.isFollowing)
                  }
                  disabled={loadingUserId === user._id}
                  style={{
                    padding: "0.3rem 0.75rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor:
                      loadingUserId === user._id ? "not-allowed" : "pointer",
                    backgroundColor: user.isFollowing ? "#e74c3c" : "#2ecc71",
                    color: "#fff",
                    opacity: loadingUserId === user._id ? 0.6 : 1,
                  }}
                >
                  {loadingUserId === user._id
                    ? "Please wait..."
                    : user.isFollowing
                    ? "Unfollow"
                    : "Follow"}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}
