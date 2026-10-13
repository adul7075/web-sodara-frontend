'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useState } from 'react'
import Header from '@/app/(app)/Header'
import { useRole } from '@/hooks/useRole'

const Pelanggan = () => {
	const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
	const user = useRole(['admin'])

    const submitForm = event => {
        event.preventDefault()

        console.log({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
           
        })
		alert('ok')
    }
	
	if (!user) return null
	
    return (
        <>
            <Header title="Pelanggan" />
            <div className="py-4 ml-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You are logged in!
                        </div>
                    </div>
                </div>
            </div>
			
			<form onSubmit={submitForm}>
            {/* Name */}
            <div className="mt-4 ml-12">
                <Label htmlFor="name" className="mt-4 ml-12">Name</Label>

                <Input
                    id="name"
                    type="text"
                    value={name}
                    className="block mt-1 w-1/2 ml-12"
                    onChange={event => setName(event.target.value)}
                    required
                    autoFocus
                />

                <InputError messages={errors.name} className="mt-2" />
            </div>

            {/* Email Address */}
            <div className="mt-4 ml-12">
                <Label htmlFor="email" className="mt-4 ml-12">Email</Label>

                <Input
                    id="email"
                    type="email"
                    value={email}
                    className="block mt-1 w-1/2 ml-12"
                    onChange={event => setEmail(event.target.value)}
                    required
                />

                <InputError messages={errors.email} className="mt-2" />
            </div>

            {/* Password */}
            <div className="mt-4 ml-12">
                <Label htmlFor="password" className="mt-4 ml-12">Password</Label>

                <Input
                    id="password"
                    type="password"
                    value={password}
                    className="block mt-1 w-1/2 ml-12"
                    onChange={event => setPassword(event.target.value)}
                    required
                    autoComplete="new-password"
                />

                <InputError messages={errors.password} className="mt-2" />
            </div>

            {/* Confirm Password */}
            <div className="mt-4 ml-12">
                <Label htmlFor="passwordConfirmation" className="mt-4 ml-12">
                    Confirm Password
                </Label>

                <Input
                    id="passwordConfirmation"
                    type="password"
                    value={passwordConfirmation}
                    className="block mt-1 w-1/2 ml-12"
                    onChange={event =>
                        setPasswordConfirmation(event.target.value)
                    }
                    required
                />

                <InputError
                    messages={errors.password_confirmation}
                    className="mt-2"
                />
            </div>

            <div className="flex items-center justify-end mt-4">
                <Link
                    href="/login"
                    className="underline text-sm text-gray-600 hover:text-gray-900">
                    Already registered?
                </Link>

                <Button className="ml-4">Register</Button>
            </div>
        </form>
			
        </>
    )
}

export default Pelanggan