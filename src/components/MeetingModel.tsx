import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
import { cn } from '@/lib/utils'
  
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
  
  <DialogContent className={cn('text-2xl bg-blue-950 border-none ',classname)}>
       <div className="flex flex-col gap-2">
       <DialogTitle>
       
            {title}
          
        </DialogTitle> 
            {children}
        <button className='bg-blue-400 w-full rounded-md'onClick={handleclick}>
            {buttontext}
        </button>
       </div>
  </DialogContent>
</Dialog>

  )
}

export default MeetingModel