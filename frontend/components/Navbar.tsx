'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { redirect, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

export default function Navbar() {
  const pathname  = usePathname()
  // const {pathname} = router;
  // alert(`current router is ${pathname}`)
  const logout = () => {
    localStorage.removeItem('token');
    redirect('/')
  };

  return (
    <nav className="bg-white border-b shadow-sm p-4 flex justify-between items-center">
      <div className="space-x-4 font-medium">
      {
        pathname==="/timeline"? "" :
        <Link href="/timeline" className='cursor-pointer p-2 no-underline bg-gray-900 text-white rounded-full '>Timeline</Link>

      }
        <Link href="/create-post" className='cursor-pointer p-2 no-underline bg-gray-900 text-white rounded-full '><span className='bg-gray-900'>Create </span></Link>
      </div>
        <Button variant="outline" className='cursor-pointer bg-gray-900 text-white rounded-full ' onClick={logout}>Logout</Button>
    </nav>
  );
}
