'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

type FormData = {
    address: string
    city: string
    zip:string
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
    } = useForm<FormData>();

    useEffect(() => {
        const savedData = localStorage.getItem('formData4');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setValue('address', parsedData.address);
            setValue('city', parsedData.city);
            setValue('zip',parsedData.zip);
            setSubmitted(true);
        }
        setMounted(true);
    }, [setValue]);

    const onSubmit = (data: FormData) => {
        localStorage.setItem('formData4', JSON.stringify(data));
        setSubmitted(true);
    };

    const onNext = (data: FormData) => {
        localStorage.setItem('formData4', JSON.stringify(data));
        setSubmitted(true);
        router.push(`/contact-info/phone-info`)
    };

    if (!mounted) return null;

    return (
        <div className="shadow-2xl rounded-xl bg-white sm:m-4 p-4 sm:p-6">
            <div className="my-8">
                <h1 className="font-bold text-2xl">Address Information</h1>
                <p className="text-gray-600">Contact Details</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <Label>Street Address<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Input
                            type="text"
                            placeholder="Enter your street address"
                            {...register('address', { required: 'Street Address is required' })}
                        />
                        {errors.address && (
                            <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
                        )}
                    </div>
                    <div className="my-4">
                        <Label>City<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Input
                            type="text"
                            placeholder="Enter your city"
                            {...register('city', { required: 'City is required' })}
                        />
                        {errors.city && (
                            <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
                        )}
                    </div>
                    <div className="my-4">
                        <Label>Zip Code<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Input
                            type="text"
                            placeholder="Enter your zip code"
                            {...register('zip', {
                                required: 'Zip Code is required',
                                pattern: {
                                    value: /^\d{6}$/,
                                    message: 'Zip Code must be exactly 6 digits',
                                },
                            })}
                        />
                        {errors.zip && (
                            <p className="text-sm text-red-500 mt-1">{errors.zip.message}</p>
                        )}
                    </div>

                    <div className="flex justify-between">
                        <Link href={'/personal-info/education-info'}>
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