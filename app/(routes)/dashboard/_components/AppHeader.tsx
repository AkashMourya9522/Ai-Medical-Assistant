import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const menuItems = [
    {id:1,name:'Home',path:'/home'},
    {id:2,name:'History',path:'/history'},
    {id:3,name:'Pricing',path:'/pricing'},
    {id:4,name:'Profile',path:'/profile'},
]

const AppHeader = () => {
  return (
    <div className='flex items-center justify-around p-5 shadow-md'>
        <Image src={'/logo.svg'} alt='Ai Medical Agent' height={100} width={100}/>
        <div className='hidden sm:flex items-center gap-10'>
            {
                menuItems.map((item)=><Link key={item.id} href={item.path}>
                    <span className='hover:font-bold transition-all'>{item.name}</span>
                </Link>)
            }
        </div>
        <UserButton/>
    </div>
  )
}

export default AppHeader