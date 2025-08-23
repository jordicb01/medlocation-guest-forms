'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormField, FormItem, FormMessage, FormLabel, FormControl } from '@/src/components/ui/form'
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Alert, AlertTitle } from '@/src/components/ui/alert'

import { signUpSchema, SignUpFormFields } from '@/types/auth/signUp'

import { OctagonAlert } from 'lucide-react'
import { authClient } from '@/src/lib/auth-client'

declare module 'better-auth' {
    interface AuthUserMetadata {
        firstName?: string;
        lastName?: string;
    }
}

const SignUpForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams();

    const [callbackUrl, setCallbackUrl] = useState<string>('');

    useEffect(() => {
        const url = searchParams.get("callbackUrl") || "";
        setCallbackUrl(url);
    }, [searchParams]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<SignUpFormFields>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    });

    // Abstract this away??
    const onSubmit = (data: SignUpFormFields) => {
        setIsLoading(true);
        setError(null);

        authClient.signUp.email({
            email: data.email,
            password: data.password,
            metadata: {
                firstName: data.firstName,
                lastName: data.lastName,
            },
        }, {
            onSuccess: () => {
                setIsLoading(false);
                router.push(`/${callbackUrl}`)
            },
            onError: ({ error }) => {
                setIsLoading(false);
                setError(error.message)
            }
        })
    }

    return (
        <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Welcome</h1>
                        <p className="text-muted-foreground text-balance">
                            Create your account
                        </p>
                    </div>

                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => {
                            return <FormItem className="grid gap-3">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=''
                                        type='text'
                                        className='border-gray-200'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => {
                            return <FormItem className="grid gap-3">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=''
                                        type='text'
                                        className='border-gray-200'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                            return <FormItem className="grid gap-3">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=''
                                        type='email'
                                        className='border-gray-200'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem className="grid gap-3">
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=""
                                        type="tel"
                                        className="border-gray-200"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => {
                            return <FormItem className="grid gap-3">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=''
                                        type='password'
                                        className='border-gray-200'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => {
                            return <FormItem className="grid gap-3">
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=''
                                        type='password'
                                        className='border-gray-200'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                    {!!error && (
                        <Alert className='bg-destructive/10 border-none !text-destructive'>
                            <OctagonAlert className='h-4 w-4' />
                            <AlertTitle>
                                {error}
                            </AlertTitle>
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        Sign Up
                    </Button>q
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a href="/sign-in" className="underline underline-offset-4">
                            Sign in
                        </a>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default SignUpForm