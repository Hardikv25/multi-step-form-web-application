'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type FormData = {
    phone: string
    phoneType: string
};

const Page = () => {
    const [submitted, setSubmitted] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        control,
    } = useForm<FormData>();

    useEffect(() => {
        const savedData = localStorage.getItem('formData5');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setValue('phone', parsedData.phone);
            setValue('phoneType', parsedData.phoneType);
            setSubmitted(true);
        }
        setMounted(true);
    }, [setValue]);

    const onSubmit = (data: FormData) => {
        localStorage.setItem('formData5', JSON.stringify(data));
        setSubmitted(true);
    };

    const onNext = (data: FormData) => {
        localStorage.setItem('formData5', JSON.stringify(data));
        setSubmitted(true);
        router.push(`/preferences/communication-pref`)
    };

    if (!mounted) return null;

    return (
        <div className="shadow-2xl rounded-xl bg-white sm:m-4 p-4 sm:p-6">
            <div className="my-8">
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
                    <div className="flex justify-between">
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