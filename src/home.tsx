import 'reactflow/dist/style.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactFlow, { Background, Controls } from 'reactflow';
import type { Node, Edge } from 'reactflow';

type Station = {
  name: string;
  line: string;
};

const Home: React.FC = () => {
  const [, setStations] = useState<Station[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    fetch('/stations.json')
      .then((res) => res.json())
      .then((data: Station[]) => {
        setStations(data);

        // 駅ノードを左から右に並べる
        const newNodes = data.map(
          (station, index) =>
            ({
              id: station.name,
              position: { x: index * 150, y: 100 },
              data: {
                label: (
                  <Link to={`/station/${encodeURIComponent(station.name)}`}>{station.name}</Link>
                ),
              },
              style: {
                width: 60, // 横幅
                height: 120, // 縦幅（長くする）
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #999',
                padding: 10,
                borderRadius: 5,
                backgroundColor: '#fff',
              },
              sourcePosition: 'right',
              targetPosition: 'left',

              // 点を消したい
              // type: 'default',
            } as Node)
        );

        // 駅を順番につなぐ線（エッジ）を作成
        const newEdges = data.slice(1).map((station, index) => ({
          id: `e${data[index].name}-${station.name}`,
          source: data[index].name,
          target: station.name,
          type: 'smoothstep',
        }));

        setNodes(newNodes);
        setEdges(newEdges);
      });
  }, []);

  return (
    <div style={{ height: '400px' }}>
      <h1>路線図</h1>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        zoomOnScroll={false} // 拡大・縮小（ホイールズーム）無効
        zoomOnPinch={false} // ピンチズーム無効
        zoomOnDoubleClick={false} // ダブルクリックズーム無効
        panOnDrag={false} // パン（ドラッグ移動）無効
        panOnScroll={false} // スクロールでパンも無効
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Home;
