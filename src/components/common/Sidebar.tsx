import React from 'react'
import { ChatTeardropText, Rows, Database } from "@phosphor-icons/react";
import { cn } from '@/lib/utils';

const SidebarIcon = ({icon,label, active}:{icon:any, label:string, active?:boolean})=>{
    return (
        <div className='flex flex-col items-center'>
            <div className={cn('h-[54px] w-[54px] cursor-pointer hover:scale-105 transition-all hover:bg-secondaryBg hover:bg-opacity-50 hover:text-white text-black text-xl rounded-full flex items-center justify-center', 
            active && 'bg-secondaryBg text-white'
            )}>
            {icon}
            </div>
            <div className='text-sm mt-2'>{label}</div>
        </div>
    )
}

const Sidebar = () => {
  return (
    <div className='px-8 fixed top-0 left-0 h-[100vh] pt-16 w-[120px] rounded-l-xl bg-primary py-3'>
        <div className='flex flex-col space-y-8 items-center'>
            <SidebarIcon active icon={<ChatTeardropText size={27} />} label={'Chat'}/>
            <SidebarIcon icon={<Rows size={27} />} label={'Shortlisted'}/>
            <SidebarIcon icon={<Database size={27} />} label={'SQL DB'}/>
        </div>
    </div>
  )
}

export default Sidebar