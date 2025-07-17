import { useState } from 'react';

interface FollowButtonProps {
  userId: string;
  isFollowing: boolean;
  onFollowChange: (following: boolean) => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, isFollowing, onFollowChange }) => {
  const [loading, setLoading] = useState(false);

  const handleFollowToggle = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/follow/${userId}`, {
        method: isFollowing ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        onFollowChange(!isFollowing);
      } else {
        // Handle error (e.g., show a notification)
      }
    } catch (error) {
      // Handle error (e.g., show a notification)
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleFollowToggle} disabled={loading}>
      {loading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;