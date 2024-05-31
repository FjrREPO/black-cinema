import React from 'react'
import Banner from './_components/Banner'
import getCurrentUser from './_actions/get-user'
import Navbar from '@/components/Navbar'
import { getAllMovies } from './_actions/get-all-movies'
import { getAllPayment } from './_actions/get-all-payment'

async function Home() {
    const user = await getCurrentUser()
    const movies = await getAllMovies()
    const payment = await getAllPayment()

    console.log('payment = ', payment)

    return (
        <div>
            <Navbar user={user} payment={payment} />
            <Banner movies={movies} currentUser={user}/>
        </div>
    )
}

export default Home