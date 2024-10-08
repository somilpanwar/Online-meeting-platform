import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
  
interface meetingprops{
    classname:string,
    buttontext:string,
    handleclick:()=>void
    isOpen:boolean
    onclose:()=>void
    children?: ReactNode;
    title:string
}
const MeetingModel = ({classname,buttontext,children,handleclick,isOpen,onclose,title}:meetingprops) => {
  return (
    <Dialog open={isOpen} onOpenChange={onclose}>
  
  <DialogContent className={cn('text-2xl bg-white border-none shadow-md shadow-grey text-[#3A506B]  ',classname)}>
       <div className="flex flex-col gap-2">
       <DialogTitle>
       
            {title}
          
        </DialogTitle> 
            {children}
        <Button className='bg-[#3A506B] text-xl  'onClick={handleclick}>
            {buttontext}
        </Button>
       </div>
  </DialogContent>
</Dialog>

  )
}

export default MeetingModel