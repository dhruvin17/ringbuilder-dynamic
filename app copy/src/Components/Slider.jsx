import React, { useEffect } from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const Slider = ({
  range,
  start,
  onChange,
  label,
  text,
  step,
  showInput,
}) => {

  useEffect(() => {
    if (showInput) {
      document.getElementById(`${label}-min`).value = start[0].toFixed(2);
      document.getElementById(`${label}-max`).value = start[1].toFixed(2);
    }
  }, [start[0], start[1]]);

  const handleSliderChange = (values) => {
    onChange(values);
    if (showInput) {
      UpdateinputValue(values);
    }
  };

  const UpdateinputValue = (values) => {
    if (showInput) {
      document.getElementById(`${label}-min`).value = values[0];
      document.getElementById(`${label}-max`).value = values[1];
    }
  };

  const handleInputBlur = (e, index) => {
    const value = parseFloat(e.target.value);
    const newValues = [...start];
    newValues[index] = value;

    if (
      (index === 0 && (value > start[1] || value < range.min)) ||
      (index === 1 && (value < start[0] || value > range.max))
    ) {
      newValues[index] = index === 0 ? range.min : range.max;
    }

    if (value !== start[index]) handleSliderChange(newValues);
  };

  return (
    <div className="mb-[10px] sm:mb-0">
      <div className="!text-[#bb5f63] !font-semibold mx-4 mb-[5px] sm:mb-0">
        {label}
      </div>
      <div className="relative mx-8">
        <div className="relative mt-6 ml-2 z-[1]">
          {label == "PRICE" ? (
            <Nouislider
              range={range}
              start={start}
              connect={true}
              onChange={handleSliderChange}
              onUpdate={UpdateinputValue}
              step={step}
            />
          ) : (
            <Nouislider
              range={range}
              start={start}
              connect={true}
              onChange={handleSliderChange}
              onUpdate={UpdateinputValue}
              step={step}
              margin={step == 1 ? 1 : 0}
            />
          )}

          {text.length > 0 && (
            <div className="absolute flex left-2 right-2 top-2 h-0 z-[1]">
              {[...Array(text.length - 1)].map((_, index) => (
                <span
                  key={index}
                  className="h-0 after:h-7 after:w-[1px] after:border-l-[1px] border-white relative after:content-[''] after:absolute after:text-white after:-right-[6px] after:-top-[5px]"
                  style={{
                    width: `${100 / text.length}%`,
                  }}
                ></span>
              ))}
            </div>
          )}
        </div>

        {showInput ? (
          <div className="flex w-full mt-8 mx-3 justify-between">
            {[0, 1].map((i) => (
              <input
                key={i}
                type="number"
                className="border px-2 border-gray-300 w-[35%] sm:w-[20%] md:w-[35%] lg:w-[25%] xl:w-[20%]  2xl:w-[15%] focus-visible:outline-none focus-visible:shadow-none appearance-none"
                data-hj-allow="true"
                id={`${label}-${i === 0 ? "min" : "max"}`}
                onBlur={(e) => handleInputBlur(e, i)}
              />
            ))}
          </div>
        ) : (
          <div
            className={`grid_step ${text.length == 10
              ? "grid-cols-10"
              : text.length == 7
                ? "grid-cols-7"
                : text.length == 8
                  ? "grid-cols-8"
                  : text.length == 5
                    ? "grid-cols-5"
                    : "grid-cols-4"
              } ml-4 sm:mt-4`}
          >
            {text?.map((i, index) => (
              <div
                className="text-center text-[10px] sm:text-[14px] md:text-[10px] lg:text-[16px]"
                key={index}
              >
                {" "}
                {i}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
