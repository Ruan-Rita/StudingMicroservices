// “use client”
import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from "react"
import useRequests from '../../hooks/use-request';
import Router from 'next/router';

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { doRequest, errors } = useRequests({
        url: '/api/user/signup',
        method: 'post',
        body: { email, password }
    })

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        const result = await doRequest().catch(() => false)
        if (result !== false) {
            Router.push('/')
        }
    }
    function catchError(data: any) {
        console.log('Receiviing ', data);

        Array.from(data.errors).forEach((item: any) => {
            toast.error('Error:' + item.message)
        })
    }
    return (
        <div className="w-full h-screen bg-fuchsia-100 flex items-center justify-center">
            <div className="w-full max-w-xs">
                <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="mb-5 text-2xl text-gray-900 text-center font-bold">Create Account</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            E-mail
                        </label>
                        <input required onChange={value => setEmail(value.target.value)} value={email} name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="e-mail" type="email" placeholder="e-mail" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input required onChange={value => setPassword(value.target.value)} value={password} name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div>
                        {errors && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 mb-6  py-3 rounded relative" role="alert">
                                <strong className="font-bold">Ooops....</strong>
                                <ul>
                                    {errors.response.data.errors.map(message => (
                                        <li className="block sm:inline">{message.message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Signup
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/auth/login">
                            Sign in
                        </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Acme Corp. All rights reserved.
                </p>
            </div>
            <Toaster position='top-right' />
        </div>
    )
} 