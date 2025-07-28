import { PricingTable } from '@clerk/nextjs'

export default function PricingPage() {
  return (
    <div className='px-10 md:px-24 lg:px-48 xl:px-64 flex flex-col items-center gap-10 '>
      <h1 className='font-bold text-3xl text-gray-400'>Select A Plan Which Suits You The Best</h1>
      <PricingTable  />
    </div>
  )
}