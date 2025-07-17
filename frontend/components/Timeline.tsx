import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../lib/api';
import PostCard from './PostCard';

const Timeline = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            const fetchedPosts = await fetchPosts();
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
            {posts.length === 0 ? (
                <p>No posts to display.</p>
            ) : (
                posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))
            )}
        </div>
    );
};

export default Timeline;