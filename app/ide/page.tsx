import IDE from '@/components/ide/ide'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const Page = async() => {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  return (
    <IDE user = {userEmail}/>
  )
}

export default Page