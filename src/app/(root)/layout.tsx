import { ReactNode } from 'react';
import StreamVideoProvider from '../../../Provider/StreamClientProvider';



const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;