import React from 'react'
import EditPromoPage from './_components/EditPromoPage'

interface IParams {
    promoId: string
}

function page({ params }: { params: IParams }) {
    return (
        <div>
            <EditPromoPage promoId={params.promoId} />
        </div>
    )
}

export default page