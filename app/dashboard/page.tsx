'use client'

import ContinueButton from '@/components/continue-button'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, Loader, MoveRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formSteps } from '@/utils/form-steps'

const Page = () => {
  const router = useRouter()
  const [formStatus, setFormStatus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const rawData = localStorage.getItem('multiStepFormData')
    const data = rawData ? JSON.parse(rawData) : {}
    const statusMap: Record<string, boolean> = {}

    formSteps.forEach(({ categoryName, formName }) => {
      const isFilled = !!data?.[categoryName]?.[formName] &&
        Object.keys(data[categoryName][formName]).length > 0
      statusMap[`${categoryName}-${formName}`] = isFilled
    })

    setFormStatus(statusMap)
  }, [])

  const handleSmartNavigate = (category: string, form: string, path: string) => {
    const currentKey = `${category}-${form}`
    if (formStatus[currentKey]) {
      router.push(path)
    } else {
      for (const step of formSteps) {
        const key = `${step.categoryName}-${step.formName}`
        if (!formStatus[key]) {
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
    <div>
      <div className="flex justify-end mx-6 mb-4 gap-2">
        <Button className="bg-red-500 hover:bg-red-600 shadow-md" onClick={onReset}>Reset</Button>
        <ContinueButton />
      </div>

      <div className="border border-gray-200 shadow-md rounded-2xl bg-white mx-6 py-10 px-6 md:px-12 lg:px-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Multi-Step Form Dashboard</h1>

        <div className="overflow-x-auto">
          <Table className="min-w-full text-sm">
            <TableHeader>
              <TableRow className="bg-gray-50 text-gray-600 uppercase tracking-wide text-xs font-semibold">
                <TableHead>Form ID</TableHead>
                <TableHead>Form Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {formSteps.map((form) => {
                const key = `${form.categoryName}-${form.formName}`
                const status = formStatus[key]

                return (
                  <TableRow key={form.id} className="hover:bg-gray-100 transition-all duration-150">
                    <TableCell className="font-medium text-gray-800">{form.id}</TableCell>
                    <TableCell className="text-gray-700">{form.formName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {status ? (
                          <span className="flex items-center gap-1 text-green-600 font-medium">
                            <Check className="w-4 h-4" /> Completed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-500 font-medium">
                            <Loader className="w-4 h-4 animate-spin" /> Pending
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleSmartNavigate(form.categoryName, form.formName, form.path)
                        }
                        className="hover:bg-gray-200 transition"
                      >
                        <MoveRight className="w-4 h-4 mr-1" /> Go
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Page
