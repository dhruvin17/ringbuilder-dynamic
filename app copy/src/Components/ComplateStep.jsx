import React from "react";
import { GlobleVal } from "../Hooks/GlobleVal"
const { DefaultImageUrl } = GlobleVal()

const ComplateStep = ({ data, builderData }) => {
  return (
    <div className="flex relative lg:col-span-2 leading-5">
      <div
        className={`w-[0px] h-[0px] border-t-[30px] sm:border-t-[40px] border-b-[30px] sm:border-b-[40px] border-l-[10px] sm:border-l-[16px] relative border-l-white ${data.page == "Complete" ? "border-[#FBE2E6]" : "border-[#efefef]"
          }`}
      >
        <div
          className={`w-[0px] absolute -top-[30px] sm:-top-[40px] right-[1px] h-[0px] border-t-[30px] sm:border-t-[40px] border-b-[30px] sm:border-b-[40px] border-l-[10px] sm:border-l-[16px] border-[#00000000] ${sessionStorage.getItem("diamondId") && data.page == "Diamond"
              ? "border-l-white"
              : data.page != "Complete" &&
                (sessionStorage.getItem("diamondId") ||
                  sessionStorage.getItem("ringId"))
                ? "border-l-[#f8f5ee]"
                : "border-l-white"
            } `}
        ></div>
      </div>
      <div
        className={`${data.page == "Complete" ? "bg-[#FBE2E6]" : "bg-[#efefef]"
          } w-full grid_step md:grid-cols-7 content-center items-center text-[#a51b26]`}
      >
        <h2 className="md:!flex hidden items-center pl-[5px] lg:pl-[10px] !text-[#a51b26]">
          3
        </h2>
        <div className="md:col-span-4 text-[#a51b26] leading-[25px] text-center sm:text-start">
          <p className="text-[10px] sm:text-[14px] lg:text-[20px]">
            Complete Your Ring
          </p>
        </div>

        {builderData?.product && builderData?.diamond ? (
          <div className="hidden px-2 md:!flex items-center col-span-2 ">
            <span className="relative inline-block h-[37px] lg:w-[41px] lg:h-[41px] w-[37px]">
              <img
                src={builderData?.product?.product?.images.nodes[0].url}
                fill
                alt={builderData?.product?.product?.handle}
                unoptimized
                className="h-auto absolute top-0 bottom-0 left-0 right-0 bg-white my-auto"
              />
            </span>

            <span className="relative inline-block h-[37px] lg:w-[41px] lg:h-[41px] w-[37px]">
              <img
                alt={builderData?.diamond?.shape}
                src={
                  builderData?.diamond.diamondImage
                    ? builderData?.diamond.diamondImage
                    : `${DefaultImageUrl}/sample_${builderData?.diamond.shape.toLowerCase()}.jpg`
                }
                decoding="async"
                data-nimg="fill"
                className="h-auto absolute top-0 bottom-0 left-0 right-0 bg-white my-auto"
                loading="lazy"
              />
            </span>
          </div>
        ) : (
          <div className="hidden  md:!flex justify-center items-center rounded-full border-[1px] bg-white border-[#a51b26] h-[41px] w-[41px] my-auto mx-auto stepBuilder-bg-image bg-[position:84.5%_-72px] bg-no-repeat"></div>
        )}
      </div>
    </div>
  );
};

export default ComplateStep;