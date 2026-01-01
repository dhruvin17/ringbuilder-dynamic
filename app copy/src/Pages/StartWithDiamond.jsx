import React, { useEffect, useState } from "react";
import StepBuilder from "../Components/StepBuilder";
import Slider from "../Components/Slider";
import axios from "axios";
import { Loader } from "../Components/Loader";
import { GlobleVal } from "../Hooks/GlobleVal";
import Grid from "../Components/Grid";
const { shapes, labs, clarityList, colorList, cutList, DefaultImageUrl, fluorescenceList, polishList, symmertyList, fake_data, BACKEND_URL } =
  GlobleVal();

const StartWithDiamond = () => {
  const [loading, setLoading] = useState(false);
  const [diamonds, setDiamonds] = useState([]);
  const [preFilter, setPreFilter] = useState('record')
  const [recentView, setRecentView] = useState([]);
  const [totalrecord, setTotalRecord] = useState({ max_offset: 1, total: 0 });
  const [filterLoading, setFilterLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [filtersInitialized, setFiltersInitialized] = useState(false);
  const [advanceFilters, setAdvanceFilters] = useState(false);

  const [filterRange, setFilterRange] = useState({
    f_price: [0, 1000],
    f_carat: [0, 10],
    f_depth: [0, 100],
    f_table: [0, 100],
    f_l_w_ratio: [0, 100],
  });

  const filterVal = {
    shape: [],
    f_price_min: Number(filterRange.f_price[0]),
    f_price_max: Number(filterRange.f_price[1]),
    f_carat_min: Number(filterRange.f_carat[0]),
    f_carat_max: Number(filterRange.f_carat[1]),
    f_cut_min: 0,
    f_cut_max: 4,
    f_color_min: 0,
    f_color_max: 7,
    f_clarity_min: 0,
    f_clarity_max: 7,
    f_l_w_ratio_min: Number(filterRange.f_l_w_ratio[0]),
    f_l_w_ratio_max: Number(filterRange.f_l_w_ratio[1]),
    f_fluorescence_min: 0,
    f_fluorescence_max: 4,
    f_symmerty_min: 0,
    f_symmerty_max: 4,
    f_polish_min: 0,
    f_polish_max: 4,
    f_table_min: Number(filterRange.f_table[0]),
    f_table_max: Number(filterRange.f_table[1]),
    f_depth_min: Number(filterRange.f_depth[0]),
    f_depth_max: Number(filterRange.f_depth[1]),
    lab: [],
    origin: "",
    sorting_order: "ASC",
    sort_by: "price",
    page_offset: 1,
    search_ID: "",
  };

  const [filters, setFilters] = useState(filterVal);


  const [defaultFilter, setDefaultFilter] = useState({})
  const [activerFilter, setActiveFilter] = useState("shapecaratprice")
  const [compareDiamondData, setCompareDiamondData] = useState([])

  const [compareDiamonds, setCompareDiamonds] = useState(
    JSON.parse(localStorage.getItem("compare_diamond") || "[]")
  );

  const GetCompareDiamondData = async () => {
    try {

      const response = await axios.get(
        `${BACKEND_URL}/compare/comparediamonds?ids=${compareDiamonds}`
      );
      setCompareDiamondData(response.data.result);
    } catch (error) {
      console.error("Error fetching recent diamonds:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("compare_diamond", JSON.stringify(compareDiamonds));
    GetCompareDiamondData()
  }, [compareDiamonds]);

  useEffect(() => {
    const fetchFiltersAndDiamonds = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/filter/getfilter`);
        const result = res.data.result
        setDefaultFilter(result)
        setFilterRange({
          f_price: [result.f_price_min, result.f_price_max],
          f_carat: [result.f_carat_min, result.f_carat_max],
          f_depth: [result.f_depth_min, result.f_depth_max],
          f_table: [result.f_table_min, result.f_table_max],
          f_l_w_ratio: [result.f_l_w_ratio_min, result.f_l_w_ratio_max],
        });

        if (sessionStorage.getItem("diamond_filters")) {
          let sessionVal = JSON.parse(sessionStorage.getItem("diamond_filters"))
          sessionVal = {
            ...sessionVal,
            page_offset: 1,
            search_ID: ''
          }
          setFilters(sessionVal)

        } else {
          setFilters({
            ...filters,
            f_price_min: Number(result.f_price_min),
            f_price_max: Number(result.f_price_max),
            f_carat_min: Number(result.f_carat_min),
            f_carat_max: Number(result.f_carat_max),
            f_l_w_ratio_min: Number(result.f_l_w_ratio_min),
            f_l_w_ratio_max: Number(result.f_l_w_ratio_max),
            f_table_min: Number(result.f_table_min),
            f_table_max: Number(result.f_table_max),
            f_depth_min: Number(result.f_depth_min),
            f_depth_max: Number(result.f_depth_max),
          });
        }

        setFiltersInitialized(true)
        setFilterLoading(false)

      } catch (error) {
        console.error("Filter init error", error);
      }
    };

    fetchFiltersAndDiamonds();
  }, []);



  const getDiamonds = async () => {
    setLoading(true);
    const Reqbody = { ...filters, defaultFilters: { ...defaultFilter, f_price_min_c: filters.f_price_min, f_price_max_c: filters.f_price_max } }
    try {
      const res = await axios.post(
        `${BACKEND_URL}/data/getdiamonds`,
        Reqbody
      );
      const data = res.data.result;
      if (filters.page_offset == 1) {
        setDiamonds(data.data)
        setTotalRecord((pre) => ({ ...pre, total: data.totalRecords.length > 0 ? data.totalRecords[0].totalRecords : 0, max_offset: data.totalRecords.length > 0 ? Math.ceil(data.totalRecords[0].totalRecords / 20) : 0 }));
      } else {
        setDiamonds([...diamonds, ...data.data])
      }
      setLoading(false);
    } catch (error) {
      console.log("diamond error", error);
    }
  };

  useEffect(() => {
    if (filtersInitialized && Object.keys(defaultFilter).length > 0) {
      getDiamonds();
    }
  }, [filtersInitialized, filters, defaultFilter]);

  const setFilterValues = (newFilter) => {
    setFilters((previousInputs) => {
      const updated = { ...previousInputs, ...newFilter };

      // Remove keys before saving to sessionStorage
      const { search_ID, page_offset, ...filterWithout } = updated;
      sessionStorage.setItem("diamond_filters", JSON.stringify(filterWithout));

      return updated;
    });
  };

  const handleChange = (values, type) => {
    setFilterValues({
      [`f_${type}_min`]: Number(values[0]),
      [`f_${type}_max`]: Number(values[1]),
      page_offset: 1,
    });
  };

  const handleShapeClick = (shapeLabel) => {
    const newShapes = [...filters.shape];
    if (newShapes.includes(shapeLabel)) {
      const index = newShapes.indexOf(shapeLabel);
      newShapes.splice(index, 1);
    } else {
      newShapes.push(shapeLabel);
    }
    setFilterValues({ shape: newShapes })
  };

  const handleLabClick = (lab) => {

    const newLab = [...filters.lab];
    if (newLab.includes(lab)) {
      const index = newLab.indexOf(lab);
      newLab.splice(index, 1);
    } else {
      // Add the shape if it is not selected
      newLab.push(lab);
    }
    setFilterValues({ lab: newLab })
  };


  const changeDropDown = (e) => {
    const val = e.target.value.split('-')
    setFilterValues({ sorting_order: val[1], sort_by: val[0], page_offset: 1 })
  }


  const recentViewDiamondIds =
    JSON.parse(localStorage.getItem("Recently_view_diamond")) || [];

  const GetRecentDiamondData = async () => {
    if (!recentViewDiamondIds.length) return; // Exit if no IDs are stored

    try {

      const response = await axios.get(
        `${BACKEND_URL}/recently/diamonds?ids=${recentViewDiamondIds}`
      );
      setRecentView(response.data.result);
    } catch (error) {
      console.error("Error fetching recent diamonds:", error);
    }
  };

  useEffect(() => {
    GetRecentDiamondData();
  }, []);


  const changeTab = (val) => {
    setPreFilter(val)
    val == "record" && setFilterValues({ page_offset: 1 })
  }

  const showHideFilters = () => {
    setAdvanceFilters(pre => !pre)
  }

  return (
    <>
      {" "}
      <StepBuilder
        page={"Diamond"}
        pageProp={"diamondPage"}
        pageType={"diamondpage"}
      />
      <div className="container mx-auto max-w-[1440px] px-8 my-12">
        {!filterLoading && (
          <div>
            {
              title &&
              <h2 className="text-center text-xl py-2 font-normal capitalize">
                {title}
              </h2>
            }

            {
              content &&
              <p
                className="md:mx-[10%] overflow-hidden text-center mb-4"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            }

          </div>
        )}

        {filterLoading ? <div className="bg-gray-300 animate-pulse h-[80px] mb-[30px] !block">
        </div> :
          <div className="sm:!flex sm:gap-x-[20px] lg:gap-x-[50px] justify-center items-center hidden mx-auto text-center pb-[20px] border-b border-[#545454] mt-[50px] text-[#545454] lg:text-[18px] text-[16px] mb-[30px]">
            <div className={`cursor-pointer whitespace-nowrap ${activerFilter === "shapecaratprice" && 'font-bold'}`} onClick={() => setActiveFilter("shapecaratprice")}>
              Shape, Carat, Price & Report
            </div>
            <div>|</div>
            <div className={`cursor-pointer whitespace-nowrap ${activerFilter === "colorclaritycut" && 'font-bold'}`} onClick={() => setActiveFilter("colorclaritycut")}>
              Color, Clarity & Cut
            </div>
            <div>|</div>
            <div className={`cursor-pointer whitespace-nowrap ${activerFilter === "advancefilter" && 'font-bold'}`} onClick={() => setActiveFilter("advancefilter")}>
              More Filters
            </div>

            <div>|</div>
            <div className="cursor-pointer whitespace-nowrap" onClick={() => {
              sessionStorage.removeItem("diamond_filters");
              setFilters(filterVal);
            }}>
              Reset Filter
            </div>
          </div>}

        {filterLoading ? <div className="bg-gray-300 animate-pulse h-[450px] !block lg:w-[80%] mx-auto"></div>  :<div className="lg:w-[80%] mx-auto">
          <div className={`contents sm:grid sm:grid-cols-2 gap-1 gap-y-[50px] gap-x-2 lg:gap-x-10 ${activerFilter == 'shapecaratprice' ? 'sm:block' : 'sm:hidden'} `}>
            <div className="mt-5 !grid col-span-2 mb-[10px]">
              <p className="!text-[#bb5f63] font-semibold mx-4 mb-[5px] sm:mb-0">
                Shape
              </p>
              <div className="relative mt-5">
                <div className="grid_step grid-cols-5 md:grid-cols-10 gap-3 ">
                  {shapes.map((shape, index) => (
                    <div
                      className={`cursor-pointer mx-auto group`}
                      key={index}
                      onClick={() => handleShapeClick(shape)}
                    >
                      <div className={`lg:w-[65px] lg:h-[65px] w-[50px] h-[50px] mx-auto p-3 bg-[#EDEDED] rounded-full border-1 border-white group-hover:border-[#bb5f63] overflow-hidden flex items-center justify-center ${filters.shape.includes(shape) ? '!border-[#bb5f63]' : ''}`}
                      >
                        <img
                          alt={shape}
                          src={`${DefaultImageUrl}/${shape.toLowerCase()}.png`}
                          decoding="async"
                          loading="lazy"
                          className={`w-full h-full object-contain`}
                          onError={(e) => (e.target.style.display = "none")} // Hide if image not found
                        />
                      </div>

                      <p
                        className={`hidden md:!block text-center font-semibold md:text-[10px] lg:text-[14px] uppercase transition-all duration-300 border-b-2 border-transparent group-hover:!border-[#bb5f63] ${filters.shape.includes(shape)
                          ? "!border-[#bb5f63]"
                          : "border-transparent"
                          }`}
                      >
                        {shape}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Slider
                range={{
                  min: filterVal.f_carat_min,
                  max: filterVal.f_carat_max,
                }}
                start={[filters.f_carat_min, filters.f_carat_max]}
                onChange={(e) => handleChange(e, "carat")}
                label="CARAT"
                text={[]}
                step={0}
                showInput={true}
              />
            </div>
            <Slider
              range={{
                min: filterVal.f_price_min,
                max: filterVal.f_price_max,
              }}
              start={[filters.f_price_min, filters.f_price_max]}
              onChange={(e) => handleChange(e, "price")}
              label="PRICE"
              text={[]}
              step={1}
              showInput={true}
            />
            <div className="mb-[10px] sm:mb-0">
              <div className="text-[18px] font-semibold mx-4 mb-[5px] sm:mb-[15px]">
                Report
              </div>
              <div className=" mx-8">
                {labs.map((lab, index) =>
                  <div key={index} className={`inline-block w-[64px] py-[4px] mr-[8px] text-center cursor-pointer border-[1px] ${filters.lab.includes(lab) ? 'bg-[#6A6A6A] text-white' : 'bg-white text-black'}`} onClick={() => handleLabClick(lab)}>{lab}</div>
                )}
              </div>
            </div>
          </div>
          <div className={`contents sm:grid sm:grid-cols-2 gap-1 gap-y-[50px gap-x-2 lg:gap-x-10 ${activerFilter == 'colorclaritycut' ? 'sm:block' : 'sm:hidden'} `}>
            <Slider
              range={{
                min: filterVal.f_color_min,
                max: filterVal.f_color_max,
              }}
              start={[filters.f_color_min, filters.f_color_max]}
              onChange={(e) => handleChange(e, "color")}
              label="COLOR"
              text={colorList}
              step={1}
              showInput={false}
            />

            <Slider
              range={{
                min: filterVal.f_clarity_min,
                max: filterVal.f_clarity_max,
              }}
              start={[filters.f_clarity_min, filters.f_clarity_max]}
              onChange={(e) => handleChange(e, "clarity")}
              label="CLARITY"
              text={clarityList}
              step={1}
              showInput={false}
            />

            <Slider
              range={{ min: filterVal.f_cut_min, max: filterVal.f_cut_max }}
              start={[filters.f_cut_min, filters.f_cut_max]}
              onChange={(e) => handleChange(e, "cut")}
              label="CUT"
              text={cutList}
              step={1}
              showInput={false}
            />
          </div>

          {/* button of mobile  */}
          <div className='sm:hidden z-10 relative mx-2 my-[20px]'>
            <button className={`w-full bg-[#545454] text-white py-2 button-rounded`} onClick={() => showHideFilters()}>
              {advanceFilters ? "Less" : "Show"} Filters
            </button>
          </div>

          <div className={`contents sm:grid sm:grid-cols-2 gap-1 gap-y-[50px] gap-x-2 lg:gap-x-10 ${activerFilter == 'advancefilter' ? 'sm:block' : 'sm:hidden'} `}>
            <div className={`transition-all duration-300 ease-in-out ${advanceFilters ? "max-h-[200px]" : "max-h-0"} sm:max-h-max overflow-hidden lg:overflow-visible`}>
              <Slider
                range={{ min: filterVal.f_fluorescence_min, max: filterVal.f_fluorescence_max }}
                start={[filters.f_fluorescence_min, filters.f_fluorescence_max]}
                onChange={(e) => handleChange(e, "fluorescence")}
                label="Flourescence"
                text={fluorescenceList}
                step={1}
                showInput={false}
              />
            </div>
            <div className={`transition-all duration-300 ease-in-out ${advanceFilters ? "max-h-[200px]" : "max-h-0"} sm:max-h-max overflow-hidden lg:overflow-visible`}>
              <Slider
                range={{ min: filterVal.f_polish_min, max: filterVal.f_polish_max }}
                start={[filters.f_polish_min, filters.f_polish_max]}
                onChange={(e) => handleChange(e, "polish")}
                label="Polish"
                text={polishList}
                step={1}
                showInput={false}
              />
            </div>
            <div className={`transition-all duration-300 ease-in-out ${advanceFilters ? "max-h-[200px]" : "max-h-0"} sm:max-h-max overflow-hidden lg:overflow-visible`}>
              <Slider
                range={{ min: filterVal.f_symmerty_min, max: filterVal.f_symmerty_max }}
                start={[filters.f_symmerty_min, filters.f_symmerty_max]}
                onChange={(e) => handleChange(e, "symmerty")}
                label="symmerty"
                text={symmertyList}
                step={1}
                showInput={false}
              />
            </div>
            <div className={`transition-all duration-300 ease-in-out ${advanceFilters ? "max-h-[200px]" : "max-h-0"} sm:max-h-max overflow-hidden lg:overflow-visible`}>
              <Slider
                range={{
                  min: filterVal.f_table_min,
                  max: filterVal.f_table_max,
                }}
                start={[filters.f_table_min, filters.f_table_max]}
                onChange={(e) => handleChange(e, "table")}
                label="Table"
                text={[]}
                step={0}
                showInput={true}
              />
            </div>
            <div className={`transition-all duration-300 ease-in-out ${advanceFilters ? "max-h-[200px]" : "max-h-0"} sm:max-h-max overflow-hidden lg:overflow-visible`}>
              <Slider
                range={{
                  min: filterVal.f_depth_min,
                  max: filterVal.f_depth_max,
                }}
                start={[filters.f_depth_min, filters.f_depth_max]}
                onChange={(e) => handleChange(e, "depth")}
                label="Depth"
                text={[]}
                step={0}
                showInput={true}
              />
            </div>
          </div>
        </div>}

        <div>
          <div className="text-center">
            <h1 className="!text-[22px] uppercase mt-[35px] mb-[15px] text-[#545454]">select your Natural White Diamond</h1>
          </div>
          <div className="flex sm:flex-row flex-col justify-between items-center">
            <div className="flex uppercase lg:text-[16px] sm:text-[15px] text-[13px]">
              <p className={`border-r sm:px-[16px] px-[10px] cursor-pointer flex lg:flex-row flex-col items-center justify-center ${preFilter === "record" && "font-bold"}`} onClick={() => changeTab('record')} ><span>Diamond Found</span> <span>({totalrecord.total})</span></p>
              <p className={`border-r sm:px-[16px] px-[10px] cursor-pointer flex lg:flex-row flex-col items-center justify-center ${preFilter === "recentlyviewed" && "font-bold"}`} onClick={() => changeTab('recentlyviewed')} ><span>Recently Viewed</span> <span> ({recentView.length || 0})</span></p>
              <p className={`sm:px-[16px] px-[10px] cursor-pointer flex lg:flex-row flex-col items-center justify-center ${preFilter === "camparediamond" && "font-bold"}`} onClick={() => changeTab('camparediamond')}><span>Compare</span> <span>({compareDiamondData.length || 0})</span></p>
            </div>
            <div className="flex gap-[5px] justify-center mt-[25px] sm:mt-0">
              <lable>Sort By:</lable>
              <div className="w-[50%] sm:w-auto text-right sm:ml-auto sm:text-[16px] text-[14px]">
                <select className="h-full w-full pl-[2px] sm:w-[180px] border border-[#545454] focus-visible:!outline-0 focus-visible:!shadow-none text-white bg-[#6A6A6A] sm:p-1" value={filters.sort_by + '-' + filters.sorting_order} onChange={changeDropDown}>
                  <option className="bg-[#EEEEEE] text-[#6A6A6A]" value="price-ASC">Price: Low-High</option>
                  <option className="bg-[#EEEEEE] text-[#6A6A6A]" value="price-DESC">Price: High-Low</option>
                  <option className="bg-[#EEEEEE] text-[#6A6A6A]" value="carat-ASC">Carat: Low-High</option>
                  <option className="bg-[#EEEEEE] text-[#6A6A6A]" value="carat-DESC">Carat: High-Low</option>
                  <option className="bg-[#EEEEEE] text-[#6A6A6A]" value="color-ASC">Color: Low-High</option>
                  <option className="bg-[#EEEEEE] text-[#6A6A6A]" value="color-DESC">Color: High-Low</option>
                  <option className="bg-[#EEEEEE] text-[#6A6A6A]" value="clarity-ASC">Clarity: Low-High</option>
                  <option className="bg-[#EEEEEE] text-[#6A6A6A]" value="clarity-DESC">Clarity: High-Low</option>
                  <option className="bg-[#EEEEEE] text-[#6A6A6A]" value="cut-ASC">Cut: Low-High</option>
                  <option className="bg-[#EEEEEE] text-[#6A6A6A]" value="cut-DESC">Cut: High-Low</option>
                </select>
              </div>
            </div>
          </div>

          {preFilter == 'record' ? diamonds.length > 0 ?
            <Grid diamonds={diamonds} compareDiamonds={compareDiamonds} setCompareDiamonds={setCompareDiamonds} /> : loading ? <div className="!grid grid-cols-2 gap-y-3 gap-x-2 sm:gap-x-3 lg:gap-x-8 sm:grid-cols-3 lg:grid-cols-4 min-h-[500px]">{fake_data}</div> :
              <div className="text-center py-20 px-3 text-[18px] capitalize">Unfortunately, no diamonds match your selected filters range.</div> : ''
          }

          {preFilter == 'record' && totalrecord.max_offset > filters.page_offset &&
            <div className='text-center my-8'>
              <span className='inline-block cursor-pointer py-2 px-5 bg-[#545454] text-white' onClick={() => setFilterValues({
                page_offset: filters.page_offset + 1
              })}>Load More</span>
            </div>
          }

          {preFilter == 'recentlyviewed' ? recentView.length > 0 ?
            <Grid diamonds={recentView} compareDiamonds={compareDiamonds} setCompareDiamonds={setCompareDiamonds} /> : loading ? <div className="!grid grid-cols-2 gap-y-3 gap-x-2 sm:gap-x-3 lg:gap-x-8 sm:grid-cols-3 lg:grid-cols-4 min-h-[500px]">{fake_data}</div> :
              <div className="text-center py-20 px-3 text-[18px] capitalize">Unfortunately, no diamonds match your selected filters range.</div> : ''
          }

          {preFilter == 'camparediamond' ? compareDiamondData.length > 0 ?
            <Grid diamonds={compareDiamondData} compareDiamonds={compareDiamonds} setCompareDiamonds={setCompareDiamonds} /> : loading ? <div className="!grid grid-cols-2 gap-y-3 gap-x-2 sm:gap-x-3 lg:gap-x-8 sm:grid-cols-3 lg:grid-cols-4 min-h-[500px]">{fake_data}</div> :
              <div className="text-center py-20 px-3 text-[18px] capitalize">NO DIAMONDS AVAILABLE FOR COMPARISON</div> : ''
          }

        </div>
      </div>
    </>
  );
};

export default StartWithDiamond;
