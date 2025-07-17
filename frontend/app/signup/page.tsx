import { useState } from 'react';
import { useRouter } from 'next/router';
import { AuthForm } from '@/components/AuthForm';
import { api } from '@/lib/api';

const SignupPage = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (data) => {
    try {
      await api.signup(data);
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <AuthForm onSubmit={handleSignup} />
    </div>
  );
};

export default SignupPage;