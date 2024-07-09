import React from "react";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import {
  TiHeartFullOutline,
  TiHeartHalfOutline,
  TiHeartOutline,
} from "react-icons/ti";

interface StarsProps {
  convenience: number;
}

export default function Stars({ convenience }: StarsProps) {
  return (
    <div className="justify-end p-4 flex items-center">
      <h3 className="text-sm mr-2 font-bold text-gray-500">
        시설&편의성은 어떠셨나요?
      </h3>
      <div className="flex items-center">
        <Rate
          value={convenience}
          character={({ index }) => {
            const style = { fontSize: "13px", margin: "0", padding: "0" };
            if (index + 1 <= convenience) {
              return <TiHeartFullOutline className="text-orange-400" />;
            } else if (index + 0.5 === convenience) {
              return <TiHeartHalfOutline className="text-orange-400" />;
            } else {
              return <TiHeartOutline className="text-orange-400" />;
            }
          }}
          count={5}
          allowHalf
          readOnly
          style={{
            display: "flex",
            gap: "0px",
            margin: "0",
            padding: "0",
            pointerEvents: "none",
          }}
        />
      </div>
      <p className="text-gray-500 font-bold">{convenience}</p>
    </div>
  );
}
