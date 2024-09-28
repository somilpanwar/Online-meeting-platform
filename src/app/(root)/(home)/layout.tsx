
import Mobilenav from '@/components/Mobilenav'
import Navbar from '@/components/Navbar'
import Sidebarlinks from '@/components/sidebarlinks'
// import Sidebarlinks from '@/components/sidebarlinks'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (<>
  <div className='hidden md:flex'> 
<Navbar/>
  </div>
  <div className='md:hidden'>
        <Mobilenav/>
  </div>

      <div className='flex '>
        
       <div className='hidden md:block'>
       <Sidebarlinks/>
       </div>
      <div className='p-5 w-full'> 
    {children}
        </div>  
    
    
    </div>
  </>
  )
}

export default Layout