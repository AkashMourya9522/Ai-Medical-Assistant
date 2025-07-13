import HistoryList from '@/app/(routes)/dashboard/_components/HistoryList'
import { Button } from '@/components/ui/button'
import React from 'react'
import DoctorAgentList from './_components/DoctorAgentList'

const Dashboard = () => {
  return (
    
    <div>
        <div className='flex items-center justify-between '>
        <h1>Dashboard page</h1>
        <Button>Consult With Doctor</Button>
        </div>
        <HistoryList/>
        <DoctorAgentList/>
    </div>
  )
}

export default Dashboard