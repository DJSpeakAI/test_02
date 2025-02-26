import React from 'react';
import { Table, Card, Tabs, Space, Tag } from 'antd';
import type { TabsProps } from 'antd';
import type { ColumnType } from 'antd/es/table';

interface TeamStats {
  id: number;
  team: string;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

interface PlayerStats {
  id: number;
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  matches: number;
}

const mockTeamStats: TeamStats[] = [
  {
    id: 1,
    team: '曼城',
    matches: 16,
    wins: 12,
    draws: 3,
    losses: 1,
    goalsFor: 42,
    goalsAgainst: 16,
    points: 39
  },
  {
    id: 2,
    team: '利物浦',
    matches: 16,
    wins: 11,
    draws: 4,
    losses: 1,
    goalsFor: 36,
    goalsAgainst: 15,
    points: 37
  },
  {
    id: 3,
    team: '阿森纳',
    matches: 16,
    wins: 11,
    draws: 3,
    losses: 2,
    goalsFor: 33,
    goalsAgainst: 15,
    points: 36
  }
];

const mockPlayerStats: PlayerStats[] = [
  {
    id: 1,
    name: '哈兰德',
    team: '曼城',
    position: '前锋',
    goals: 14,
    assists: 5,
    matches: 15
  },
  {
    id: 2,
    name: '萨拉赫',
    team: ' Liverpool',
    position: '前锋',
    goals: 11,
    assists: 7,
    matches: 16
  },
  {
    id: 3,
    name: '萨卡',
    team: '阿森纳',
    position: '前锋',
    goals: 6,
    assists: 8,
    matches: 16
  }
];

const teamColumns: ColumnType<TeamStats>[] = [
  {
    title: '球队',
    dataIndex: 'team',
    key: 'team',
    width: 150,
    fixed: 'left',
    filters: Array.from(new Set(mockTeamStats.map(team => team.team))).map(team => ({ text: team, value: team })),
    onFilter: (value: React.Key | boolean, record: TeamStats) => {
      if (typeof value !== 'string' || !record.team) return false;
      return record.team.toLowerCase().includes(value.toString().toLowerCase());
    },
  },
  {
    title: '场次',
    dataIndex: 'matches',
    key: 'matches',
    width: 100,
    sorter: (a: TeamStats, b: TeamStats) => a.matches - b.matches,
    render: (matches: number) => <span style={{ fontWeight: 'bold' }}>{matches}</span>,
  },
  {
    title: '胜',
    dataIndex: 'wins',
    key: 'wins',
    width: 100,
    sorter: (a: TeamStats, b: TeamStats) => a.wins - b.wins,
    render: (wins: number) => <span style={{ color: wins >= 10 ? '#52c41a' : wins >= 8 ? '#1890ff' : 'inherit', fontWeight: 'bold' }}>{wins}</span>,
  },
  {
    title: '平',
    dataIndex: 'draws',
    key: 'draws',
    width: 100,
    sorter: (a: TeamStats, b: TeamStats) => a.draws - b.draws,
    render: (draws: number) => <span style={{ color: draws >= 5 ? '#faad14' : 'inherit' }}>{draws}</span>,
  },
  {
    title: '负',
    dataIndex: 'losses',
    key: 'losses',
    width: 100,
    sorter: (a: TeamStats, b: TeamStats) => a.losses - b.losses,
    render: (losses: number) => <span style={{ color: losses <= 2 ? '#52c41a' : losses >= 5 ? '#f5222d' : '#faad14' }}>{losses}</span>,
  },
  {
    title: '进球',
    dataIndex: 'goalsFor',
    key: 'goalsFor',
    width: 100,
    sorter: (a: TeamStats, b: TeamStats) => a.goalsFor - b.goalsFor,
    render: (goals: number) => <span style={{ color: goals >= 30 ? '#52c41a' : goals >= 20 ? '#1890ff' : 'inherit', fontWeight: 'bold' }}>{goals}</span>,
  },
  {
    title: '失球',
    dataIndex: 'goalsAgainst',
    key: 'goalsAgainst',
    width: 100,
    sorter: (a: TeamStats, b: TeamStats) => a.goalsAgainst - b.goalsAgainst,
    render: (goals: number) => <span style={{ color: goals <= 15 ? '#52c41a' : goals >= 25 ? '#f5222d' : '#faad14' }}>{goals}</span>,
  },
  {
    title: '积分',
    dataIndex: 'points',
    key: 'points',
    width: 100,
    fixed: 'right',
    sorter: (a: TeamStats, b: TeamStats) => a.points - b.points,
    defaultSortOrder: 'descend',
    render: (points: number) => <span style={{ color: points >= 35 ? '#52c41a' : points >= 30 ? '#1890ff' : 'inherit', fontWeight: 'bold', fontSize: '16px' }}>{points}</span>,
  },
];

const playerColumns: ColumnType<PlayerStats>[] = [
  {
    title: '球员',
    dataIndex: 'name',
    key: 'name',
    width: 120,
    fixed: 'left',
    filterSearch: true,
    filters: Array.from(new Set(mockPlayerStats.map(player => player.name))).map(name => ({ text: name, value: name })),
    onFilter: (value: React.Key | boolean, record: PlayerStats) => {
      if (typeof value !== 'string' || !record.name) return false;
      return record.name.toLowerCase().includes(value.toString().toLowerCase());
    },
  },
  {
    title: '球队',
    dataIndex: 'team',
    key: 'team',
    width: 120,
    fixed: 'left',
    filters: Array.from(new Set(mockPlayerStats.map(player => player.team))).map(team => ({ text: team, value: team })),
    onFilter: (value: React.Key | boolean, record: PlayerStats) => {
      if (typeof value !== 'string' || !record.team) return false;
      return record.team.toLowerCase().includes(value.toString().toLowerCase());
    },
  },
  {
    title: '位置',
    dataIndex: 'position',
    key: 'position',
    width: 100,
    filters: [
      { text: '前锋', value: '前锋' },
      { text: '中场', value: '中场' },
      { text: '后卫', value: '后卫' },
    ],
    onFilter: (value: React.Key | boolean, record: PlayerStats) => {
      if (typeof value !== 'string') return false;
      return record.position === value;
    },
    render: (position: string) => (
      <Tag color={position === '前锋' ? 'red' : position === '中场' ? 'blue' : 'green'}>
        {position}
      </Tag>
    ),
  },
  {
    title: '进球',
    dataIndex: 'goals',
    key: 'goals',
    width: 100,
    sorter: {
      compare: (a: PlayerStats, b: PlayerStats) => a.goals - b.goals,
      multiple: 3
    },
    defaultSortOrder: 'descend',
    render: (goals: number) => <span style={{ color: goals >= 10 ? '#52c41a' : goals >= 5 ? '#1890ff' : 'inherit' }}>{goals}</span>,
  },
  {
    title: '助攻',
    dataIndex: 'assists',
    key: 'assists',
    width: 100,
    sorter: {
      compare: (a: PlayerStats, b: PlayerStats) => a.assists - b.assists,
      multiple: 2
    },
    render: (assists: number) => <span style={{ color: assists >= 7 ? '#52c41a' : assists >= 4 ? '#1890ff' : 'inherit' }}>{assists}</span>,
  },
  {
    title: '出场',
    dataIndex: 'matches',
    key: 'matches',
    width: 100,
    sorter: {
      compare: (a: PlayerStats, b: PlayerStats) => a.matches - b.matches,
      multiple: 1
    },
  },
];

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '球队数据',
    children: (
      <Table
        columns={teamColumns}
        dataSource={mockTeamStats}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条数据`,
          position: ['bottomLeft']
        }}
        loading={false}
        scroll={{ x: 'max-content', y: 400 }}
        onChange={(pagination, filters, sorter) => {
          console.log('表格变化:', { pagination, filters, sorter });
        }}
        size="middle"
        bordered
        sticky
      />
    ),
  },
  {
    key: '2',
    label: '球员数据',
    children: (
      <Table
        columns={playerColumns}
        dataSource={mockPlayerStats}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条数据`,
          position: ['bottomLeft']
        }}
        loading={false}
        scroll={{ x: 'max-content', y: 400 }}
        onChange={(pagination, filters, sorter) => {
          console.log('表格变化:', { pagination, filters, sorter });
        }}
        size="middle"
        bordered
        sticky
      />
    ),
  },
];

const MatchData: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Card title="英超联赛数据">
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </Space>
  );
};

export default MatchData;