
import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

type callLayoutType = 'grid'|'speaker-left'

const Meetingroom = () => {
  const [showParticipants, setshowParticipants] = useState(false)
  const [Layout, setLayout] = useState('speaker-left')
   const CallLayout =()=>{
    switch(Layout){
        case 'grid':
          return <PaginatedGridLayout/>


        case 'speaker-right':
        return<SpeakerLayout participantsBarPosition="left"/>
        
        default:
        return<SpeakerLayout participantsBarPosition="right"/>
        
    }
   }


  return (
   <section className='realtive h-screen w-full overflow-hidden pt-4 text-white'> 
      <div className='realtive flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
          <CallLayout/>
        </div>
        <div className={cn('h-[cal(100vh-86px)] hidden ml-2', {'show-block':showParticipants})}>
            <CallParticipantsList onClose={()=>{
              setshowParticipants(false)}}/>
        </div>
        <div className='fixed bottom-0 w-full items-center justify-center gap-5'>
            <CallControls/>
        </div>
      </div>
   </section>
  )
}

export default Meetingroom