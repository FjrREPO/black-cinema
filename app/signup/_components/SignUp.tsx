'use client'

import { Eye, EyeOff, UserRound } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Image from 'next/image'

function SignUp({ user }: { user: any }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [pass, setPass] = useState('password')
    const { status } = useSession();

    const handleClickPass = (e: any) => {
        e.preventDefault()
        setPass(pass === 'password' ? 'text' : 'password')
    }
    const [passAcc, setPassAcc] = useState('password')

    const handleClickPassAcc = (e: any) => {
        e.preventDefault()
        setPassAcc(passAcc === 'password' ? 'text' : 'password')
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password tidak cocok',
            })
            return
        }

        const foundUser = user.find((us: any) => us.email === email);

        if (foundUser) {
            Swal.fire({
                icon: 'error',
                title: 'Email sudah terdaftar',
            });
            return;
        }

        try {
            const userData = { name, email, password, image: 'https://res.cloudinary.com/dutlw7bko/image/upload/v1716881679/Cinema/Logo/placeholder-login_dxhgb2.jpg', role: 'user' }

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Akun berhasil dibuat, silahkan login!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/signin'
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Gagal mendaftarkan pengguna!',
                })

            }
        } catch (error) {
            console.error('Error saat mendaftarkan pengguna:', error)
 
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Anda telah login!',
                showCancelButton: false,
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/';
                }
            });
        }
    }, [status]);

    return (
        <div className='flex min-h-screen justify-center items-center backdrop-blur-md'>
            <div
                className="max-w-screen-xl bg-white shadow sm:rounded-lg flex justify-center flex-1"
            >
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <Image width={100} height={100}
                            src="https://res.cloudinary.com/dutlw7bko/image/upload/v1716618897/Cinema/Logo/Cuplikan_layar_2024-05-14_083355_jr8lu6_1_wc2vsh.png "
                            className="w-[80px]  mx-auto"
                            alt=''
                        />
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold text-black">
                            Daftar
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center">
                                <button
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                                    onClick={() => signIn('google')}
                                >
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4"
                                            />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853"
                                            />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04"
                                            />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335"
                                            />
                                        </svg>
                                    </div>
                                    <span className="ml-4">
                                        Daftar Dengan Google
                                    </span>
                                </button>
                            </div>

                            <div className="my-4 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-500 tracking-wide font-medium bg-white transform translate-y-1/2"
                                >
                                    Atau Daftar Dengan e-mail
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>

                                <div className="mx-auto text-black max-w-xs">
                                    <input
                                        className="mb-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="name"
                                        placeholder="Masukkan Nama"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="relative mt-5">
                                        <input
                                            className="w-full px-8 py-4 text-black rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type={pass}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500'
                                            onClick={handleClickPass}
                                            name='password'
                                        >
                                            {pass === 'password' ? <EyeOff /> : <Eye />}
                                        </button>
                                    </div>
                                    <div className="relative mt-5">
                                        <input
                                            className="w-full px-8 py-4 text-black rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type={passAcc}
                                            placeholder="Konfirmasi password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <button
                                            className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500'
                                            onClick={handleClickPassAcc}
                                            name='passwordAcc'
                                        >
                                            {passAcc === 'password' ? <EyeOff /> : <Eye />}
                                        </button>
                                    </div>
                                    <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type='submit'
                                    >
                                        <UserRound />
                                        <span className="ml-3">
                                            Daftar
                                        </span>
                                    </button>
                                    <Link href={"/signin"}>
                                        <button
                                            className="mt-5 tracking-wide font-semibold bg-white text-indigo-500 w-full py-4 rounded-lg border-2 border-indigo-500 hover:bg-gray-200 transition-all duration-200 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        >
                                            <UserRound />
                                            <span className="ml-3">
                                                Masuk
                                            </span>
                                        </button>
                                    </Link>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        Saya setuju untuk mematuhi Ketentuan
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            Layanan Binema
                                        </a>
                                        Dan
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            Kebijakan Privasinya
                                        </a>
                                    </p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex rounded-tr-lg rounded-br-lg">
                    <div
                        className="w-full bg-cover bg-center bg-no-repeat rounded=lg"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW92aWV8ZW58MHx8MHx8fDA%3D')" }}
                    ></div>
                </div>
            </div>
        </div >
    )
}

export default SignUp