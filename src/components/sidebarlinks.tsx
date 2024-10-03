"use client"
import React from 'react'
import { links } from '../../constant'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'



const Sidebarlinks = () => {
    const pathname = usePathname();
    
   return (
    <div className='flex gap-2 p-5 flex-col bg-green-600 h-screen align-middle'>
     {links.map((e,id)=>{
       const isActive=pathname==e.route;
        return(
          <div
          key={id}>

   
        
            <Link 
            href={e.route}
            className={cn('h-10 p-2 pl-9 pr-9  text-white font-bold text-center rounded-lg ',{'bg-green-400':isActive})}
            > 
            <Image 
            src={e.icon}
            width={32}
            height={32}
            alt='home'
            ></Image>
            {e.label}
            </Link>
            </div>
        )
     })}

    </div>
  )
}

export default Sidebarlinks

