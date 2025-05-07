'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { ArrowBigRightDash } from 'lucide-react'

const ContinueButton = () => {
  const router = useRouter()

  const formSteps = [
    { key: 'formData', path: '/personal-info/basic-information' },
    { key: 'formData2', path: '/personal-info/demographics' },
    { key: 'formData3', path: '/personal-info/education-info' },
    { key: 'formData4', path: '/contact-info/address-info' },
    { key: 'formData5', path: '/contact-info/phone-info' },
    { key: 'formData6', path: '/preferences/communication-pref' },
    { key: 'formData7', path: '/preferences/term-condition' },
  ]

  const handleContinue = () => {
    for (const step of formSteps) {
      const data = localStorage.getItem(step.key)
      if (!data || data === '{}' || data === 'null') {
        router.push(step.path)
        return
      }
    }
    router.push('/')
  }

  return (
    <Button onClick={handleContinue} className=''>
      Continue<ArrowBigRightDash/>
    </Button>
  )
}

export default ContinueButton
