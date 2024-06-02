import { Autoplay, Pagination } from "swiper/modules"
import { SwiperSlide, Swiper } from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';

function Advertisement() {
    return (
        <div className="w-full h-full flex justify-center items-center py-10">
            <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{
                    clickable: true,
                }}
                slidesPerView={1}
                autoplay={{ delay: 8000, disableOnInteraction: false }}
                effect={'slide'}
                className="w-full h-full mySwiper"
            >
                <SwiperSlide>
                    <div className="flex justify-center items-center h-full w-full">
                        <img src="https://thumbs.dreamstime.com/b/advertising-word-cloud-business-concept-56936998.jpg" alt="" className="w-[50vw] max-h-full rounded-lg cursor-pointer" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex justify-center items-center h-full w-full">
                        <img src="https://www.marketing91.com/wp-content/uploads/2020/02/Introduction-to-Image-Advertising.jpg" alt="" className="w-[50vw] max-h-full rounded-lg cursor-pointer" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

    )
}

export default Advertisement