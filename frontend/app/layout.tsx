// import '../styles/globals.css';
import { Inter } from 'next/font/google';
import "../styles/globals.css"
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Social Media App',
  description: 'Internship Assessment Project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Toaster position='top-right'  />
        {children}
      </body>
    </html>
  );
}
