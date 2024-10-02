import { ReactNode } from 'react';
import StreamVideoProvider from '../../../Provider/StreamClientProvider';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
      <ToastContainer/>
    </main>
  );
};

export default RootLayout;