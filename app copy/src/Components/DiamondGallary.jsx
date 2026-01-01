import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Thumbs, Navigation, Pagination } from "swiper/modules";
import { GlobleVal } from "../Hooks/GlobleVal"
const { DefaultImageUrl } = GlobleVal()

const DiamondGallary = ({ diamondData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className="relative ">
        <Swiper
          speed={800}
          spaceBetween={10}
          loop={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          navigation={true}
          modules={[FreeMode, Thumbs, Navigation, Pagination]}
          className="mySwiper2"
        >
          {diamondData.diamondVideo && (
            <SwiperSlide>
              <iframe
                key={Math.random()}
                src={diamondData.diamondVideo}
                className="w-full h-[440px] sm:h-[750px] md:h-[550px]"
              ></iframe>
            </SwiperSlide>
          )}

          <SwiperSlide className="unset-img1 bg-[#f3f3f3] !relative">
            <img
              src={
                diamondData?.diamondImage
                  ? diamondData.diamondImage
                  : `${DefaultImageUrl}/sample_${diamondData.shape.toLowerCase()}.jpg`
              }
              alt={diamondData.Shape}
              fill
              className="!relative !h-auto mix-blend-multiply m-auto"
              unoptimized
            />
            {!diamondData.ImageB && (
              <p className="absolute !text-white font-medium bottom-0 w-full text-center text-xs sm:text-xl z-10 my-5">
                This is a sample image
              </p>
            )}
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="my-10 mx-auto w-full">
        <Swiper
          speed={800}
          onSwiper={setThumbsSwiper}
          spaceBetween={5}
          className="mySwiper active thumb-swipe"
        >
          {diamondData.diamondVideo && (
            <SwiperSlide className="!h-auto !w-[70px] unset-img1 ">
              <img
                src={`${DefaultImageUrl}/360-video-icon.png`}
                alt="360 Icon"
                fill
                className="!relative !h-auto"
              />
            </SwiperSlide>
          )}
          <SwiperSlide className="!h-auto !w-[70px] unset-img1 bg-[#f3f3f3] ">
            <img
              src={
                diamondData?.diamondImage
                  ? diamondData.diamondImage
                  : `${DefaultImageUrl}/sample_${(diamondData.shape).toLowerCase()}.jpg`
              }
              alt={diamondData.shape}
              fill
              className="!relative !h-auto mix-blend-multiply"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default DiamondGallary;