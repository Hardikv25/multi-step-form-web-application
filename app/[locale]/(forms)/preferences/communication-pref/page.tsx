'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getFormData, setFormData } from '@/utils/formStorage';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import withSmartNavigation from '@/app/[locale]/withSmartNavigation ';

type FormData = {
    contactType: string;
};

const Page = () => {
    const [submitted, setSubmitted] = useState(false);

    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>();

    const CATEGORY = 'preferences';
    const FORM_NAME = 'communication-preferences';

    const t = useTranslations('CommunicationPrefPage');

    useEffect(() => {
        const savedData = getFormData(CATEGORY, FORM_NAME);
        if (savedData) {
            setValue('contactType', savedData.contactType);
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
        router.push(`/preferences/term-condition`)
    };


    return (
        <div className="shadow-2xl rounded-xl bg-white p-4 sm:p-6">
            <div>
                <h1 className="font-bold text-2xl">{t('categoryTitle')}</h1>
                <p className="text-gray-600">{t('formName')}</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <Label>{t('contactMethodLabel')}<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Controller
                            name="contactType"
                            control={control}
                            rules={{ required: t('contactTypeRequiredErrorMessage') }}
                            render={({ field }) => (
                                <RadioGroup onValueChange={field.onChange} value={field.value}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Email" id="Email" />
                                        <Label htmlFor="Email">{t('email')}</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Phone" id="Phone" />
                                        <Label htmlFor="Phone">{t('phone')}</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                        {errors.contactType && (
                            <p className="text-sm text-red-500 mt-1">{errors.contactType.message}</p>
                        )}
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                        <Link href={'/contact-info/phone-info'}>
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

export default withSmartNavigation(Page);