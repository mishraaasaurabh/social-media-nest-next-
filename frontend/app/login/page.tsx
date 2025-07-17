import { useState } from 'react';
import { useRouter } from 'next/router';
import { AuthForm } from '@/components/AuthForm';
import { login } from '@/lib/api';

const LoginPage = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      router.push('/timeline');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <AuthForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;