import { cn } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'

interface cardprops{
    classname:string,
    title:string,
    des:string,
    handleclick:()=>void;
    icon:string
}
const Meetingcards = ({classname,title,des,handleclick,icon}:cardprops) => {
  return (
    <div className={cn('h-[200px]  w-full rounded-lg p-5 bg-white text-[#1C2541] flex flex-col gap-10  md:w-[250px]',classname)}
    onClick={handleclick}
    >  <div className='flex align-middle gap-2'>
     <Image
     src={icon}
     height={20}
     width={20}
     alt='logo'
     >
     </Image>
        <h1 className='font-bold text-xl'>{title}</h1>
    </div>
        <p className='text-[18px]'>{des}</p>

    </div>
  )
}

export default Meetingcards