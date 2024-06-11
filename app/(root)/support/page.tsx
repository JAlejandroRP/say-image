import Header from '@/components/shared/Header'
import SupportForm from '@/components/shared/SupportForm'
import { getUserByClerkId } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const CustomerSupport = async () => {
  const { userId } = auth()
  if (!userId) redirect('/sign-in');
  const user = await getUserByClerkId(userId)

  return (
    <div className='w-3/4 max-w-4xl mx-auto py-12 md:py-20'>
      <div className='space-y-6'>
        <div className='text-center space-y-2'>
          <Header title='Get in touch with our support team'
            subtitle='Have a question or need help? Fill out the form below and one of our support representatives will get back to you as soon as possible.'
          />
          <SupportForm userId={user._id} />
        </div>
      </div>
    </div>
  )
}

export default CustomerSupport