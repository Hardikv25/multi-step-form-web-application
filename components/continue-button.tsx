'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { ArrowBigRightDash } from 'lucide-react'
import { formSteps } from '@/utils/form-steps'
import { getFormData } from '@/utils/formStorage'

const ContinueButton = () => {
  const router = useRouter()

  const handleContinue = () => {
    for (const step of formSteps) {
      const data = getFormData(step.categoryName, step.formName)
      if (!data || Object.keys(data).length === 0) {
        router.push(step.path)
        return
      }
    }
    router.push('/preferences/term-condition')
  }

  return (
    <Button onClick={handleContinue}>
      Continue <ArrowBigRightDash className="ml-2" />
    </Button>
  )
}

export default ContinueButton
