'use client';
import { useState } from 'react';
import axios from '@/lib/axios';

interface FollowButtonProps {
  targetUserId: string;
  isFollowingInitially: boolean;
}

export default function FollowButton({ targetUserId, isFollowingInitially }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitially);

  const handleFollowToggle = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = isFollowing ? `/users/unfollow/${targetUserId}` : `/users/follow/${targetUserId}`;
      await axios.post(url, {}, config);
      setIsFollowing(!isFollowing);
    } catch (err) {
      alert("Failed to update follow status");
    }
  };

  return (
    <button
      onClick={handleFollowToggle}
      className={`px-4 py-1 rounded-full text-white text-sm ${isFollowing ? 'bg-gray-500' : 'bg-blue-600'}`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}
