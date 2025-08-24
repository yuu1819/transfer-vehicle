// TrainComposition.jsx
import React from 'react';
import './TrainComposition.css';
import type { Station } from './home';

const NUM_CARS = 10;

// propsの型定義 todo react propsの定義方法
type TrainCompositionProps = {
  stationInfo: Station | undefined;
};

// const TrainComposition = ({ props }: { stationInfo: Station | undefined }) => {
//   const exits = props.stationInfo?.exit?.find((exitInfo) => exitInfo.CarNo === 1);

const TrainComposition = ({ stationInfo }: TrainCompositionProps) => {
  // const exits = stationInfo?.exit?.find((exitInfo) => exitInfo.CarNo === 1);

  return (
    <div className="train">
      {Array.from({ length: NUM_CARS }, (_, i) => (
        <>
          {/* 車両 */}
          <div key={i} className="car">
            <div className="car-number">Car {i + 1}</div>
          </div>
          {/* 出口案内 */}
          {/* <div className="car-number">{i}</div> */}
          <CarExit stationInfo={stationInfo} carNo={i + 1} />
        </>
      ))}
    </div>
  );
};

export default TrainComposition;

type CarExitProps = {
  stationInfo: Station | undefined;
  carNo: number;
};

const CarExit = ({ stationInfo, carNo }: CarExitProps) => {
  // console.log(stationInfo);
  console.log(carNo);

  const exits = stationInfo?.exit
    ?.filter((exitInfo) => exitInfo.CarNo === carNo)
    .map((exitInfo) => exitInfo.ExitNo);

  // console.log(exits);

  return (
    <div className="car-exit">
      <span>{exits} Exit</span>
    </div>
  );
};
