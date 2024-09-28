"use client"

import Meetingcards from '@/components/Meetingcards'
import MeetingModel from '@/components/MeetingModel';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Homepage = () => {
  const router = useRouter();
  const[meeting,setmeting]=useState<'isSchedulemeeting'|'isJoiningmeeting'|'isInstantmeeting'|undefined>()
  const now = new Date();
  const time=now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  const date = (new Intl.DateTimeFormat('en-IN',{
    dateStyle:'full'})).format(now);
  const [values, setvalue] = useState({
    dateTime:new Date(),
    description:'',
    link:''
  });
  const [callDetail, setCallDetail] = useState<Call>();
 
  const client = useStreamVideoClient();
  const createMeeting = async () => {
  
      console.log("Creating meeting...");
    
      try {
        if (!client) {
          console.error("Stream video client is not initialized");
          return;
        }
    
        if (!values.dateTime) {
          console.error("DateTime is required for meeting creation");
          return;
        }
    
        const id = crypto.randomUUID();  // Replace with generateUUID() if necessary
        const call = client.call('default', id);
        if (!call) {
          throw new Error('Failed to create meeting');
        }
    
        const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
        const description = values.description || 'Instant Meeting';
    
        await call.getOrCreate({
          data: {
            starts_at: startsAt,
            custom: {
              description,
            },
          },
        }).catch((error) => {
          console.error("Error during getOrCreate:", error);
          return;
        });
    
        setCallDetail(call);
    
        
        if (call?.id) {
          router.push(`/meeting/${call.id}`);
        } else {
          console.error("Failed to retrieve call ID");
        }
      } catch (error) {
        console.error("Error creating meeting:", error);
      }
    };
    
  

 

 


  return (
    <div className='text-white text-3xl size-full  flex flex-col gap-10  p-2'>
        <div className='bg-banner bg-cover p-5 h-[200px] w-full rounded-lg'>
            <h1 className='text-4xl font-bold flex md:text-5xl'>{time}</h1>
           <p className='text-2xl '>{date}</p>
        </div>
    <div className='flex flex-wrap gap-5 justify-center md:justify-start'>
      <Meetingcards
         classname='bg-orange-500'
         title='New Meeting'
         des='Start a Instant Meeting'
         handleclick={()=>setmeting('isInstantmeeting')
         }
      />
      <Meetingcards
         classname='bg-blue-500'
         title='Join Meeting'
         des='Check out your Recording'
         handleclick={()=>setmeting('isJoiningmeeting')
         }
      />
      <Meetingcards
        classname='bg-purple-500'
        title='Schedule Meeting'
        des='Plan your Meeting'
        handleclick={()=>setmeting("isSchedulemeeting")}
        />
      <Meetingcards
        classname='bg-yellow-500'
        title='View Recording'
        des='Check out your recording'
        handleclick={()=>router.push('/recording')}
        />

    </div>
    <MeetingModel
    isOpen={meeting ==='isInstantmeeting'}
    onclose={()=>setmeting(undefined)}
    title='Start A Instant Meeting'
    buttontext='Start Metting'
    classname="text-center"
    handleclick={()=>createMeeting()}
    
    
    />
    </div>
  )
}


export default Homepage