"use client"
import React from 'react'
import { links } from '../../constant'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const Sidebarlinks = () => {
    const pathname = usePathname();
    
   return (
    <div className='flex gap-2 p-5 flex-col bg-blue-950 h-screen align-middle'>
     {links.map((e,id)=>{
       const isActive=pathname==e.route;
        return(
            <Link 
            key={id}
            href={e.route}
            className={cn('h-10 p-2 pl-9 pr-9  text-white font-bold text-center rounded-lg ',{'bg-blue-400':isActive})}
            > 
            {e.label}
            </Link>
        )
     })}

    </div>
  )
}

export default Sidebarlinks

