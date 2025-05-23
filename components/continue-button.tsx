'use client'


import { Button } from './ui/button'
import { ArrowBigRightDash } from 'lucide-react'
import { formSteps } from '@/utils/form-steps'
import { getFormData } from '@/utils/formStorage'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'

const ContinueButton = () => {
  const router = useRouter()
  const t = useTranslations('DashboardPage');

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
      {t('continueBtn')} <ArrowBigRightDash className="ml-2" />
    </Button>
  )
}

export default ContinueButton
