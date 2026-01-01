import React from "react";
import { GlobleVal } from "../Hooks/GlobleVal"
const { DefaultImageUrl } = GlobleVal()
import { useData } from "../Context/DataContext";

const DiamondStep = ({ data, builderData, step }) => {
  const gid = builderData?.setting?.id;
  const id = gid?.split("/").pop();
  const dataType = useData();

  const ChangeHandler = () => {
    sessionStorage.removeItem("diamondId");
    window.location.href = `/pages/${dataType.diamondlist}`;
  };

  const ViewHandler = () => {
    sessionStorage.removeItem("diamondId");
    window.location.href = `/pages/view-diamond/?diamond_id=${builderData.diamond.stockNumber}`;
  };

  return (
    <div className="flex lg:col-span-2">
      <div className={`${step == 1 ? "hidden " : ""
        } lg:!block w-[0px] h-[0px] border-t-[30px] sm:border-t-[40px] border-b-[30px] sm:border-b-[40px] border-l-[10px] sm:border-l-[16px] relative border-l-[#e2e2e2] ${data.page == "Diamond" ? "!border-[#FBE2E6]" : "border-[#efefef]"
        }`}
      >
        <div
          className={`w-[0px] !block absolute -top-[30px] sm:-top-[40px] right-[1px] h-[0px] border-t-[30px] sm:border-t-[40px] border-b-[30px] sm:border-b-[40px] border-l-[10px] sm:border-l-[16px] border-[#00000000] border-l-white`}
        ></div>
      </div>

      <div
        className={`w-full grid_step md:grid-cols-6 items-center content-center !text-[#a51b26]  ${data.page == "Diamond" ? "bg-[#FBE2E6]" : "bg-[#efefef]"
          }`}
      >
        <h2 className="md:!flex hidden items-center pl-[5px] lg:pl-[10px] !text-[#a51b26]">
          {step}
        </h2>
        <div className="md:col-span-4 pl-[2px] sm:pl-0 leading-[25px] text-center sm:text-start">
          <span
            className={`text-[10px] sm:text-[14px] lg:text-[20px]`}
          >
            Choose Your Diamond
          </span>

          {data.pageType == "diamondDetailpage" && (
            <div className="flex flex-col sm:flex-row text-[10px] sm:text-[13px]">
              <span className="hidden sm:!block lg:text-[24px] text-[11px] font-bold sm:mx-2">
                $ {builderData.diamond.price}
              </span>
              <span className="hidden sm:!block">|</span>
              <span className="cursor-pointer sm:mx-2" onClick={ChangeHandler}>Change</span>
            </div>
          )}

          {builderData.diamond && data.pageType !== "diamondDetailpage" && (
            <>
              <div className="flex flex-row text-[10px] lg:text-[13px] justify-center sm:justify-start">
                <span className="hidden sm:!block lg:text-[24px] text-[11px] font-bold sm:mx-2">
                  $ {builderData.diamond.price}
                </span>
                <span className="hidden sm:!block">|</span>
                <span className="cursor-pointer mx-2" onClick={ViewHandler}> View </span>
                <span>|</span>
                <span className="cursor-pointer mx-2" onClick={ChangeHandler}>
                  Change{" "}
                </span>
              </div>
            </>
          )}
        </div>
        <div
          className={`hidden md:!flex justify-center items-center ${builderData?.diamond
            ? ""
            : "rounded-full border-[1px] border-[#a51b26] bg-white mx-auto stepBuilder-bg-image bg-[position:84.2%_-39px] bg-no-repeat"
            } w-[40px] h-[40px] my-auto z-2`}
        >
          {builderData?.diamond && (
            <span
              className={`relative inline-block ${builderData?.diamond
                ? "lg:w-[41px] lg:h-[41px] w-[37px] h-[37px]"
                : "h-[25px] w-[25px]"
                } `}
            >
              <img
                alt={builderData.diamond.shape}
                src={
                  builderData?.diamond.diamondImage
                    ? `${builderData?.diamond.diamondImage}`
                    : `${DefaultImageUrl}/sample_${builderData.diamond.shape.toLowerCase()}.jpg`
                }
                decoding="async"
                data-nimg="fill"
                className="h-auto absolute top-0 bottom-0 left-0 right-0 bg-white"
                loading="lazy"
              />
            </span>
          )}
        </div>
      </div>

      <div className={`w-[0px] h-[0px] border-t-[30px] sm:border-t-[40px] border-b-[30px] sm:border-b-[40px] border-l-[10px] sm:border-l-[16px] relative border-l-[#e2e2e2] border-white`}
      >
        <div
          className={`w-[0px] !block absolute -top-[30px] sm:-top-[40px] right-[1px] h-[0px] border-t-[30px] sm:border-t-[40px] border-b-[30px] sm:border-b-[40px] border-l-[10px] sm:border-l-[16px] border-[#00000000] ${data.page == "Diamond" ? "border-l-[#FBE2E6]" : "border-l-[#efefef]"}`}
        ></div>
      </div>
    </div>
  );
};

export default DiamondStep;
