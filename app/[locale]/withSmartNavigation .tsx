'use client';

import { useEffect, useState, ComponentType } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { formSteps } from '@/utils/form-steps';

const withSmartNavigation = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithSmartNavigation = (props: P) => {
    const router = useRouter();
    const pathname = usePathname();
    const [canRender, setCanRender] = useState(false);

    useEffect(() => {
      const rawData = localStorage.getItem('multiStepFormData');
      const data = rawData ? JSON.parse(rawData) : {};
      const formStatus: Record<string, boolean> = {};

      formSteps.forEach(({ categoryName, formName }) => {
        const isFilled =
          !!data?.[categoryName]?.[formName] &&
          Object.keys(data[categoryName][formName] || {}).length > 0;
        formStatus[`${categoryName}-${formName}`] = isFilled;
      });

      const pathParts = pathname.split('/').filter(Boolean);
      const category = pathParts[pathParts.length - 2];
      const form = pathParts[pathParts.length - 1];
      const currentKey = `${category}-${form}`;

      if (formStatus[currentKey]) {
        setCanRender(true);
        return;
      }

      for (const step of formSteps) {
        const key = `${step.categoryName}-${step.formName}`;
        if (!formStatus[key]) {
          if (step.path !== pathname) {
            router.replace(step.path);
          } else {
            setCanRender(true);
          }
          return;
        }
      }
    }, [pathname, router]);

    if (!canRender) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              Verifying step access...
            </p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithSmartNavigation.displayName = `WithSmartNavigation(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithSmartNavigation;
};

export default withSmartNavigation;
