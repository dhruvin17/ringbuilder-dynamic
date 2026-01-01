import { useData } from "../Context/DataContext";

const RingStep = ({ data, builderData, step }) => {
  const gid = builderData?.product?.id;
  const id = gid?.split("/").pop();
  const dataType = useData();

  const ChangeHandler = () => {
    sessionStorage.removeItem("ringId");
    sessionStorage.removeItem("ringSize");
    window.location.href = `/collections/${dataType.ringlist}`;
  };

  const ViewHandler = () => {
    sessionStorage.removeItem("ringId");
    sessionStorage.removeItem("ringSize");
    window.location.href = `/products/${builderData.product.product.handle}?variant=${id}`;
  };

  return (
    <div className="flex lg:col-span-2">
      <div
        className={`${step == 1 ? "hidden" : ""
          } lg:!block w-[0px] h-[0px] border-t-[30px] sm:border-t-[40px] border-b-[30px] sm:border-b-[40px] border-l-[10px] sm:border-l-[16px] relative border-l-[#e2e2e2]   ${data.page == "Complete"
            ? "border-[#efefef]"
            : data.page == "Diamond"
              ? "border-[#efefef]"
              : "border-[#FBE2E6]"
          }`}
      >
        <div
          className={`w-[0px] !block absolute -top-[30px] sm:-top-[40px] right-[1px] h-[0px] border-t-[30px] sm:border-t-[40px] border-b-[30px] sm:border-b-[40px] border-l-[10px] sm:border-l-[16px] border-[#00000000] border-l-white`}
        ></div>
      </div>
      <div
        className={`w-full grid_step md:grid-cols-6 items-center content-center pr-2 ${data.page !== "Diamond" && data.page !== "Complete"
          ? "bg-[#FBE2E6]"
          : "bg-[#efefef]"
          } `}
      >
        <h2 className="md:!flex hidden items-center pl-[5px] lg:pl-[10px] !text-[#a51b26]">
          {step}
        </h2>
        <div className="md:col-span-4  text-[#a51b26] leading-[25px] text-center sm:text-start">
          <span
            className={`text-[10px] sm:text-[14px] lg:text-[20px]`}
          >
            Choose Your Setting
          </span>
          {data.pagetype == "ring-detail" && (
            <div className="flex flex-col sm:flex-row text-[10px] sm:text-[13px]">
              <span className="cursor-pointer" onClick={ChangeHandler}>Change</span>
            </div>
          )}

          {builderData.product && (
            <>
              <div className="flex flex-row text-[10px] lg::text-[13px] justify-center sm:justify-start">
                <span className="hidden sm:!block lg:text-[24px] text-[11px] font-bold sm:mx-2">
                  $ {Math.round(parseFloat(builderData.product.price.amount))}
                </span>
                <span className="hidden sm:!block">|</span>
                <span className="cursor-pointer mx-2" onClick={ViewHandler}>View</span>
                <span>|</span>
                <span className="cursor-pointer mx-2" onClick={ChangeHandler}>
                  Change{" "}
                </span>
                {/* Change */}
              </div>
            </>
          )}
        </div>
        <div
          className={`hidden md:!flex justify-center items-center ${builderData?.product
            ? ""
            : "rounded-full border-[1px] border-[#a51b26] bg-white mx-auto stepBuilder-bg-image bg-[position:84.2%_-6px] bg-no-repeat"
            }   w-[41px] h-[41px] my-auto z-2`}
        >
          {builderData?.product && (
            <span
              className={`relative inline-block ${builderData?.product
                ? "lg:w-[41px] lg:h-[41px] w-[37px] h-[37px]"
                : "h-[25px] w-[25px]"
                } `}
            >
              <img
                alt="Engagement rings"
                src={builderData.product.product.images.nodes[0].url}
                decoding="async"
                data-nimg="fill"
                className="h-auto absolute top-0 bottom-0 left-0 right-0"
                loading="lazy"
              />
            </span>
          )}
        </div>
      </div>
      <div
        className={`block w-[0px] h-[0px] border-t-[30px] sm:border-t-[40px] border-b-[30px] sm:border-b-[40px] border-l-[10px] sm:border-l-[16px] relative border-l-[#e2e2e2] border-white`}
      >
        <div
          className={`w-[0px] !block absolute -top-[30px] sm:-top-[40px] right-[1px] h-[0px] border-t-[30px] sm:border-t-[40px] border-b-[30px] sm:border-b-[40px] border-l-[10px] sm:border-l-[16px] border-[#00000000] ${data.page !== "Diamond" && data.page !== "Complete"
              ? "border-l-[#FBE2E6] "
              : "border-l-[#efefef]"
            } `}
        ></div>
      </div>
    </div>
  );
};

export default RingStep;
