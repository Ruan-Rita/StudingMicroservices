// “use client”
import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from "react"

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        console.log({ email, password });
        const result = await fetch('/api/user/signup', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ email, password })
        }).then((res: any) => {
            if (!res.ok) {
                return res.text().then((text: any) => { throw new Error(text) })
            }
            else {
                return res.json();
            }
        }).catch(err => {
            const data = err
            console.log('caught it!', typeof data, 'asdasdasd');
            toast.error('Ops errors: ', data.errors[0].message)
        });
        // if (response.status === 201) {
        //     toast.success("Success account created !!")
        // } else {
        // }
        console.log('Result', result);

    }

    return (
        <div className="w-full h-screen bg-fuchsia-100 flex items-center justify-center">
            <div className="w-full max-w-xs">
                <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            email
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
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Signup
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
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