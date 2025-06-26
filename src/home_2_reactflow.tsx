import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactFlow, { Background, Controls } from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

type Station = {
  name: string;
  line: string;
};

const Home: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    fetch('/stations.json')
      .then((res) => res.json())
      .then((data: Station[]) => {
        setStations(data);

        // 駅ノードを左から右に並べる
        const newNodes = data.map((station, index) => ({
          id: station.name,
          position: { x: index * 150, y: 100 },
          data: {
            label: (
              <Link to={`/station/${encodeURIComponent(station.name)}`}>
                {station.name}
              </Link>
            ),
          },
          style: {
            border: '1px solid #999',
            padding: 10,
            borderRadius: 5,
            backgroundColor: '#fff',
          },
        }));

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
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Home;
