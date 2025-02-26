import React from 'react';
import { Row, Col, Card, List } from 'antd';
import { TeamOutlined, FireOutlined } from '@ant-design/icons';

// 移除未使用的 Title 导入

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  league: string;
  matchTime: string;
}

interface News {
  id: number;
  title: string;
  date: string;
}

const mockMatches: Match[] = [
  {
    id: 1,
    homeTeam: '曼城',
    awayTeam: '利物浦',
    league: '英超',
    matchTime: '2023-12-25 20:00'
  },
  {
    id: 2,
    homeTeam: '拜仁慕尼黑',
    awayTeam: '多特蒙德',
    league: '德甲',
    matchTime: '2023-12-26 21:30'
  },
  {
    id: 3,
    homeTeam: '巴塞罗那',
    awayTeam: '皇家马德里',
    league: '西甲',
    matchTime: '2023-12-27 22:00'
  }
];

const mockNews: News[] = [
  {
    id: 1,
    title: '英超最新积分榜：阿森纳领跑，利物浦紧随其后',
    date: '2023-12-24'
  },
  {
    id: 2,
    title: '欧冠16强对阵出炉：巴黎对阵皇马成焦点之战',
    date: '2023-12-23'
  },
  {
    id: 3,
    title: '德甲冬歇期转会市场：拜仁有意引进新中卫',
    date: '2023-12-22'
  }
];

const Home: React.FC = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} lg={14}>
        <Card
          title={
            <span>
              <TeamOutlined /> 近期比赛
            </span>
          }
        >
          <List
            dataSource={mockMatches}
            renderItem={(match) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <span>
                      {match.league} - {match.homeTeam} vs {match.awayTeam}
                    </span>
                  }
                  description={`比赛时间：${match.matchTime}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col span={24} lg={10}>
        <Card
          title={
            <span>
              <FireOutlined /> 热门资讯
            </span>
          }
        >
          <List
            dataSource={mockNews}
            renderItem={(news) => (
              <List.Item>
                <List.Item.Meta
                  title={news.title}
                  description={`发布日期：${news.date}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Home;