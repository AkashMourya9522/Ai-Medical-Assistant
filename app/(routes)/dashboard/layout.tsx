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
        <div className='px-10 sm:px-20 py-10'>
        {children}</div>
        </div>
  )
}

export default layout