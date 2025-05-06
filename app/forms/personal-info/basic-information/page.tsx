'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';

type FormData = {
    fullName: string;
    email: string;
};

const Page = () => {
    const [submitted, setSubmitted] = useState(false);
    const [mounted, setMounted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>();

    useEffect(() => {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setValue('fullName', parsedData.fullName);
            setValue('email', parsedData.email);
            setSubmitted(true);
        }
        setMounted(true);
    }, [setValue]);

    const onSubmit = (data: FormData) => {
        localStorage.setItem('formData', JSON.stringify(data));
        setSubmitted(true);
    };

    if (!mounted) return null; // Prevent SSR mismatch

    return (
        <div className="shadow-2xl rounded-xl bg-white sm:m-4 p-4 sm:p-6">
            <div className="my-8">
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

                    <div className="flex justify-between">
                        <Button disabled className="border border-gray-300 py-5">
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




// 'use client'

// import { Button } from '@/Components/ui/button'
// import { Input } from '@/Components/ui/input'
// import { Label } from '@/Components/ui/label'
// import { useEffect, useState } from 'react'
// import { useForm, Controller } from 'react-hook-form'
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/Components/ui/select"
// import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
// import { Checkbox } from '@/Components/ui/checkbox'
// import StepNavigation from './step-button'

// type FormData = {
//     fullName: string
//     email: string
//     gender: string
//     ageGroup: string
//     address: string
//     city: string
//     zip: string
//     phone: string
//     phoneType: string
//     contactType: string
//     terms: boolean
// }

// export default function StepForm() {
//     const [step, setStep] = useState(1)
//     const [submitted, setSubmitted] = useState(false)

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         control,
//         formState: { errors },
//     } = useForm<FormData>()

//     useEffect(() => {
//         const storedData = JSON.parse(localStorage.getItem('stepData') || '{}')
//         Object.keys(storedData).forEach((key) => {
//             setValue(key as keyof FormData, storedData[key])
//         })

//         const completedSteps = new Set(JSON.parse(localStorage.getItem('completedSteps') || '[]'))
//         let targetStep = 6
//         for (let i = 1; i <= 6; i++) {
//             if (!completedSteps.has(`${i}`)) {
//                 targetStep = i
//                 break
//             }
//         }
//         setStep(targetStep)

//         const wasSubmitted = localStorage.getItem('isSubmitted') === 'true'
//         if (wasSubmitted) {
//             setSubmitted(true)
//         }
//     }, [setValue])

//     const saveStepData = (data: Partial<FormData>) => {
//         const storedData = JSON.parse(localStorage.getItem('stepData') || '{}')
//         const updatedData = { ...storedData, ...data }
//         localStorage.setItem('stepData', JSON.stringify(updatedData))

//         const completedSteps = new Set(JSON.parse(localStorage.getItem('completedSteps') || '[]'))
//         completedSteps.add(`${step}`)
//         localStorage.setItem('completedSteps', JSON.stringify([...completedSteps]))
//     }

//     const onSubmit = (data: FormData) => {
//         saveStepData(data)
//         if (step === 6) {
//             const finalData = JSON.parse(localStorage.getItem('stepData') || '{}')
//             console.log('Final submission:', finalData)
//             localStorage.setItem('isSubmitted', 'true')
//             setSubmitted(true)
//         } else {
//             setSubmitted(true)
//         }
//     }

//     const goToNextStep = () => {
//         setStep((prev) => prev + 1)
//         setSubmitted(false)
//     }

//     const goToPreviousStep = () => {
//         setStep((prev) => prev - 1)
//         setSubmitted(false)
//     }

//     return (
//         <div className="shadow-xs rounded-xl bg-white sm:m-4 p-4 sm:p-6">
//             <StepNavigation currentStep={step} setStep={setStep} />
//             <div className="my-8">
//                 <p className="text-sm text-gray-500">Step {step} of 6</p>
//                 {step === 1 && (
//                     <>
//                         <h1 className="font-bold text-2xl">Basic Information</h1>
//                         <p className="text-gray-600">Personal Information</p>

//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className="my-4">
//                                 <Label>Full Name<span className="ml-[-4px] text-red-500">*</span></Label>
//                                 <Input
//                                     type="text"
//                                     placeholder="Enter your full name"
//                                     {...register('fullName', { required: 'Full name is required' })}
//                                 />
//                                 {errors.fullName && (
//                                     <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
//                                 )}
//                             </div>

//                             <div className="my-4">
//                                 <Label>Email<span className="ml-[-4px] text-red-500">*</span></Label>
//                                 <Input
//                                     type="text"
//                                     placeholder="Enter your email"
//                                     {...register('email', {
//                                         required: 'Email is required',
//                                         pattern: {
//                                             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                                             message: 'Invalid email format',
//                                         },
//                                     })}
//                                 />
//                                 {errors.email && (
//                                     <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
//                                 )}
//                             </div>
//                             <div className="flex justify-between">
//                                 <Button disabled className="border border-gray-300 py-5">Previous</Button>
//                                 {!submitted ? (
//                                     <Button type="submit" className="bg-gray-900 text-white py-5">Complete</Button>
//                                 ) : (
//                                     <Button type="button" onClick={goToNextStep} className="bg-gray-900 text-white py-5">Next</Button>
//                                 )}
//                             </div>
//                         </form>
//                     </>
//                 )}
//                 {step === 2 && (
//                     <>
//                         <h1 className="font-bold text-2xl">Demographics</h1>
//                         <p className="text-gray-600">Personal Information</p>

//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className="my-4">
//                                 <Label>Gender<span className="ml-[-4px] text-red-500">*</span></Label>
//                                 <Controller
//                                     name="gender"
//                                     control={control}
//                                     rules={{ required: 'Gender is required' }}
//                                     render={({ field }) => (
//                                         <Select onValueChange={field.onChange} value={field.value}>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select a gender" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="male">Male</SelectItem>
//                                                 <SelectItem value="female">Female</SelectItem>
//                                                 <SelectItem value="other">Other</SelectItem>
//                                             </SelectContent>
//                                         </Select>
//                                     )}
//                                 />
//                                 {errors.gender && (
//                                     <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
//                                 )}
//                             </div>

//                             <div className="my-4">
//                                 <Label>Age Group<span className="ml-[-4px] text-red-500">*</span></Label>
//                                 <Controller
//                                     name="ageGroup"
//                                     control={control}
//                                     rules={{ required: 'Age group is required' }}
//                                     render={({ field }) => (
//                                         <Select onValueChange={field.onChange} value={field.value}>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select an age group" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="under18">Under 18</SelectItem>
//                                                 <SelectItem value="18-24">18-24</SelectItem>
//                                                 <SelectItem value="25-34">25-34</SelectItem>
//                                                 <SelectItem value="35-44">35-44</SelectItem>
//                                                 <SelectItem value="45-54">45-54</SelectItem>
//                                                 <SelectItem value="55+">55+</SelectItem>
//                                             </SelectContent>
//                                         </Select>
//                                     )}
//                                 />
//                                 {errors.ageGroup && (
//                                     <p className="text-sm text-red-500 mt-1">{errors.ageGroup.message}</p>
//                                 )}
//                             </div>

//                             <div className="flex justify-between">
//                                 <Button type="button" onClick={goToPreviousStep} className="border border-gray-300 py-5">
//                                     Previous
//                                 </Button>
//                                 {!submitted ? (
//                                     <Button type="submit" className="bg-gray-900 text-white py-5">Complete</Button>
//                                 ) : (
//                                     <Button type="button" onClick={goToNextStep} className="bg-gray-900 text-white py-5">Next</Button>
//                                 )}
//                             </div>
//                         </form>
//                     </>
//                 )}
//                 {step === 3 && (
//                     <>
//                         <h1 className="font-bold text-2xl">Address Information</h1>
//                         <p className="text-gray-600">Contact Details</p>

//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className="my-4">
//                                 <Label>Street Address<span className="ml-[-4px] text-red-500">*</span></Label>
//                                 <Input
//                                     type="text"
//                                     placeholder="Enter your street address"
//                                     {...register('address', { required: 'Street Address is required' })}
//                                 />
//                                 {errors.address && (
//                                     <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
//                                 )}
//                             </div>
//                             <div className="my-4">
//                                 <Label>City<span className="ml-[-4px] text-red-500">*</span></Label>
//                                 <Input
//                                     type="text"
//                                     placeholder="Enter your city"
//                                     {...register('city', { required: 'City is required' })}
//                                 />
//                                 {errors.city && (
//                                     <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
//                                 )}
//                             </div>
//                             <div className="my-4">
//                                 <Label>Zip Code<span className="ml-[-4px] text-red-500">*</span></Label>
//                                 <Input
//                                     type="text"
//                                     placeholder="Enter your zip code"
//                                     {...register('zip', {
//                                         required: 'Zip Code is required',
//                                         pattern: {
//                                             value: /^\d{6}$/,
//                                             message: 'Zip Code must be exactly 6 digits',
//                                         },
//                                     })}
//                                 />
//                                 {errors.zip && (
//                                     <p className="text-sm text-red-500 mt-1">{errors.zip.message}</p>
//                                 )}
//                             </div>

//                             <div className="flex justify-between">
//                                 <Button type="button" onClick={goToPreviousStep} className="border border-gray-300 py-5">
//                                     Previous
//                                 </Button>
//                                 {!submitted ? (
//                                     <Button type="submit" className="bg-gray-900 text-white py-5">Complete</Button>
//                                 ) : (
//                                     <Button type="button" onClick={goToNextStep} className="bg-gray-900 text-white py-5">Next</Button>
//                                 )}
//                             </div>
//                         </form>
//                     </>
//                 )}
//                 {step === 4 && (
//                     <>
//                         <h1 className="font-bold text-2xl">Phone Information</h1>
//                         <p className="text-gray-600">Contact Details</p>

//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className="my-4">
//                                 <Label>Phone Number<span className="ml-[-4px] text-red-500">*</span></Label>
//                                 <Input
//                                     type="text"
//                                     placeholder="Enter your Phone number"
//                                     {...register('phone', {
//                                         required: 'Phone Number is required',
//                                         minLength: {
//                                             value: 10,
//                                             message: 'Phone Number Must be 10 digit'
//                                         }
//                                     })}
//                                 />
//                                 {errors.phone && (
//                                     <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
//                                 )}
//                             </div>
//                             <div className="my-4">
//                                 <Label>Phone type<span className="ml-[-4px] text-red-500">*</span></Label>
//                                 <Controller
//                                     name="phoneType"
//                                     control={control}
//                                     rules={{ required: "Phone type is required" }}
//                                     defaultValue="mobile"
//                                     render={({ field }) => (
//                                         <RadioGroup onValueChange={field.onChange} value={field.value}>
//                                             <div className="flex items-center space-x-2">
//                                                 <RadioGroupItem value="mobile" id="mobile" />
//                                                 <Label htmlFor="mobile">Mobile</Label>
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                                 <RadioGroupItem value="home" id="home" />
//                                                 <Label htmlFor="home">Home</Label>
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                                 <RadioGroupItem value="work" id="work" />
//                                                 <Label htmlFor="work">Work</Label>
//                                             </div>
//                                         </RadioGroup>
//                                     )}
//                                 />

//                                 {errors.phoneType && (
//                                     <p className="text-sm text-red-500 mt-1">{errors.phoneType.message}</p>
//                                 )}
//                             </div>

//                             <div className="flex justify-between">
//                                 <Button type="button" onClick={goToPreviousStep} className="border border-gray-300 py-5">Previous</Button>
//                                 {!submitted ? (
//                                     <Button type="submit" className="bg-gray-900 text-white py-5">Complete</Button>
//                                 ) : (
//                                     <Button type="button" onClick={goToNextStep} className="bg-gray-900 text-white py-5">Next</Button>
//                                 )}
//                             </div>
//                         </form>
//                     </>
//                 )}
//                 {step === 5 && (
//                     <>
//                         <h1 className="font-bold text-2xl">Communication Preferences</h1>
//                         <p className="text-gray-600">Preferences</p>

//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className="my-4">
//                                 <Label>Preferred Contact Method<span className="ml-[-4px] text-red-500">*</span></Label>
//                                 <Controller
//                                     name="contactType"
//                                     control={control}
//                                     rules={{ required: "Preferred Contact Method is required" }}
//                                     defaultValue="Email"
//                                     render={({ field }) => (
//                                         <RadioGroup onValueChange={field.onChange} value={field.value}>
//                                             <div className="flex items-center space-x-2">
//                                                 <RadioGroupItem value="Email" id="Email" />
//                                                 <Label htmlFor="Email">Email</Label>
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                                 <RadioGroupItem value="Phone" id="Phone" />
//                                                 <Label htmlFor="Phone">Phone</Label>
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                                 <RadioGroupItem value="Mail" id="Mail" />
//                                                 <Label htmlFor="Mail">Mail</Label>
//                                             </div>
//                                         </RadioGroup>
//                                     )}
//                                 />
//                                 {errors.contactType && (
//                                     <p className="text-sm text-red-500 mt-1">{errors.contactType.message}</p>
//                                 )}
//                             </div>
//                             <div className="flex justify-between">
//                                 <Button type="button" onClick={goToPreviousStep} className="border border-gray-300 py-5">Previous</Button>
//                                 {!submitted ? (
//                                     <Button type="submit" className="bg-gray-900 text-white py-5">Complete</Button>
//                                 ) : (
//                                     <Button type="button" onClick={goToNextStep} className="bg-gray-900 text-white py-5">Next</Button>
//                                 )}
//                             </div>
//                         </form>
//                     </>
//                 )}
//                 {step === 6 && (
//                     <>
//                         <h1 className="font-bold text-2xl">Terms and Conditions</h1>
//                         <p className="text-gray-600">Preferences</p>

//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className="my-4">
//                                 <div className="flex items-center space-x-2">
//                                     <Controller
//                                         name="terms"
//                                         control={control}
//                                         rules={{ required: "You must accept the terms and conditions" }}
//                                         render={({ field }) => (
//                                             <Checkbox
//                                                 id="terms"
//                                                 checked={field.value}
//                                                 onCheckedChange={field.onChange}
//                                             />
//                                         )}
//                                     />
//                                     <Label htmlFor="terms">I agree to the terms and conditions</Label>
//                                 </div>
//                                 {errors.terms && (
//                                     <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>
//                                 )}
//                             </div>

//                             <div className="flex justify-between">
//                                 <Button type="button" onClick={goToPreviousStep} className="border border-gray-300 py-5">
//                                     Previous
//                                 </Button>
//                                 <Button type="submit" className="bg-green-600 text-white py-5">
//                                     Submit All
//                                 </Button>
//                             </div>
//                         </form>
//                     </>
//                 )}

//                 {submitted && step === 6 && (
//                     <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
//                         <h2 className="font-bold text-lg text-green-800">Thank you!</h2>
//                         <p className="text-green-700">Your form has been submitted successfully.</p>
//                     </div>
//                 )}

//             </div>
//         </div>
//     )
// }
