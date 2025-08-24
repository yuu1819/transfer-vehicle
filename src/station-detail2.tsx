import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TrainComposition from './TrainComposition';
import type { Line, Station } from './home';

const StationDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [stationInfo, setStationInfo] = useState<Station | undefined>({
    name: name || '',
    exit: [],
    equipments: [],
    transfers: [],
  });

  useEffect(() => {
    // fetch(`${import.meta.env.VITE_BASE_URL}/stations2.json`)
    fetch('/stations2.json')
      .then((res) => res.json())
      .then((data: Line) => {
        // console.log('data:', data);
        setStationInfo(data.stations.find((station) => station.name === name));
      });
  }, [name]);

  console.log('stationInfo  :', stationInfo);

  return (
    <div>
      <h1>{name} 駅の詳細ページ</h1>
      <p>ここに詳細情報を追加できます。</p>
      <TrainComposition stationInfo={stationInfo} />
    </div>
  );
};

export default StationDetail;
