import React, { useEffect, useState } from "react";
import StepBuilder from "../Components/StepBuilder";
import axios from "axios";
import CompleteGallary from "../Components/CompleteGallary";
import { GlobleVal } from "../Hooks/GlobleVal";
const { BACKEND_URL } = GlobleVal();
import { useData } from "../Context/DataContext";

const CompleteRing = () => {
  const [ringData, setRingData] = useState([]);
  const ringId = sessionStorage.getItem("ringId");
  const diamondId = sessionStorage.getItem("diamondId");
  const [Carterror, setCartError] = useState(false);
  const [CarterrorMessage, setCartErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [detailActive, setDetailsActive] = useState("setting")

  const { diamond, product } = ringData
  const metafieldsRaw = product?.product?.metafields || [];
  const metafields = metafieldsRaw.filter(Boolean);
  const dataType = useData();


  const getMetaValue = (key) =>
    metafields.find((meta) => meta.key === key)?.value || "-";

  const CompleteRingData = async () => {
    try {
      const reaponse = await axios.get(
        `${BACKEND_URL}/data/complete-ring?diamond_id=${diamondId}&product_id=${ringId}`
      );
      setRingData(reaponse.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CompleteRingData();
  }, []);

  const DiamondChange = () => {
    sessionStorage.removeItem("diamondId");
    window.location.href = `/pages/${dataType.diamondlist}`;
  };

  const RingChange = () => {
    sessionStorage.removeItem("ringId");
    sessionStorage.removeItem("ringSize");
    window.location.href = `/collections/${dataType.ringlist}`;
  };

  const addToCart = async () => {
    setCartError(false);


    const productInput = {
      title: `${product.product.title} with ${diamond.carat}-Carat ${diamond.shape} Shape Natural Diamond`,
      descriptionHtml: `A unique ring with a ${diamond.carat}ct ${diamond.shape} diamond and ${product.product.title}.`,
      vendor: "dev",
      status: "ACTIVE",
    };

    try {
      setLoading(true);
      const CreateProduct = await axios.post(
        `${BACKEND_URL}/data/create-product`, { productInput, diamond, product }
      );

      if (CreateProduct.data.status == false) {
        setCartError(true);
        setCartErrorMessage(CreateProduct.response.data.message);
        setLoading(false);
      }

      if (CreateProduct.status && CreateProduct.data.variantId) {
        const variantID = CreateProduct.data.variantId.split("/").pop();
        if (variantID) {
          var cartData = {
            items: [
              {
                quantity: "1",
                id: variantID,
                properties: {
                  "Metal": `18k Yellow Gold`,
                  "Diamond Certificate": diamond.certificateNumber,
                },
              }
            ],
          };
        }

        setTimeout(async () => {
          try {
            const AddToCart = await axios.post("/cart/add.js", cartData);
            if (AddToCart.status == 200) {
              window.location.href = "/cart";
              sessionStorage.removeItem("ringId");
              sessionStorage.removeItem("diamondId");
              sessionStorage.removeItem("ringSize");
            }
          } catch (error) {
            setCartError(true);
            setCartErrorMessage(error.response.data.message);
            setLoading(false);
          }
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      setCartError(true);
      setCartErrorMessage(error.response.data.message);
    }
    // }
  };

  return (
    <>
      <StepBuilder page={"Complete"} />
      <div className="my-12 max-w-[1290px] mx-auto  px-8 text-black">
        {ringData.diamond && ringData.product ? (
          <>
            <div className="pb-[40px] mb-[30px] border-b border-[#f1f1f1]">
              <div className="md:inline-block md:w-[50%] lg:w-[60%] relative">
                <CompleteGallary ringData={ringData} />
              </div>
              <div className="md:inline-block md:w-[49%] md:ml-[1%] lg:w-[35%] lg:ml-[5%] mt-4 md:mt-[10px] align-top ">
                <h1 className="mb-[15px] !text-[25px] !text-[#545454]">
                  {product.product.title} with {diamond.carat}-Carat {diamond.shape} Shape Natural Diamond
                </h1>
                <h2 className="!text-[18px] mb-[20px] !text-[#545454]">
                  Price : ${Number(product.price.amount) + Number(diamond.price)}
                </h2>
                <div className="!grid grid-cols-2 gap-[10px]">
                  <div className="min-h-[100px] bg-[#EEEEEE] p-[15px] rounded-[8px]">
                    <span className="bg-white text-[#545454] p-[10px] block !w-[80%] rounded-[18px] m-auto text-center">Setting Price:</span>
                    <div className="flex justify-evenly items-center mt-[20px]">
                      <span className="text-[22px] mr-[4px]">${product.price.amount}</span>
                      <span className="underline cursor-pointer" onClick={RingChange}>Change</span>
                    </div>

                  </div>
                  <div className="min-h-[100px] bg-[#EEEEEE] p-[15px] rounded-[8px]">
                    <span className="bg-white text-[#545454] p-[10px] block !w-[80%] rounded-[18px] m-auto text-center">Diamond Price:</span>
                    <div className="flex justify-evenly items-center mt-[20px]">
                      <span className="text-[22px] mr-[4px]">${diamond.price}</span>
                      <span className="underline cursor-pointer" onClick={DiamondChange}>Change</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 my-[20px]">
                  <div
                    className={`w-full border-[1px] border-[#545454] text-center py-5 font-bold cursor-pointer transition ${loading
                        ? "bg-[#545454] text-white opacity-70 cursor-not-allowed"
                        : "hover:bg-[#545454] text-[#545454] hover:text-white"
                      }`}
                    onClick={!loading ? addToCart : undefined}
                  >
                    {loading ? (
                      <span className="flex justify-center items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 
             0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        Adding...
                      </span>
                    ) : (
                      "Add to Cart"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>) :
          <div className="mx-5 !grid grid-cols-1 lg:!grid-cols-2 mb-[10px] gap-3.5">
            <div className=" w-full">
              <div className="bg-gray-300 animate-pulse h-[440px] sm:h-[750px] md:h-[550px] !block"></div>
            </div>

            <div className="">
              <div className="bg-gray-300 animate-pulse sm:h-[80px] h-[60px] !block"></div>
              <div className="bg-gray-300 animate-pulse sm:h-[100px] h-[80px] mt-[10px] !block"></div>
              <div className="bg-gray-300 animate-pulse h-[40px] mt-[10px] !block"></div>
            </div>
          </div>
        }

        {ringData.diamond && ringData.product ? (
          <>
            <div className="border-b border-[#f1f1f1]">
              <span className={`lg:text-[25px] text-[16px] text-[#545454] p-[10px] cursor-pointer ${detailActive === "setting" ? "font-bold border-b border-[#545454]" : ""}`} onClick={() => setDetailsActive("setting")}>Setting Details</span>
              <span className="text-[25px] text-[#f1f1f1] px-[10px]">|</span>
              <span className={`lg:text-[25px] text-[16px] text-[#545454] p-[10px] cursor-pointer ${detailActive === "diamond" ? "font-bold border-b border-[#545454]" : ""}`} onClick={() => setDetailsActive("diamond")}>Diamond Details</span>
            </div>
            <div>
              <div className="!grid md:grid-cols-2 grid-cols-1 gap-[10px] mt-[20px]">
                {detailActive === "setting" &&
                  <div className="text-[#545454]">
                    <div className="!grid grid-cols-2 py-[10px] px-[20px] bg-[#EEEEEE]">
                      <div className="font-bold">
                        Band Width
                      </div>
                      <div>
                        {getMetaValue("band_width")}
                      </div>
                    </div>
                    <div className="!grid grid-cols-2 py-[10px] px-[20px]">
                      <div className="font-bold">
                        Center Stone Setting
                      </div>
                      <div>
                        {getMetaValue("center_stone_setting")}
                      </div>
                    </div>
                    <div className="!grid grid-cols-2 py-[10px] px-[20px] bg-[#EEEEEE]">
                      <div className="font-bold">
                        Style Type
                      </div>
                      <div>
                        {getMetaValue("style_type")}
                      </div>
                    </div>
                    <div className="!grid grid-cols-2 py-[10px] px-[20px]">
                      <div className="font-bold">
                        Style
                      </div>
                      <div>
                        {getMetaValue("style")}
                      </div>
                    </div>
                  </div>
                }
                {detailActive === "diamond" && <div className="text-[#545454]">
                  <div className="!grid grid-cols-2 py-[10px] px-[20px] bg-[#EEEEEE]">
                    <div className="font-bold">
                      Report Number
                    </div>
                    <div>
                      {diamond.stockNumber}
                    </div>
                  </div>
                  <div className="!grid grid-cols-2 py-[10px] px-[20px]">
                    <div className="font-bold">
                      Grading Report
                    </div>
                    <div>
                      <a
                        target="_blank"
                        className="underline"
                        href={
                          diamond.lab
                            ? diamond.lab === "GIA"
                              ? `https://www.gia.edu/report-check?reportno=${diamond.certificateNumber}`
                              : diamond.lab === "IGI"
                                ? `https://www.igi.org/verify-your-report/?r=${diamond.certificateNumber}`
                                : diamond.lab === "AGS"
                                  ? `https://agslab.com/ym-vdgr/diamonds/${diamond.certificateNumber}`
                                  : diamond.lab === "HRD"
                                    ? `https://my.hrdantwerp.com/?record_number=${diamond.certificateNumber}`
                                    : ""
                            : ""
                        }
                      > {diamond.lab}
                      </a>
                    </div>
                  </div>
                  <div className="!grid grid-cols-2 py-[10px] px-[20px] bg-[#EEEEEE]">
                    <div className="font-bold">
                      Shape
                    </div>
                    <div>
                      {diamond.shape}
                    </div>
                  </div>
                  <div className="!grid grid-cols-2 py-[10px] px-[20px]">
                    <div className="font-bold">
                      Carat Weight (ct.)
                    </div>
                    <div>
                      {diamond.carat}
                    </div>
                  </div>
                  <div className="!grid grid-cols-2 py-[10px] px-[20px] bg-[#EEEEEE]">
                    <div className="font-bold">
                      Color
                    </div>
                    <div>
                      {diamond.color}
                    </div>
                  </div>
                  <div className="!grid grid-cols-2 py-[10px] px-[20px]">
                    <div className="font-bold">
                      Clarity
                    </div>
                    <div>
                      {diamond.clarity}
                    </div>
                  </div>
                  <div className="!grid grid-cols-2 py-[10px] px-[20px] bg-[#EEEEEE]">
                    <div className="font-bold">
                      Cut
                    </div>
                    <div>
                      {diamond.cut}
                    </div>
                  </div>
                  <div className="!grid grid-cols-2 py-[10px] px-[20px]">
                    <div className="font-bold">
                      Polish
                    </div>
                    <div>
                      {diamond.polish}
                    </div>
                  </div>
                </div>}
                {detailActive === "diamond" && <div className="text-[#545454]">
                  <div className="text-[#545454]">
                    <div className="!grid grid-cols-2 py-[10px] px-[20px] bg-[#EEEEEE]">
                      <div className="font-bold">
                        Symmetry
                      </div>
                      <div>
                        {diamond.symmetry}
                      </div>
                    </div>
                    <div className="!grid grid-cols-2 py-[10px] px-[20px]">
                      <div className="font-bold">
                        Fluorescence
                      </div>
                      <div>
                        {diamond.fluorescence}
                      </div>
                    </div>
                    <div className="!grid grid-cols-2 py-[10px] px-[20px] bg-[#EEEEEE]">
                      <div className="font-bold">
                        Intensity
                      </div>
                      <div>
                        NA
                      </div>
                    </div>
                    <div className="!grid grid-cols-2 py-[10px] px-[20px]">
                      <div className="font-bold">
                        Table %
                      </div>
                      <div>
                        {diamond.tablePerc}
                      </div>
                    </div>
                    <div className="!grid grid-cols-2 py-[10px] px-[20px] bg-[#EEEEEE]">
                      <div className="font-bold">
                        Depth %
                      </div>
                      <div>
                        {diamond.deptPerc}
                      </div>
                    </div>
                    <div className="!grid grid-cols-2 py-[10px] px-[20px]">
                      <div className="font-bold">
                        L/W Ratio
                      </div>
                      <div>
                        {diamond.l_w_ratio}
                      </div>
                    </div>
                    <div className="!grid grid-cols-2 py-[10px] px-[20px] bg-[#EEEEEE]">
                      <div className="font-bold">
                        Measurement (mm)
                      </div>
                      <div>
                        {diamond.width} * {diamond.length} * {diamond.depth}
                      </div>
                    </div>
                    <div className="!grid grid-cols-2 py-[10px] px-[20px]">
                      <div className="font-bold">
                        Girdle
                      </div>
                      <div>
                        {diamond.girdle}
                      </div>
                    </div>
                  </div>
                </div>}

              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid_step grid-cols-1 md:grid-cols-2 gap-6 mb-[10px]">
              <div className=" w-full ">
                <div className="bg-gray-300 animate-pulse h-[200px] md:h-[400px]"></div>
              </div>

              <div className="bg-gray-300 animate-pulse h-[200px] md:h-[500px]"></div>
            </div>
            <div className="bg-gray-300 animate-pulse h-[80px] my-5"></div>
          </>
        )}
      </div>
    </>
  );
};

export default CompleteRing;
