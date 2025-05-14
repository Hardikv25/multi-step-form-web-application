'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { getFormData, setFormData } from '@/utils/formStorage';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

type FormData = {
    fullName: string;
    email: string;
};

const Page = () => {
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const t = useTranslations('BasicInfoPage');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>();

    const CATEGORY = 'personal-info'
    const FORM_NAME = 'basic-info'

    useEffect(() => {
        const savedData = getFormData(CATEGORY, FORM_NAME);
        if (savedData) {
            setValue('fullName', savedData.fullName);
            setValue('email', savedData.email);
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
        router.push(`/personal-info/demographics`);
    };

    return (
        <div className="shadow-2xl rounded-xl bg-white p-4 sm:p-6">
            <div>
                <h1 className="font-bold text-2xl">{t('categoryTitle')}</h1>
                <p className="text-gray-600">{t('formName')}</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <Label>
                           {t('fullNameLabel')}<span className="ml-[-4px] text-red-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder={t('fullNamePlaceHolder')}
                            {...register('fullName', { required: t('fullNameRequiredErrorMessage') })}
                        />
                        {errors.fullName && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    <div className="my-4">
                        <Label>
                            {t('emailLabel')}<span className="ml-[-4px] text-red-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder={t('emailPlaceHolder')}
                            {...register('email', {
                                required: t('emailRequiredErrorMessage'),
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: t('emailInvalidErrorMessage'),
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                        <Button disabled className="border border-gray-300 py-5">
                            {t('previousBtn')}
                        </Button>
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
