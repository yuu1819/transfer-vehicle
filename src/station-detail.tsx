import React from 'react';
import { useParams } from 'react-router-dom';

const StationDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>
      <h1>{name} 駅の詳細ページ</h1>
      <p>ここに詳細情報を追加できます。</p>
    </div>
  );
};

export default StationDetail;
