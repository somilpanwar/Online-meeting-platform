import { SignIn } from '@clerk/nextjs'
import React from 'react'

const signinpage = () => {
  return (
    <main className='flex justify-center items-center h-screen'>
        <SignIn/>
    </main>
  )
}

export default signinpage