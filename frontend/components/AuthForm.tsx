import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Input, Label } from 'shadcn/ui';
import { loginUser, signupUser } from '../lib/api';

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await loginUser({ email, password });
      } else {
        await signupUser({ username, email, password });
      }
      router.push('/timeline');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {!isLogin && (
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
    </form>
  );
};

export default AuthForm;