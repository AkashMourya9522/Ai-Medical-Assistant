import React from 'react'
import AppHeader from './_components/AppHeader';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
        <AppHeader/>
        <div className='p-5'>
        {children}</div>
        </div>
  )
}

export default layout