'use client'

import ContinueButton from '@/components/continue-button'
import { Button } from '@/components/ui/button'
import React, { useEffect, useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, Loader, MoveRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [formStatus, setFormStatus] = useState<Record<string, boolean>>({})

  const formSteps = useMemo(() => [
    { id: 1, key: 'formData', formName: 'Basic Information', path: '/personal-info/basic-information' },
    { id: 2, key: 'formData2', formName: 'Demographics', path: '/personal-info/demographics' },
    { id: 3, key: 'formData3', formName: 'Education Information', path: '/personal-info/education-info' },
    { id: 4, key: 'formData4', formName: 'Address Information', path: '/contact-info/address-info' },
    { id: 5, key: 'formData5', formName: 'Phone Information', path: '/contact-info/phone-info' },
    { id: 6, key: 'formData6', formName: 'Communication Preferences', path: '/preferences/communication-pref' },
    { id: 7, key: 'formData7', formName: 'Terms & Conditions', path: '/preferences/term-condition' },
  ], [])

  useEffect(() => {
    const statusMap: Record<string, boolean> = {}
    formSteps.forEach(({ key }) => {
      const value = localStorage.getItem(key)
      statusMap[key] = !!value && value !== '{}' && value !== 'null'
    })
    setFormStatus(statusMap)
  }, [formSteps])

  const handleSmartNavigate = (formKey: string, formUrl: string) => {
    if (formStatus[formKey]) {
      router.push(formUrl)
    } else {
      for (const step of formSteps) {
        const value = localStorage.getItem(step.key)
        if (!value || value === '{}' || value === 'null') {
          router.push(step.path)
          return
        }
      }
    }
  }

  const onReset = () => {
    localStorage.clear()
    setFormStatus({})
  }

  return (
    <>
      <div className='flex justify-end mx-6 mt-8 mb-4 gap-2'>
        <Button className='bg-red-500 hover:bg-red-600' onClick={onReset}>Reset</Button>
        <ContinueButton />
      </div>
      <div className='border border-gray-200 rounded-lg bg-white mx-6 py-8 px-8 md:px-16 lg:px-40'>
        <h1 className='text-3xl font-semibold'>Multi-Step Form Dashboard</h1>
        <Table>
          <TableCaption>Your form progress</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Step Id</TableHead>
              <TableHead>Form Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Move To Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formSteps.map((form) => (
              <TableRow key={form.id}>
                <TableCell className="font-medium">{form.id}</TableCell>
                <TableCell>{form.formName}</TableCell>
                <TableCell className=" flex items-center gap-1">
                  {formStatus[form.key] ? <Check className="text-green-600" /> : <Loader className=" text-red-500" />}
                </TableCell>
                <TableCell>
                  <Button variant="link" onClick={() => handleSmartNavigate(form.key, form.path)}> 
                    <MoveRight />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default Page
