import React from 'react'
import Cart from './_components/Cart'
import { getAllPayment } from '@/app/_actions/get-all-payment'
import { getAllPaymentPromo } from '@/app/_actions/get-all-payment-promo'
import { getAllMovies } from '@/app/_actions/get-all-movies'
import Navbar from '@/components/Navbar'
import getCurrentUser from '@/app/_actions/get-user'

async function page() {
    const payment = await getAllPayment()
    const movie = await getAllMovies()
    const paymentPromo = await getAllPaymentPromo()
    const user = await getCurrentUser()

    if (!payment || !movie || !paymentPromo) {
        return null
    }

    return (
        <div>
            <Navbar user={user} />
            <Cart payment={payment} movie={movie} paymentPromo={paymentPromo} />
        </div>
    )
}

export default page