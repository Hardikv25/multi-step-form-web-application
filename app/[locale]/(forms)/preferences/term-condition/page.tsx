'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { getFormData, setFormData } from '@/utils/formStorage';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type FormData = {
  terms: boolean;
};

const Page = () => {
  const [submitted, setSubmitted] = useState(false);
  const [congrats, setCongrats] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const CATEGORY = 'preferences';
  const FORM_NAME = 'terms-and-conditions';

  const t = useTranslations('termConditionPage');

  useEffect(() => {
    const savedData = getFormData(CATEGORY, FORM_NAME);
    if (savedData) {
      setValue('terms', savedData.terms);
      setSubmitted(true);
    }

    const submitAll = localStorage.getItem('SubmitAll');
    if (submitAll === 'true') {
      setCongrats(true);
      setSubmitted(true);
    }
  }, [setValue]);

  const onSubmit = (data: FormData) => {
    setFormData(CATEGORY, FORM_NAME, data);
    setSubmitted(true);
  };

  const onSubmitAll = () => {
    localStorage.setItem('SubmitAll', 'true');
    setCongrats(true);
  };

  return (
    <div className="shadow-2xl rounded-xl bg-white p-4 sm:p-6">
      <div>
        <h1 className="font-bold text-2xl">{t('categoryTitle')}</h1>
        <p className="text-gray-600">{t('formName')}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <div className="flex items-center space-x-2">
              <Controller
                name="terms"
                control={control}
                rules={{ required: t('termConditionRequiredErrorMessage') }}
                render={({ field }) => (
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="terms">{t('termConditionLabel')}</Label><span className='text-red-500 ml-[-4px]'>*</span>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>
            )}
          </div>

          <div className="flex justify-between pt-4 border-t">
            <Link href={'/preferences/communication-pref'}>
              <Button type="button" className="border border-gray-300 py-5">
                {t('previousBtn')}
              </Button>
            </Link>
            {submitted ? (
              <Button type="submit" className="bg-green-600 text-white py-5 hover:bg-green-700" onClick={handleSubmit(onSubmitAll)}>
                {t('submitAllBtn')}
              </Button>
            ) : (
              <Button type="submit" className="bg-gray-900 text-white py-5">
                 {t('completeBtn')}
              </Button>
            )}
          </div>
        </form>

        {congrats && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
            <h2 className="font-bold text-lg text-green-800">{t('thankyou')}</h2>
            <p className="text-green-700">{t('thankyouMessage')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;