import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserProfile } from '../../lib/api';
import { PostCard } from '../../components/PostCard';

const ProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        const profileData = await getUserProfile(userId);
        setUser(profileData.user);
        setPosts(profileData.posts);
      };
      fetchProfile();
    }
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <h2>Posts</h2>
      <div>
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;