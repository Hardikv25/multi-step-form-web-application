'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFormData, setFormData } from '@/utils/formStorage';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';

type FormData = {
  gender: string;
  ageGroup: string;
};

const Page = () => {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    defaultValues: {
      gender: '',
      ageGroup: '',
    },
  });

  const t = useTranslations('DemographicsPage');

  const CATEGORY = 'personal-info';
  const FORM_NAME = 'demographics';

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = getFormData(CATEGORY, FORM_NAME);
    if (savedData) {
      setValue('gender', savedData.gender);
      setValue('ageGroup', savedData.ageGroup);
      setSubmitted(true);
    }
    setIsLoaded(true);
  }, [setValue]);

  const onSubmit = (data: FormData) => {
    setFormData(CATEGORY, FORM_NAME, data);
    setSubmitted(true);
  };

  const onNext = (data: FormData) => {
    setFormData(CATEGORY, FORM_NAME, data);
    setSubmitted(true);
    router.push(`/personal-info/education-info`);
  };

  if (!isLoaded) return null;

  return (
    <div className="shadow-2xl rounded-xl bg-white p-4 sm:p-6">
      <div>
        <h1 className="font-bold text-2xl">{t('categoryTitle')}</h1>
        <p className="text-gray-600">{t('formName')}</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <Label>
              {t('genderLabel')}<span className="ml-[-4px] text-red-500">*</span>
            </Label>
            <Controller
              name="gender"
              control={control}
              rules={{ required: t('genderRequiredErrorMessage') }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('genderPlaceHolder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t('maleOption')}</SelectItem>
                    <SelectItem value="female">{t('femaleOption')}</SelectItem>
                    <SelectItem value="other">{t('otherOption')}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
            )}
          </div>

          <div className="my-4">
            <Label>
              {t('ageLabel')}<span className="ml-[-4px] text-red-500">*</span>
            </Label>
            <Controller
              name="ageGroup"
              control={control}
              rules={{ required: t('ageRequiredErrorMessage') }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('agePlaceHolder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under18">{t('under18Option')}</SelectItem>
                    <SelectItem value="18-24">{t('18-24Option')}</SelectItem>
                    <SelectItem value="25-34">{t('25-34Option')}</SelectItem>
                    <SelectItem value="35-44">{t('35-44Option')}</SelectItem>
                    <SelectItem value="45-54">{t('45-54Option')}</SelectItem>
                    <SelectItem value="55+">{t('55+Option')}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.ageGroup && (
              <p className="text-sm text-red-500 mt-1">{errors.ageGroup.message}</p>
            )}
          </div>

          <div className="flex justify-between pt-4 border-t">
            <Link href={'/personal-info/basic-information'}>
              <Button type="button" className="border border-gray-300 py-5">
                {t('previousBtn')}
              </Button>
            </Link>
            {submitted ? (
              <Button
                type="submit"
                className="bg-gray-900 text-white py-5"
                onClick={handleSubmit(onNext)}
              >
                {t('nextBtn')}
              </Button>
            ) : (
              <Button type="submit" className="bg-gray-900 text-white py-5">
                 {t('completeBtn')}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
