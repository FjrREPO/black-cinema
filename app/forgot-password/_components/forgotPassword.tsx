'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function ForgotPassword({ user }: { user: any }) {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
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

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password tidak sesuai',
            })
            return
        }

        const foundUser = user.find((us: any) => us.email === email);

        if (!foundUser) {
            Swal.fire({
                icon: 'error',
                title: 'Email tidak ditemuakan',
            });
            return;
        }

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword }),
            })

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Password has been reset, please login!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/signin'
                    }
                })
            } else {Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan',
                text: 'Gagal mengatur ulang kata sandi',
            })
                alert('')
            }
        } catch (error) {
            console.error('gagal mengatur ulang kata sandi', error)
            Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan',
                text: 'Terjadi kesalahan saat mengatur ulang kata sandi.',
            })
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Kamu sudah masuk!',
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
            <div className="max-w-screen-xl bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <img
                            src="https://res.cloudinary.com/dutlw7bko/image/upload/v1716618897/Cinema/Logo/Cuplikan_layar_2024-05-14_083355_jr8lu6_1_wc2vsh.png"
                            className="w-[80px] mx-auto"
                            alt=''
                        />
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold text-black">
                            Atur Ulang Kata Sandi
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <form onSubmit={handleSubmit}>
                                <div className="mx-auto text-black max-w-xs">
                                    <input
                                        className="mb-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <div className="relative mt-5">
                                        <input
                                            className="w-full px-8 py-4 text-black rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type={pass}
                                            placeholder="Masukkan password baru"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500'
                                            onClick={handleClickPass}
                                            name='newPassword'
                                        >
                                            {pass === 'password' ? <EyeOff /> : <Eye />}
                                        </button>
                                    </div>
                                    <div className="relative mt-5">
                                        <input
                                            className="w-full px-8 py-4 text-black rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type={passAcc}
                                            placeholder="Konfirmasi password baru"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500'
                                            onClick={handleClickPassAcc}
                                            name='confirmPassword'
                                        >
                                            {passAcc === 'password' ? <EyeOff /> : <Eye />}
                                        </button>
                                    </div>
                                    <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type='submit'
                                    >
                                        <span className="ml-3">
                                            Atur Ulang
                                        </span>
                                    </button>
                                    <Link href={"/signin"}>
                                        <button
                                            className="mt-5 tracking-wide font-semibold bg-white text-indigo-500 w-full py-4 rounded-lg border-2 border-indigo-500 hover:bg-gray-200 transition-all duration-200 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        >
                                            <span className="ml-3">
                                                Kembali
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex rounded-tr-lg rounded-br-lg">
                    <div
                        className="w-full bg-cover bg-center bg-no-repeat rounded-lg"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW92aWV8ZW58MHx8MHx8fDA%3D')" }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
