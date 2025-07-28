import HistoryList from '@/app/(routes)/dashboard/_components/HistoryList'
import { Button } from '@/components/ui/button'
import React from 'react'
import DoctorAgentList from './_components/DoctorAgentList'
import AddNewSession from './_components/AddNewSession'

const Dashboard = () => {
  return (
    
    <div>
        <div className='flex items-center justify-between '>
        <h1>Dashboard page</h1>
        <AddNewSession/>
        </div>
        {/* <HistoryList/> */}
        <DoctorAgentList/>
    </div>
  )
}

export default Dashboard