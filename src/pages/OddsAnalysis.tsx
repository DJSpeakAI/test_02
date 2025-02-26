import React from 'react';
import { Card, Table, Space, Tag } from 'antd';


interface OddsData {
  id: number;
  match: string;
  league: string;
  homeWin: number;
  draw: number;
  awayWin: number;
  predictedResult: string;
  confidence: number;
}

export const mockOddsData: OddsData[] = [
  {
    id: 1,
    match: '曼城 vs 利物浦',
    league: '英超',
    homeWin: 2.05,
    draw: 3.50,
    awayWin: 3.75,
    predictedResult: '主胜',
    confidence: 65
  },
  {
    id: 2,
    match: '拜仁慕尼黑 vs 多特蒙德',
    league: '德甲',
    homeWin: 1.85,
    draw: 3.80,
    awayWin: 4.20,
    predictedResult: '主胜',
    confidence: 70
  },
  {
    id: 3,
    match: '巴塞罗那 vs 皇家马德里',
    league: '西甲',
    homeWin: 2.40,
    draw: 3.40,
    awayWin: 3.00,
    predictedResult: '客胜',
    confidence: 55
  }
];

const columns = [
  {
    title: '联赛',
    dataIndex: 'league',
    key: 'league',
  },
  {
    title: '比赛',
    dataIndex: 'match',
    key: 'match',
  },
  {
    title: '主胜',
    dataIndex: 'homeWin',
    key: 'homeWin',
    render: (value: number) => value.toFixed(2)
  },
  {
    title: '平局',
    dataIndex: 'draw',
    key: 'draw',
    render: (value: number) => value.toFixed(2)
  },
  {
    title: '客胜',
    dataIndex: 'awayWin',
    key: 'awayWin',
    render: (value: number) => value.toFixed(2)
  },
  {
    title: '预测结果',
    dataIndex: 'predictedResult',
    key: 'predictedResult',
    render: (result: string) => (
      <Tag color={result === '主胜' ? 'green' : result === '平局' ? 'orange' : 'blue'}>
        {result}
      </Tag>
    )
  },
  {
    title: '置信度',
    dataIndex: 'confidence',
    key: 'confidence',
    render: (value: number) => (
      <span style={{ color: value >= 70 ? 'green' : value >= 50 ? 'orange' : 'red' }}>
        {value}%
      </span>
    )
  }
];

interface CombinedStrategy {
  matches: string[];
  bets: Array<{
    match: string;
    type: string;
    amount: number;
    odds: number;
  }>;
  totalAmount: number;
  expectedReturn: number;
  expectedValue: number;
  riskLevel: string;
}

// 导出函数以便在其他组件中使用
export const generateCombinedStrategies = (data: OddsData[]): CombinedStrategy[] => {
  const strategies: CombinedStrategy[] = [
    {
      matches: data.slice(0, 2).map(d => d.match),
      bets: [
        {
          match: data[0].match,
          type: '主胜',
          amount: 600,
          odds: data[0].homeWin
        },
        {
          match: data[1].match,
          type: '主胜',
          amount: 400,
          odds: data[1].homeWin
        }
      ],
      totalAmount: 1000,
      expectedReturn: 600 * data[0].homeWin + 400 * data[1].homeWin,
      expectedValue: (600 * data[0].homeWin + 400 * data[1].homeWin) - 1000,
      riskLevel: '中等'
    },
    {
      matches: data.map(d => d.match),
      bets: [
        {
          match: data[0].match,
          type: '主胜',
          amount: 400,
          odds: data[0].homeWin
        },
        {
          match: data[1].match,
          type: '平局',
          amount: 300,
          odds: data[1].draw
        },
        {
          match: data[2].match,
          type: '客胜',
          amount: 300,
          odds: data[2].awayWin
        }
      ],
      totalAmount: 1000,
      expectedReturn: 400 * data[0].homeWin + 300 * data[1].draw + 300 * data[2].awayWin,
      expectedValue: (400 * data[0].homeWin + 300 * data[1].draw + 300 * data[2].awayWin) - 1000,
      riskLevel: '高'
    },
    {
      matches: [data[0].match],
      bets: [
        {
          match: data[0].match,
          type: '主胜',
          amount: 1000,
          odds: data[0].homeWin
        }
      ],
      totalAmount: 1000,
      expectedReturn: 1000 * data[0].homeWin,
      expectedValue: (1000 * data[0].homeWin) - 1000,
      riskLevel: '保守'
    }
  ];
  return strategies;
};

const OddsAnalysis: React.FC = () => {
// 暂时注释掉未使用的状态变量，等后续需要时再启用
// const [activeTab, setActiveTab] = useState('1');
// 暂时注释掉未使用的变量，等后续需要时再启用
// const combinedStrategies = generateCombinedStrategies(mockOddsData);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Card bordered={false}>
        <Table
          columns={columns}
          dataSource={mockOddsData}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </Space>
  );
};

export default OddsAnalysis;