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

export default function total({ total }) {
  return (
    <div className="p-4 pt-8 rounded-xl bg-white">
      <h3 className="text-3xl font-bold text-gray-500 flex justify-center">
        저의 총평은요???
      </h3>
      <div className="flex items-center justify-center p-4 ">
        <Rate
          value={total}
          character={({ index }) => {
            if (index + 1 <= total) {
              return (
                <TiHeartFullOutline className="text-orange-400 text-3xl " />
              );
            } else if (index + 0.5 === total) {
              return (
                <TiHeartHalfOutline className="text-orange-400  text-3xl" />
              );
            } else {
              return <TiHeartOutline className="text-orange-400  text-3xl" />;
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
        <p className="text-gray-500 font-bold  text-3xl">{total}점!!!!</p>
      </div>
    </div>
  );
}
