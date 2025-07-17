import React from 'react';

interface PostCardProps {
    title: string;
    description: string;
    author: string;
    createdAt: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, description, author, createdAt }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-600">{description}</p>
            <div className="mt-2 text-sm text-gray-500">
                <p>Posted by: {author}</p>
                <p>{new Date(createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default PostCard;