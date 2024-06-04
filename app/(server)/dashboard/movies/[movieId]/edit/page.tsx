import React from 'react'
import EditMoviePage from './_components/EditMoviePage'

interface IParams {
  movieId: string
}

function page({ params }: { params: IParams }) {
  return (
    <div>
      <EditMoviePage movieId={params.movieId} />
    </div>
  )
}

export default page