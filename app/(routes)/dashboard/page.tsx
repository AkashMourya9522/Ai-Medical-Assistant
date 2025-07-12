import HistoryList from '@/app/_components/HistoryList'
import { Button } from '@/components/ui/button'
import React from 'react'

const Dashboard = () => {
  return (
    
    <div>
        <div className='flex items-center justify-between '>
        <h1>Dashboard page</h1>
        <Button>Consult With Doctor</Button>
        </div>
        <HistoryList/>
    </div>
  )
}

export default Dashboard