import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-[#3A506B] pl-5 pr-5 w-full  gap-5 p-2 align-middle'>
     <div className='flex items-center'>
      <Image
      src={'/icon/zoomlogo.png'}
      alt='logo'
      width={42}
      height={42}
      ></Image>
      <p className='text-2xl font-bold text-[#F0F4F8]'>JOIN</p>
      </div>
      <SignedIn >
        <UserButton/>
      </SignedIn>
    </div>
  )
}

export default Navbar