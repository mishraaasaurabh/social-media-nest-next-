import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Input, Textarea } from 'shadcn/ui';
import { createPost } from '../../lib/api';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createPost({ title, description });
      router.push('/timeline');
    } catch (err) {
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mb-4"
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mb-4"
        />
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
};

export default CreatePostPage;