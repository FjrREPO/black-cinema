import React from 'react'
import Banner from './_components/Banner'
import getCurrentUser from './_actions/get-user'
import Navbar from '@/components/Navbar'
import { getAllMovies } from './_actions/get-all-movies'

async function Home() {
    const user = await getCurrentUser()
    const movies = await getAllMovies()

    return (
        <div>
            <Navbar user={user}/>
            <Banner movies={movies} currentUser={user}/>
        </div>
    )
}

export default Home