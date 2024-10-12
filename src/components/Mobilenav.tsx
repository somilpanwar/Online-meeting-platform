
"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { links } from '../../constant'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import { Squash as HamburgerSquash } from 'hamburger-react';
import { usePathname } from 'next/navigation'


const Mobilenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return (
    <section className='flex bg-[#3A506B] justify-between  p-5 items-center'>
          <Image
          src={'/icon/zoomlogo.png'}
          alt='logo'
          width={40}
          height={40}
          />
          <div>
          <Sheet onOpenChange={setIsOpen}>
  <SheetTrigger >
      <HamburgerSquash toggled={isOpen} toggle={setIsOpen} />
  </SheetTrigger>
  <SheetContent className='bg-dark border-none p-0' side={'left'}>
    
  <div className='flex gap-2  flex-col bg-white p-2 shadow-md shadow-grey  h-screen  md:hidden'>
          <Image
          src={'/icon/zoomlogo.png'}
          alt='logo'
          width={40}
          height={40}
          />
        <section className='flex flex-col p-2 gap-5 '>

     {links.map((e,id)=>{
       const isActive=pathname==e.route;
       return(
         <SheetClose asChild key={e.route}>

         <Link 
         key={id}
         href={e.route}
         className={cn('h-10 p-2   text-[#3A506B]  font-bold text-lg items-center text-center rounded-lg ',{'bg-[#3A506B] text-white':isActive})}
         > 
            {e.label}
            </Link>
      </SheetClose>
        )
      })}
      </section>

    </div>
  </SheetContent>
</Sheet>
          </div>
    </section>
  )
}
export default Mobilenav