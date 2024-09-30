"use client"
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const call = useCall();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
 

  useEffect(() => {
    if (!isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  
 

  

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <div className='h-[300px] w-[300px]'>

   <VideoPreview />
        <div className='flex flex-col items-center justify-center gap-2 p-2 '>
           <label className='flex'>
                  <input type="checkbox" checked={isMicCamToggled} onChange={(e)=>setIsMicCamToggled(e.target.checked)} />
                  Join with Video and Mic 
           </label>
           <DeviceSettings/>
        <button className='rounded  px-4 py-2.5  bg-green-500 text-white' 
        onClick={()=>{
          call.join()
          setIsSetupComplete(true);
          }}>
          Join Meeting

        </button>
        </div>
      </div>
      
    </div>
  )
}

export default MeetingSetup;
