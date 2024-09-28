import { cn } from '@/lib/utils'
import React from 'react'

interface cardprops{
    classname:string,
    title:string,
    des:string,
    handleclick:()=>void;
}
const Meetingcards = ({classname,title,des,handleclick}:cardprops) => {
  return (
    <div className={cn('h-[200px]  w-full rounded-lg p-5 flex flex-col gap-10 bg-orange-400 md:w-[200px]',classname)}
    onClick={handleclick}
    >
        <h1 className='font-bold text-2xl'>{title}</h1>
        <p className='text-[18px]'>{des}</p>

    </div>
  )
}

export default Meetingcards