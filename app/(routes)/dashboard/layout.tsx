import React from 'react'
import AppHeader from './_components/AppHeader';
import { Toaster } from "@/components/ui/sonner"

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
        <AppHeader/>
        <Toaster />
        <div className='px-10 sm:px-20 py-10'>
        {children}</div>
        </div>
  )
}

export default layout