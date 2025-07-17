import { useEffect, useState } from 'react';
import { fetchTimelinePosts } from '../../lib/api';
import Timeline from '../../components/Timeline';

const TimelinePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchTimelinePosts();
      setPosts(fetchedPosts);
      setLoading(false);
    };

    loadPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Timeline</h1>
      <Timeline posts={posts} />
    </div>
  );
};

export default TimelinePage;