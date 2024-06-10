import React from 'react'
import ParallaxImage from './comp'

export default function page() {
    return (
        <div>
            <ParallaxImage imageUrl={'https://www.bworldonline.com/wp-content/uploads/2023/12/cinema.jpg'}/>
            <div style={{ height: '400vh' }}>Scroll down to see the effect</div>
        </div>
    )
}
