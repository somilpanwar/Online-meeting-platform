"use client"
import React from 'react'
import { useState } from 'react';
import { links } from '../../constant'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'



const Sidebarlinks = () => {
  const pathname = usePathname();
  const [onHover, setonHover] = useState(false);

  return (
    <div
      onMouseOver={() => {
        setonHover(true);

      }}
      onMouseOut={() => {
        setonHover(false);

      }}
      className='flex  p-5 flex-col justify-evenly transition-all ease-out delay-250 duration-1000 bg-green-600 h-screen align-middle'>
      {links.map((e, id) => {
        const isActive = pathname == e.route;
        return (
          <div
            key={id}


            className={cn('rounded-lg flex p-2 w-max items-center align-middle', { 'bg-green-400': isActive })}

          >


            <Image
              src={e.icon}
              width={24}
              height={24}
              alt='home'
            ></Image>

            <Link
              href={e.route}
              className={cn('text-white ml-2 font-bold text-center hidden ', { 'block': onHover })}
            >
              {e.label}
            </Link>
          </div>
        )
      })}

    </div>
  )
}

export default Sidebarlinks

