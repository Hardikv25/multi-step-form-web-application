'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { getFormData, setFormData } from '@/utils/formStorage';

type FormData = {
    fullName: string;
    email: string;
};


const Page = () => {
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>();

    const CATEGORY = 'Personal Information'
    const FORM_NAME = 'Basic Information'
    
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
                <h1 className="font-bold text-2xl">Basic Information</h1>
                <p className="text-gray-600">Personal Information</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <Label>
                            Full Name<span className="ml-[-4px] text-red-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Enter your full name"
                            {...register('fullName', { required: 'Full name is required' })}
                        />
                        {errors.fullName && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    <div className="my-4">
                        <Label>
                            Email<span className="ml-[-4px] text-red-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email format',
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
                            Previous
                        </Button>
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
