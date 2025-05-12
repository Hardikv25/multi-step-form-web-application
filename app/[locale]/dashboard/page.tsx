'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MoveRight, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formSteps } from '@/utils/form-steps'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import ContinueButton from '@/components/continue-button'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useTranslations } from 'next-intl';

const Page = () => {
  const router = useRouter()
  const [formStatus, setFormStatus] = useState<Record<string, boolean>>({})
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const t = useTranslations('DashboardPage');

  useEffect(() => {
    const rawData = localStorage.getItem('multiStepFormData')
    const data = rawData ? JSON.parse(rawData) : {}
    const statusMap: Record<string, boolean> = {}

    formSteps.forEach(({ categoryName, formName }) => {
      const isFilled =
        !!data?.[categoryName]?.[formName] &&
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

  const groupedForms = formSteps.reduce((acc, step) => {
    if (!acc[step.categoryName]) acc[step.categoryName] = []
    acc[step.categoryName].push(step)
    return acc
  }, {} as Record<string, typeof formSteps>)

  return (
    <div>
      <div className="flex justify-end mx-6 mb-4 gap-2">
        <Button className="bg-red-500 hover:bg-red-600 shadow-md" onClick={onReset}>
          {t('resetBtn')}
        </Button>
        <ContinueButton />
      </div>

      <div className="border border-gray-200 shadow-md rounded-2xl bg-white mx-6 py-10 px-6 md:px-12 lg:px-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          📋{t('title')}
        </h1>

        {Object.entries(groupedForms).map(([category, forms]) => {
          const isOpen = openCategory === category

          return (
            <Collapsible
              key={category}
              open={isOpen}
              className="group/collapsible mb-6 border border-gray-200 rounded-lg"
            >
              <CollapsibleTrigger asChild>
                <button
                  className="w-full px-4 py-3 flex items-center justify-between font-semibold text-left bg-gray-100 rounded-t-lg text-gray-700"
                  onClick={() => setOpenCategory(isOpen ? null : category)}
                >
                  <span>{category}</span>
                  <ChevronRight
                    className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  />
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent className="bg-white border-t border-gray-200">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell className="px-4 py-3 font-medium text-gray-600">
                          {t('tableHeaderFormName')}</TableCell>
                        <TableCell className="px-4 py-3 font-medium text-gray-600">{t('tableHeaderStatus')}</TableCell>
                        <TableCell className="px-4 py-3 font-medium text-gray-600 text-right">{t('tableHeaderAction')}</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {forms.map((form) => {
                        const key = `${form.categoryName}-${form.formName}`
                        const status = formStatus[key]

                        return (
                          <TableRow key={form.id} className="border-b hover:bg-gray-50 transition">
                            <TableCell className="px-4 py-3 text-gray-800">
                              {form.formName}
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full  ${status
                                  ? 'text-green-500'
                                  : 'text-red-500'
                                  }`}
                              >
                                {status ? t('statusCompleted') : t('statusPending')}
                              </span>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleSmartNavigate(
                                    form.categoryName,
                                    form.formName,
                                    form.path
                                  )
                                }
                                className="hover:bg-gray-200"
                              >
                                <MoveRight className="w-4 h-4 mr-1" /> {t('goBtn')}
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </div>
    </div>
  )
}

export default Page
