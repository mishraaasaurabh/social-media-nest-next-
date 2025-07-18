'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white border-b shadow-sm p-4 flex justify-between items-center">
      <div className="space-x-4 font-medium">
        <Link href="/timeline" className="hover:underline">Timeline</Link>
        <Link href="/create-post" className="hover:underline">New Post</Link>
      </div>
      <Button variant="outline" onClick={logout}>Logout</Button>
    </nav>
  );
}
