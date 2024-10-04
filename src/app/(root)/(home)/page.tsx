"use client"

import Meetingcards from '@/components/Meetingcards'
import MeetingModel from '@/components/MeetingModel';
import { Textarea } from '@/components/ui/textarea';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, {  useState } from 'react'
import RectDatepicker from 'react-datepicker'
import { toast } from 'react-toastify';

const Homepage = () => {
  const router = useRouter();
  const [Datenow, setDatenow] = useState('')
  const [Timenow, setTimenow] = useState('')
  const[meeting,setmeting]=useState<'isSchedulemeeting'|'isJoiningmeeting'|'isInstantmeeting'|undefined>()
  
  setInterval(() => {
    const now = new Date();
    const time=now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
    const date = (new Intl.DateTimeFormat('en-IN',{
      dateStyle:'full'})).format(now);
      
      setTimenow(time)
      setDatenow(date)
    },100)

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
    const meetingLink = `http://localhost:3000//meeting/${callDetail?.id}`;
    
  

 

 


  return (
    <div className='text-white text-3xl size-full  flex flex-col gap-10  p-2'>
        <div className='bg-banner bg-cover p-5 h-[200px] w-full rounded-lg flex flex-col gap-5'>
            <h1 className='text-4xl font-bold flex md:text-5xl'>{Timenow}</h1>
           <p className='text-2xl '>{Datenow}</p>
        </div>
    <div className='flex flex-wrap gap-5 justify-center md:justify-start'>
      <Meetingcards
          icon="/icon/plus-solid.svg"
         classname=' bordeer-2 shadow-grey  shadow-md '
         title='New Meeting'
         des='Start a Instant Meeting'
         handleclick={()=>setmeting('isInstantmeeting')
         }
      />
      <Meetingcards
      icon="/icon/video-solid.svg"
         classname='shadow-grey  shadow-md'
         title='Join Meeting'
         des='Check out your Recording'
         handleclick={()=>setmeting('isJoiningmeeting')
         }
      />
      <Meetingcards
       icon="/icon/calendar-days-solid (1).svg"
        classname='shadow-grey  shadow-md'
        title='Schedule Meeting'
        des='Plan your Meeting'
        handleclick={()=>{
          setmeting("isSchedulemeeting")
          toast.success("Meeting Schedule",{
            position:"top-center"
          })
        }}
        />
      <Meetingcards
       icon="/icon/floppy-disk-regular.svg"
        classname='shadow-grey  shadow-md'
        title='View Recording'
        des='Check out your recording'
        handleclick={()=>router.push('/recording')}
        />

    </div>
    {!callDetail ? (
        <MeetingModel
          isOpen={meeting === 'isSchedulemeeting'}
          onclose={() => setmeting(undefined)}
          title="Create Meeting"
          
          handleclick={createMeeting} classname={''} buttontext={'Schedule Meeting'}        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-[#6897ff] text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setvalue({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-white ">
              Select Date and Time
            </label>
            <RectDatepicker
              selected={values.dateTime}
              onChange={(date) => setvalue({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-[#6897ff]  p-2 focus:outline-none"
            />
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
          isOpen={meeting === 'isSchedulemeeting'}
          onclose={() => setmeting(undefined)}
          buttontext="Copy Meeting Link"
          title="Meeting Created"
          classname="text-center"
          handleclick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied",{
              position:"top-center"
            })
          }}
         
         
        />
      )}

    <MeetingModel
    isOpen={meeting ==='isInstantmeeting'}
    onclose={()=>setmeting(undefined)}
    title='Start A Instant Meeting'
    buttontext='Start Metting'
    classname="text-center"
    handleclick={()=>createMeeting()}
    
    
    />
    <MeetingModel
        isOpen={meeting === 'isJoiningmeeting'}
        onclose={() => setmeting(undefined)}
        title="Type the link here"
        classname="text-center"
        buttontext="Join Meeting"
        handleclick={() => router.push(values.link)}
      >
      <input
          placeholder="Meeting link"
          onChange={(e) => setvalue({ ...values, link: e.target.value })}
          className="border-none bg-blue-200 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md p-2 placeholder-white text-black"
        />
      </MeetingModel>
    </div>
  )
}


export default Homepage