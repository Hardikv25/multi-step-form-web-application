'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type FormData = {
    gender: string
    ageGroup: string
};

const Page = () => {
    const [submitted, setSubmitted] = useState(false);
    const [mounted, setMounted] = useState(false);

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm<FormData>();

    useEffect(() => {
        const savedData = localStorage.getItem('formData2');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setValue('gender', parsedData.gender);
            setValue('ageGroup', parsedData.ageGroup);
            setSubmitted(true);
        }
        setMounted(true);
    }, [setValue]);

    const onSubmit = (data: FormData) => {
        localStorage.setItem('formData2', JSON.stringify(data));
        setSubmitted(true);
    };

    if (!mounted) return null;

    return (
        <div className="shadow-2xl rounded-xl bg-white sm:m-4 p-4 sm:p-6">
            <div className="my-8">
                <h1 className="font-bold text-2xl">Demographics</h1>
                <p className="text-gray-600">Personal Information</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <Label>Gender<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Controller
                            name="gender"
                            control={control}
                            rules={{ required: 'Gender is required' }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.gender && (
                            <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
                        )}
                    </div>

                    <div className="my-4">
                        <Label>Age Group<span className="ml-[-4px] text-red-500">*</span></Label>
                        <Controller
                            name="ageGroup"
                            control={control}
                            rules={{ required: 'Age group is required' }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an age group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="under18">Under 18</SelectItem>
                                        <SelectItem value="18-24">18-24</SelectItem>
                                        <SelectItem value="25-34">25-34</SelectItem>
                                        <SelectItem value="35-44">35-44</SelectItem>
                                        <SelectItem value="45-54">45-54</SelectItem>
                                        <SelectItem value="55+">55+</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.ageGroup && (
                            <p className="text-sm text-red-500 mt-1">{errors.ageGroup.message}</p>
                        )}
                    </div>

                    <div className="flex justify-between">
                        <Button type="button" className="border border-gray-300 py-5">
                            Previous
                        </Button>
                        {!submitted ? (
                            <Button type="submit" className="bg-gray-900 text-white py-5">
                                Complete
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                className="bg-gray-900 text-white py-5"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;