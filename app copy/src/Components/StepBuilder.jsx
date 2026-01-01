import React, { useEffect, useRef, useState } from "react";
import RingStep from "./RIngStep";
import DiamondStep from "./DiamondStep";
import ComplateStep from "./ComplateStep";
import axios from "axios";
import { GlobleVal } from "../Hooks/GlobleVal";
const { BACKEND_URL } = GlobleVal();
import { useData } from "../Context/DataContext";

const StepBuilder = (props) => {
  const [builderData, setBuilderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dataType = useData();

  // Pehle sessionStorage cleanup karo
  if (props.page === "Diamond") {
    sessionStorage.removeItem("diamondId");
  } else if (props.page !== "Complete" && props.page !== "Diamond") {
    sessionStorage.removeItem("ringId");
    sessionStorage.removeItem("ringSize");
  }

  const queryParams = new URLSearchParams(window.location.search);
  const diamondIdQuery = queryParams.get("diamond_id");

  // Ab updated values lo
  const ringId = sessionStorage.getItem("ringId");
  const diamondId = sessionStorage.getItem("diamondId");
  const diamondIdBuilder = diamondId || diamondIdQuery

  // Redirect logic
  if (props.page !== "Complete" && ringId && diamondId) {
    window.location.href =`/pages/${dataType.completepage}`;
  } else if (props.page === "Complete" && !ringId) {
    window.location.href = `/collections/${dataType.ringlist}`;
  } else if (props.page === "Complete" && !diamondId) {
    window.location.href = `/pages/${dataType.diamondlist}`;
  }

  const FetchBuilderData = async () => {
    try {
      const reaponse = await axios.get(
        `${BACKEND_URL}/data/ring-builder?diamond_id=${diamondIdBuilder}&product_id=${ringId}`
      );
      setBuilderData(reaponse.data.result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchBuilderData();
  }, []);

  return (
    <div className={`!mt-[50px]`}>
      <div className={`container mx-auto max-w-[1440px] px-8 `}>
        {loading && (props.page == "Complete" || props.page == "Diamond") ? (
          <div className="mt-[10px] w-full h-[60px] sm:h-[80px] !grid grid-cols-3 lg:grid-cols-7 mb-[5px] sm:mb-[10px] bg-gray-300 animate-pulse"></div>
        ) : (
          <div className="w-full h-[60px] sm:h-[80px] grid_step grid-cols-3 mb-[5px] sm:mb-[10px] lg:grid-cols-7">
            <div className="lg:!flex hidden lg:items-center lg:col-span-1 group">
              <div className="relative flex lg:items-center bg-[#efefef] group-hover:bg-[#FBE2E6] sm:h-[79px] w-full">
                <span className="ml-[20px] text-[#a51b26] text-[17px]">
                  Create Your Ring
                </span>
              </div>

              {/* Triangle Arrow */}
              <div
                className="lg:!block w-0 h-0 border-t-[30px] sm:border-t-[40px] border-b-[28px] sm:border-b-[38px] border-l-[15px] sm:border-l-[16px] border-t-transparent border-b-transparent border-l-[#e2e2e2] relative"
              >
                {/* White overlay triangle to simulate seamless cut */}
                <div
                  className="w-0 !block absolute -top-[30px] sm:-top-[40px] right-[1px] h-0 border-t-[30px] sm:border-t-[40px] border-b-[28px] sm:border-b-[38px] border-t-transparent border-b-transparent border-l-[15px] sm:border-l-[16px] border-l-[#efefef] group-hover:border-l-[#FBE2E6]"
                ></div>
              </div>

            </div>

            {(props.pageProp === "diamondPage" && !ringId) || diamondId ? (
              <>
                <DiamondStep
                  data={props}
                  builderData={builderData}
                  step={"1"}
                />
                <RingStep data={props} builderData={builderData} step={"2"} />
              </>
            ) : (
              <>
                <RingStep data={props} builderData={builderData} step={"1"} />
                <DiamondStep
                  data={props}
                  builderData={builderData}
                  step={"2"}
                />
              </>
            )}
            <ComplateStep data={props} builderData={builderData} />
          </div>
        )}
      </div>
    </div >
  );
};

export default StepBuilder;

("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Et harum quidem rerum facilis est et expedita dist");
