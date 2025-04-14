import React from 'react'
import UserInfoCard from './_components/UserInfoCard'
import RecentTransactions from './_components/RecentTransactions'
function page() {
  return (
    <div className='w-[955px]  flex flex-col gap-6' >
       <UserInfoCard />
       <RecentTransactions/>
    </div>
  )
}

export default page
