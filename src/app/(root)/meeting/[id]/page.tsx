"use client"
import Meetingroom from '@/components/Meetingroom';
import Meetingsetup from '@/components/Meetingsetup';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { useGetcall } from '../../../../../hooks/useGetcall';
import { useParams } from 'next/navigation';
;

const Meeting = () => {
  const {id} = useParams();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const{call,isCallLoading} = useGetcall(id);

  return (
    <>
    <main className='h-screen w-full'>
    {isCallLoading ? (
        <div>Loading call...</div>  
      ) : (
        <StreamCall call={call}>
          <StreamTheme>
             {!isSetupComplete ? (
          <Meetingsetup setIsSetupComplete={setIsSetupComplete}  />
        ) : (
          <Meetingroom />
        )}
          </StreamTheme>
        </StreamCall>
      )}
    </main>
    
    </>
  )
}

export default Meeting