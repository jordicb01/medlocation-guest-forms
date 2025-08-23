'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormField, FormItem, FormMessage, FormLabel, FormControl } from '@/src/components/ui/form'
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Alert, AlertTitle } from '@/src/components/ui/alert'

import { signInSchema, SignInFormFields } from '@/types/auth/signIn'

import { OctagonAlert } from 'lucide-react'
import { authClient } from '@/src/lib/auth-client'

const SignInForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams();

    const [callbackUrl, setCallbackUrl] = useState<string>('');

    useEffect(() => {
        const url = searchParams.get("callbackUrl") || "";
        setCallbackUrl(url);
    }, [searchParams]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<SignInFormFields>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    // Abstract this away??
    const onSubmit = (data: SignInFormFields) => {
        setIsLoading(true);
        setError(null);

        authClient.signIn.email({
            email: data.email,
            password: data.password
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
                        <h1 className="text-2xl font-bold">Welcome back</h1>
                        <p className="text-muted-foreground text-balance">
                            Login to your account
                        </p>
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                            return <FormItem className="grid gap-3">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='example@vernetica.com'
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
                        name="password"
                        render={({ field }) => {
                            return <FormItem className="grid gap-3">
                                <div className="flex items-center">
                                    <FormLabel>Password</FormLabel>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
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
                        Sign In
                    </Button>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                            Or continue with
                        </span>
                    </div>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a href="/sign-up" className="underline underline-offset-4">
                            Sign up
                        </a>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default SignInForm