'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getFormData, setFormData } from '@/utils/formStorage';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import withSmartNavigation from '@/app/[locale]/withSmartNavigation ';

type FormData = {
    phone: string
    phoneType: string
};

const Page = () => {
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const CATEGORY = 'contact-info';
    const FORM_NAME = 'phone-info';

    const t = useTranslations('PhoneInfoPage');

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        control,
    } = useForm<FormData>();

    useEffect(() => {
        const savedData = getFormData(CATEGORY, FORM_NAME);
        if (savedData) {
            setValue('phone', savedData.phone);
            setValue('phoneType', savedData.phoneType);
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
        router.push(`/preferences/communication-pref`);
    };

    return (
        <div className="shadow-2xl rounded-xl bg-white p-4 sm:p-6">
            <div>
                <h1 className="font-bold text-2xl">{t('categoryTitle')}</h1>
                <p className="text-gray-600">{t('formName')}</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <Label>{t('phoneNumberLabel')}<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Input
                            type="text"
                            placeholder={t('phoneNumberPlaceHolder')}
                            {...register('phone', {
                                required: t('phoneNumberRequiredErrorMessage'),
                                minLength: {
                                    value: 10,
                                    message:
                                        t('phoneNumberInvalidErrorMessage')
                                }
                            })}
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                    </div>
                    <div className="my-4">
                        <Label>{t('phoneTypeLabel')}<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Controller
                            name="phoneType"
                            control={control}
                            rules={{ required: t('phoneTypeRequiredErrorMessage') }}
                            render={({ field }) => (
                                <RadioGroup onValueChange={field.onChange} value={field.value}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="mobile" id="mobile" />
                                        <Label htmlFor="mobile">{t('mobile')}</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="home" id="home" />
                                        <Label htmlFor="home">{t('home')}</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="work" id="work" />
                                        <Label htmlFor="work">{t('work')}</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />

                        {errors.phoneType && (
                            <p className="text-sm text-red-500 mt-1">{errors.phoneType.message}</p>
                        )}
                    </div>
                    <div className="flex justify-between border-t pt-4">
                        <Link href={'/contact-info/address-info'}>
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

export default withSmartNavigation(Page);