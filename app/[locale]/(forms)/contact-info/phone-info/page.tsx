'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getFormData, setFormData } from '@/utils/formStorage';

type FormData = {
    phone: string
    phoneType: string
};

const Page = () => {
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const CATEGORY = 'Contact Information';
    const FORM_NAME = 'Phone Information';

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
                <h1 className="font-bold text-2xl">Phone Information</h1>
                <p className="text-gray-600">Contact Details</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <Label>Phone Number<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Input
                            type="text"
                            placeholder="Enter your Phone number"
                            {...register('phone', {
                                required: 'Phone Number is required',
                                minLength: {
                                    value: 10,
                                    message: 'Phone Number Must be 10 digit'
                                }
                            })}
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                    </div>
                    <div className="my-4">
                        <Label>Phone type<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Controller
                            name="phoneType"
                            control={control}
                            rules={{ required: "Phone type is required" }}
                            render={({ field }) => (
                                <RadioGroup onValueChange={field.onChange} value={field.value}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="mobile" id="mobile" />
                                        <Label htmlFor="mobile">Mobile</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="home" id="home" />
                                        <Label htmlFor="home">Home</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="work" id="work" />
                                        <Label htmlFor="work">Work</Label>
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
        </div >
    );
};

export default Page;