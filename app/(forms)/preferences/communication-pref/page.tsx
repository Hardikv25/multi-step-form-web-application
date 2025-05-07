'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';

type FormData = {
    contactType: string;
};

const Page = () => {
    const [submitted, setSubmitted] = useState(false);
    const [mounted, setMounted] = useState(false);

    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>();

    useEffect(() => {
        const savedData = localStorage.getItem('formData6');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setValue('contactType', parsedData.contactType);
            setSubmitted(true);
        }
        setMounted(true);
    }, [setValue]);

    const onSubmit = (data: FormData) => {
        localStorage.setItem('formData6', JSON.stringify(data));
        setSubmitted(true);
    };

    const onNext = (data: FormData) => {
        localStorage.setItem('formData6', JSON.stringify(data));
        setSubmitted(true);
        router.push(`/preferences/term-condition`)
    };

    if (!mounted) return null; // Prevent SSR mismatch

    return (
        <div className="shadow-2xl rounded-xl bg-white sm:m-4 p-4 sm:p-6">
            <div className="my-8">
            <h1 className="font-bold text-2xl">Communication Preferences</h1>
                         <p className="text-gray-600">Preferences</p>

                         <form onSubmit={handleSubmit(onSubmit)}>
                             <div className="my-4">
                                 <Label>Preferred Contact Method<span className="ml-[-4px] text-red-500">*</span></Label>
                                 <Controller
                                    name="contactType"
                                    control={control}
                                    rules={{ required: "Preferred Contact Method is required" }}
                                    render={({ field }) => (
                                        <RadioGroup onValueChange={field.onChange} value={field.value}>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Email" id="Email" />
                                                <Label htmlFor="Email">Email</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Phone" id="Phone" />
                                                <Label htmlFor="Phone">Phone</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Mail" id="Mail" />
                                                <Label htmlFor="Mail">Mail</Label>
                                            </div>
                                        </RadioGroup>
                                    )}
                                />
                                {errors.contactType && (
                                    <p className="text-sm text-red-500 mt-1">{errors.contactType.message}</p>
                                )}
                            </div>

                            <div className="flex justify-between">
                        <Link href={'/contact-info/phone-info'}>
                            <Button type="button" className="border border-gray-300 py-5">
                                Previous
                            </Button>
                        </Link>
                        {submitted ? (
                            <Button
                                type="button"
                                className="bg-gray-900 text-white py-5"
                                onClick={handleSubmit(onNext)}
                            >
                                Next
                            </Button>
                        ) : (
                            <Button type="submit" className="bg-gray-900 text-white py-5">
                                Complete
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;