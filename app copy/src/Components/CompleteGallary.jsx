import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Thumbs, Navigation, Pagination } from "swiper/modules";
import { GlobleVal } from "../Hooks/GlobleVal"
const { DefaultImageUrl } = GlobleVal()

const CompleteGallary = ({ ringData }) => {
  
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
          {ringData.product && ringData.product.product.images.nodes.map((image,i) => <SwiperSlide key={i} className="unset-img1 bg-[#f3f3f3] !relative">
            <img
              src={image.url}
              alt={image.altText}
              fill
              className="!relative !h-auto mix-blend-multiply m-auto"
              unoptimized
            />
          </SwiperSlide> )

          }
          {ringData.diamond.diamondVideo && (
            <SwiperSlide>
              <iframe
                key={Math.random()}
                src={ringData.diamond.diamondVideo}
                className="w-full h-[440px] sm:h-[750px] md:h-[550px]"
              ></iframe>
            </SwiperSlide>
          )}

          <SwiperSlide className="unset-img1 bg-[#f3f3f3] !relative">
            <img
              src={
                ringData.diamond?.diamondImage
                  ? ringData.diamond.diamondImage
                  : `${DefaultImageUrl}/sample_${ringData.diamond.shape.toLowerCase()}.jpg`
              }
              alt={ringData.diamond.shape}
              fill
              className="!relative !h-auto mix-blend-multiply m-auto"
              unoptimized
            />
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
          {ringData.product && ringData.product.product.images.nodes.map((image,i) => <SwiperSlide key={i} className="!h-auto !w-[70px] unset-img1">
            <img
              src={image.url}
              alt={image.altText}
              fill
              className="!relative !h-auto mix-blend-multiply"
              unoptimized
            />
          </SwiperSlide> )}
          {ringData.diamond.diamondVideo && (
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
                ringData.diamond?.diamondImage
                  ? ringData.diamond.diamondImage
                  : `${DefaultImageUrl}/sample_${ringData.diamond.shape.toLowerCase()}.jpg`
              }
              alt={ringData.diamond.shape}
              fill
              className="!relative !h-auto mix-blend-multiply"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default CompleteGallary;