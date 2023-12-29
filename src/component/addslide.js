// addvertisement slide
import React from "react";
import myImage from './bg.jpg';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Autoplay, Pagination} from "swiper";

export default function Slide() {
  return (
    <div className='bg-slate-100 p-2'>
      <br/>
      <br/>
      <br/>
      <br/>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination]}
        className="w-full"
      >
        <SwiperSlide>
            <img
            src={myImage}
            className=" w-full h-[8vh] rounded-lg "
            alt="..." />
        </SwiperSlide>
        <SwiperSlide>
            <img
            src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
            className=" w-full h-[8vh] rounded-lg"
            alt="..." />
        </SwiperSlide>
        <SwiperSlide>
            <img
            src={myImage}
            className=" w-full h-[8vh] rounded-lg"
            alt="..." />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
