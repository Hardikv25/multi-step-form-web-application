'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Link, useRouter } from '@/i18n/navigation';
import { Input } from '@/components/ui/input';
import { getFormData, setFormData } from '@/utils/formStorage';
import { useTranslations } from 'next-intl';

type FormData = {
    address: string
    city: string
    zip: string
};

const Page = () => {
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm<FormData>();

    const CATEGORY = 'contact-info'
    const FORM_NAME = 'address-info'

    const t = useTranslations('AddressInfoPage');

    useEffect(() => {
        const savedData = getFormData(CATEGORY, FORM_NAME);
        if (savedData) {
            setValue('address', savedData.address);
            setValue('city', savedData.city);
            setValue('zip', savedData.zip);
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
        router.push(`/contact-info/phone-info`)
    };

    return (
        <div className="shadow-2xl rounded-xl bg-white p-4 sm:p-6">
            <div>
                <h1 className="font-bold text-2xl">{t('categoryTitle')}</h1>
                <p className="text-gray-600">{t('formName')}</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <Label>{t('streetAddressLabel')}<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Input
                            type="text"
                            placeholder={t('streetAddressPlaceHolder')}
                            {...register('address', { required: t('streetAddressRequiredErrorMessage') })}
                        />
                        {errors.address && (
                            <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
                        )}
                    </div>
                    <div className="my-4">
                        <Label>{t('cityLabel')}<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Input
                            type="text"
                            placeholder={t('cityPlaceHolder')}
                            {...register('city', { required: t('cityRequiredErrorMessage') })}
                        />
                        {errors.city && (
                            <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
                        )}
                    </div>
                    <div className="my-4">
                        <Label>{t('zipLabel')}<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Input
                            type="text"
                            placeholder={t('zipPlaceHolder')}
                            {...register('zip', {
                                required: t('zipRequiredErrorMessage'),
                                pattern: {
                                    value: /^\d{6}$/,
                                    message: t('zipInvalidErrorMessage'),
                                },
                            })}
                        />
                        {errors.zip && (
                            <p className="text-sm text-red-500 mt-1">{errors.zip.message}</p>
                        )}
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                        <Link href={'/personal-info/education-info'}>
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
        </div >
    );
};

export default Page;