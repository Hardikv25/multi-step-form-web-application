'use client';

import { useEffect, useState } from 'react';
import { formSteps } from '@/utils/form-steps';
import { getFormData } from '@/utils/formStorage';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function FormLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const filledSteps = formSteps.map(step => {
      const data = getFormData(step.categoryName, step.formName);
      const isFilled = data && Object.keys(data).length > 0;
      return { ...step, isFilled };
    });

    const currentStep = formSteps.find(step => step.path === pathname);
    const lastUnfilledStep = filledSteps.find(step => !step.isFilled);

    if (currentStep) {
      const isCurrentFilled = filledSteps.find(s => s.path === currentStep.path)?.isFilled;
      const isFirstUnfilled = currentStep.path === lastUnfilledStep?.path;

      if (!isCurrentFilled && !isFirstUnfilled) {
        router.replace(lastUnfilledStep?.path || '/');
      } else {
        setIsAllowed(true);
      }
    } else {
      setIsAllowed(true);
    }
  }, [pathname, router]);

  if (!isAllowed) return null;

  return (
    <>
      {children}
    </>
  );
}
