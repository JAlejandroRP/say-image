"use client"
import React, { useEffect, useState, useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea'
import { CustomField } from './CustomField'
import { useRouter } from 'next/navigation'
import { Control } from "react-hook-form";
import { Card, CardContent } from '../ui/card'
import { sendMessage } from '@/lib/actions/support.actions'
import { useToast } from '../ui/use-toast'

export const supportFormSchema = z.object({
  message: z.string(),
})

const SupportForm = ({ userId }: { userId: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const initialValues = {
    message: '',
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof supportFormSchema>>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: initialValues
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof supportFormSchema>) {
    try {
      console.log('submitting', values);

      setIsSubmitting(true)

      const messageSend = await sendMessage({
        message: values.message,
        userId: userId
      })
      //   headers: {
      //     Accept: "application/json",
      //     method: "POST"
      //   },
      //   body: JSON.stringify(values)
      // })
      toast({
        title: "Message send!",
        description: "We receive your message and you will receive and email from us soon",
        duration: 5000,
        className: 'success-toast'
      })
      console.log(messageSend);
    } catch (error) {
      toast({
        title: "Something failed!",
        description: '' + error,
        duration: 5000,
        className: 'error-toast'
      })
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="space-y-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomField
            control={form.control}
            name='message'
            formLabel='Enter your message'
            className='w-full text-left text-md'
            render={({ field }) =>
              <Textarea {...field}
                placeholder='Please incluide all relevant details'
                className='input-field' />
            }
          />

          <div className="flex flex-col gap-4">

            <Button
              type="submit"
              className='submit-button capitalize'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </form>
      </Form >

    </div>
  )
}

export default SupportForm