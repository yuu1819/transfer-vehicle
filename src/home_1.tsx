import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Station = {
  name: string;
  line: string;
};

const Home: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    fetch('stations.json')
      .then((res) => res.json())
      .then((data) => setStations(data));
  }, []);

  return (
    <div>
      <h1>駅一覧</h1>
      <ul>
        {stations.map((station, index) => (
          <li key={index}>
            <Link to={`/station/${encodeURIComponent(station.name)}`}>
              {station.name}（{station.line}）
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
