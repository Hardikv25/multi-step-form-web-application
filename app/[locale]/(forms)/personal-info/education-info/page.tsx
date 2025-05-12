'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, useFieldArray } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getFormData, setFormData } from '@/utils/formStorage';
import { useTranslations } from 'next-intl';

type Education = {
  degree: string;
  startDate: string;
  endDate: string;
  percentage: string;
};

type FormData = {
  education: Education[];
};

const Page = () => {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      education: [{ degree: '', startDate: '', endDate: '', percentage: '' }],
    },
  });

  const t = useTranslations('EducationInfoPage');


  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  const CATEGORY = 'Personal Information';
  const FORM_NAME = 'Education';

  useEffect(() => {
    const savedData = getFormData(CATEGORY, FORM_NAME);
    if (savedData) {
      setValue('education', savedData.education);
      setSubmitted(true);
    }
  }, [setValue]);

  const onSubmit = (data: FormData) => {
    setFormData(CATEGORY, FORM_NAME, data);
    setSubmitted(true);
  };

  const onNext = (data: FormData) => {
    setFormData(CATEGORY, FORM_NAME, data);
    setSubmitted(true);
    router.push(`/contact-info/address-info`);
  };

  return (
    <div className="shadow-2xl rounded-xl bg-white p-4 sm:p-6">
      <div>
        <h1 className="font-bold text-2xl">{t('categoryTitle')}</h1>
        <p className="text-gray-600">{t('formName')}</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 border p-4 rounded-lg shadow-sm mb-4">
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-1'>
                  <Label>{t('degreeLabel')}</Label>
                  <Select
                    onValueChange={(value) => setValue(`education.${index}.degree`, value)}
                    defaultValue={fields[index]?.degree}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('degreePlaceHolder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School">{t('highSchool')}</SelectItem>
                      <SelectItem value="Diploma">{t('diploma')}</SelectItem>
                      <SelectItem value="B.Tech">{t('bTech')}</SelectItem>
                      <SelectItem value="B.Sc">{t('bsc')}</SelectItem>
                      <SelectItem value="B.Com">{t('bCom')}</SelectItem>
                      <SelectItem value="M.Tech">{t('mTech')}</SelectItem>
                      <SelectItem value="M.Sc">{t('msc')}</SelectItem>
                      <SelectItem value="MCA">{t('mca')}</SelectItem>
                      <SelectItem value="MBA">{t('mba')}</SelectItem>
                      <SelectItem value="PhD">{t('phd')}</SelectItem>
                    </SelectContent>

                  </Select>
                  {errors.education?.[index]?.degree?.message && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.education[index].degree?.message}
                    </p>
                  )}
                </div>
                <div className='col-span-1'>
                  <Label>{t('percentageLabel')}</Label>
                  <Input
                    type="text"
                    placeholder={t('percentagePlaceHolder')}
                    {...register(`education.${index}.percentage`, {
                      required: t('percentageRequiredErrorMessage'),
                    })}
                  />
                  {errors.education?.[index]?.percentage && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.education[index].percentage?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-1'>
                  <Label>{t('startDateLabel')}</Label>
                  <Input
                    type="date"
                    {...register(`education.${index}.startDate`, {
                      required: t('startDateRequiredErrorMessage'),
                    })}
                  />
                  {errors.education?.[index]?.startDate && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.education[index].startDate?.message}
                    </p>
                  )}
                </div>

                <div className='col-span-1'>
                  <Label>{t('endDateLabel')}</Label>
                  <Input
                    type="date"
                    {...register(`education.${index}.endDate`, {
                      required: t('endDateRequiredErrorMessage'),
                    })}
                  />
                  {errors.education?.[index]?.endDate && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.education[index].endDate?.message}
                    </p>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                className="mt-2"
              >
                {t('removeBtn')}
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => append({ degree: '', startDate: '', endDate: '', percentage: '' })}
          >
            {t('addOtherBtn')}
          </Button>

          <div className="flex justify-between mt-4 pt-4 border-t">
            <Link href={'/personal-info/demographics'}>
              <Button type="button" className="border border-gray-300 py-5">
                {t('previousBtn')}
              </Button>
            </Link>
            {!submitted ? (
              <Button type="submit" className="bg-gray-900 text-white py-5">
                {t('completeBtn')}
              </Button>
            ) : (
              <Button
                type="button"
                className="bg-gray-900 text-white py-5"
                onClick={handleSubmit(onNext)}
              >
                {t('nextBtn')}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
