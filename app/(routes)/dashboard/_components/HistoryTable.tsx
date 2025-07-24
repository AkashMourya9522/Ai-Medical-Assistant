import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import moment from 'moment'

import { sessionDetailsType } from '../voice-call/[sessionId]/page'
import { Button } from '@/components/ui/button'
type props = {
    historyList:sessionDetailsType[]
}

function HistoryTable({historyList}:props) {
    
    return (
    <Table>
  <TableCaption>Previous Consultation Reports</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead >AI Medical Specialist</TableHead>
      <TableHead >Description</TableHead>
      <TableHead >Date</TableHead>
      <TableHead >Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        historyList.map((record,index)=> <TableRow>
      <TableCell className="font-medium">{record.selectedDoctor.specialist}</TableCell>
      <TableCell >{record.notes}</TableCell>
      <TableCell>{moment(new Date(record.createdOn)).fromNow()}</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
      <TableCell className="text-right">
        <Button variant="link" size="sm" className="w-full">
          View Report
        </Button></TableCell>
    </TableRow>)
    }
    
  </TableBody>
</Table>
  )
}

export default HistoryTable