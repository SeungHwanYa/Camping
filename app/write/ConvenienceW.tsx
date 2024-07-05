import React, { useState } from "react";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import {
  TiHeartFullOutline,
  TiHeartHalfOutline,
  TiHeartOutline,
} from "react-icons/ti";

export default function Star({ onChange }) {
  const [value, setValue] = useState<number>(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
    console.log(`Rated with value ${newValue}`);
  };
  const iconStyle = { fontSize: "27px" };
  return (
    <div className="p-4 flex items-center justify-end gap-4">
      <h3 className="text-lg font-bold text-gray-500">
        시설&편의성은 어떠셨나요?
      </h3>
      <div className="flex items-center">
        <Rate
          value={value}
          onChange={handleChange}
          character={({ index }) => {
            const className = "cursor-pointer";
            if (index + 1 <= value) {
              return (
                <TiHeartFullOutline
                  className={`${className} text-orange-500`}
                  style={iconStyle}
                />
              );
            } else if (index + 0.5 === value) {
              return (
                <TiHeartHalfOutline
                  className={`${className} text-orange-500`}
                  style={iconStyle}
                />
              );
            } else {
              return (
                <TiHeartOutline
                  className={`${className} text-orange-400`}
                  style={iconStyle}
                />
              );
            }
          }}
          count={5}
          allowHalf
        />
      </div>
      <p className="text-xl font-bold text-gray-400 w-8">{value}</p>
    </div>
  );
}
