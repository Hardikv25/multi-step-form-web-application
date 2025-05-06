'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, useFieldArray } from 'react-hook-form';
import { Label } from '@/components/ui/label';

type Education = {
    degree: string;
    startDate: string;
    endDate: string;
    percentage: string;
};

type FormData = {
    education: Education[];
};

const Page = () => {
    const [submitted, setSubmitted] = useState(false);
    const [mounted, setMounted] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>({
        defaultValues: {
            education: [{ degree: '', startDate: '', endDate: '', percentage: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'education',
    });

    useEffect(() => {
        const savedData = localStorage.getItem('formData3');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setValue('education', parsedData.education);
            setSubmitted(true);
        }
        setMounted(true);
    }, [setValue]);

    const onSubmit = (data: FormData) => {
        localStorage.setItem('formData3', JSON.stringify(data));
        setSubmitted(true);
    };

    if (!mounted) return null; // Prevent SSR mismatch

    return (
        <div className="shadow-2xl rounded-xl bg-white sm:m-4 p-4 sm:p-6">
            <div className="my-8">
                <h1 className="font-bold text-2xl">Education Qualification</h1>
                <p className="text-gray-600">Please provide your education details</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-4 border p-4 rounded-lg shadow-sm mb-4">
                            <div className='grid grid-cols-2'>
                                <div className='col-span-1'>
                                    <Label>Degree</Label>
                                    <Input
                                        type="text"
                                        placeholder="e.g. B.Tech"
                                        {...register(`education.${index}.degree`, {
                                            required: 'Degree is required',
                                        })}
                                    />
                                    {errors.education?.[index]?.degree && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.education[index].degree?.message}
                                        </p>
                                    )}
                                </div>
                                <div className='col-span-1'>
                                    <Label>Percentage</Label>
                                    <Input
                                        type="text"
                                        placeholder="e.g. 75%"
                                        {...register(`education.${index}.percentage`, {
                                            required: 'Percentage is required',
                                        })}
                                    />
                                    {errors.education?.[index]?.percentage && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.education[index].percentage?.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className='flex flex-wrap w-full gap-4'>
                                <div className=''>
                                    <Label>Start Date</Label>
                                    <Input
                                        type="date"
                                        {...register(`education.${index}.startDate`, {
                                            required: 'Start date is required',
                                        })}
                                    />
                                    {errors.education?.[index]?.startDate && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.education[index].startDate?.message}
                                        </p>
                                    )}
                                </div>

                                <div className=''>
                                    <Label>End Date</Label>
                                    <Input
                                        type="date"
                                        {...register(`education.${index}.endDate`, {
                                            required: 'End date is required',
                                        })}
                                    />
                                    {errors.education?.[index]?.endDate && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.education[index].endDate?.message}
                                        </p>
                                    )}
                                </div>
                            </div>


                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => remove(index)}
                                className="mt-2"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}

                    <Button
                        type="button"
                        onClick={() => append({ degree: '', startDate: '', endDate: '', percentage: '' })}
                    >
                        Add Another Degree
                    </Button>

                    <div className="flex justify-between mt-6">
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
