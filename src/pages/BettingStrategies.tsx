import React from 'react';
import { Card, Space, Tag, Typography, Row, Col, Statistic } from 'antd';
import { mockOddsData } from './OddsAnalysis';

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

const generateCombinedStrategies = (data: typeof mockOddsData): CombinedStrategy[] => {
  if (!data || data.length === 0) return [];

  const strategies: CombinedStrategy[] = [
    {
      matches: data.slice(0, 2).map(d => d.match),
      bets: [
        {
          match: data[0].match,
          type: data[0].predictedResult,
          amount: 600,
          odds: data[0].homeWin
        },
        {
          match: data[1]?.match || '',
          type: data[1]?.predictedResult || '',
          amount: 400,
          odds: data[1]?.homeWin || 0
        }
      ],
      totalAmount: 1000,
      expectedReturn: data[1] ? (600 * data[0].homeWin + 400 * data[1].homeWin) : (600 * data[0].homeWin),
      expectedValue: data[1] ? ((600 * data[0].homeWin + 400 * data[1].homeWin) - 1000) : ((600 * data[0].homeWin) - 1000),
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
          match: data[1]?.match || '',
          type: '平局',
          amount: 300,
          odds: data[1]?.draw || 0
        },
        {
          match: data[2]?.match || '',
          type: '客胜',
          amount: 300,
          odds: data[2]?.awayWin || 0
        }
      ],
      totalAmount: 1000,
      expectedReturn: (400 * data[0].homeWin) + 
                     (data[1] ? 300 * data[1].draw : 0) + 
                     (data[2] ? 300 * data[2].awayWin : 0),
      expectedValue: ((400 * data[0].homeWin) + 
                    (data[1] ? 300 * data[1].draw : 0) + 
                    (data[2] ? 300 * data[2].awayWin : 0)) - 1000,
      riskLevel: '高'
    },
    {
      matches: [data[0].match],
      bets: [
        {
          match: data[0].match,
          type: data[0].predictedResult,
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

const BettingStrategies: React.FC = () => {
  const combinedStrategies = generateCombinedStrategies(mockOddsData);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Card
        title={
          <Space>
            <span>智能投注组合建议</span>
            <Tag color="blue">总投注金额: ¥1000</Tag>
            <Tag color="purple">专业投注分析</Tag>
          </Space>
        }
        bordered={false}
      >
        {combinedStrategies.map((strategy, index) => (
          <Card
            key={index}
            type="inner"
            title={
              <Space>
                <span>投注组合 {index + 1}</span>
                <Tag color={strategy.riskLevel === '保守' ? 'green' : strategy.riskLevel === '中等' ? 'orange' : 'red'}>
                  {strategy.riskLevel}风险
                </Tag>
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <Typography.Paragraph>
              <strong>涉及比赛：</strong>{strategy.matches.join('、')}
            </Typography.Paragraph>
            <Row gutter={[16, 16]}>
              {strategy.bets.map((bet, betIndex) => (
                <Col span={8} key={betIndex}>
                  <Card size="small" className="betting-card">
                    <Statistic
                      title={<Typography.Text strong>{bet.match}</Typography.Text>}
                      value={bet.amount}
                      precision={0}
                      prefix="¥"
                      suffix={
                        <Typography.Text type="secondary">
                          {bet.type} (赔率: {bet.odds.toFixed(2)})
                        </Typography.Text>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={8}>
                <Card size="small" className="summary-card">
                  <Statistic
                    title={<Typography.Text strong>总投注额</Typography.Text>}
                    value={strategy.totalAmount}
                    prefix="¥"
                    precision={0}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" className="summary-card">
                  <Statistic
                    title={<Typography.Text strong>预期收益</Typography.Text>}
                    value={strategy.expectedReturn}
                    prefix="¥"
                    precision={2}
                    valueStyle={{ color: strategy.expectedReturn > strategy.totalAmount ? '#3f8600' : '#cf1322' }}
                  />
                  <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                    收益率: {((strategy.expectedReturn / strategy.totalAmount - 1) * 100).toFixed(2)}%
                  </Typography.Text>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" className="summary-card">
                  <Statistic
                    title={<Typography.Text strong>期望值(EV)</Typography.Text>}
                    value={strategy.expectedValue}
                    prefix="¥"
                    precision={2}
                    valueStyle={{ color: strategy.expectedValue > 0 ? '#3f8600' : '#cf1322' }}
                  />
                  <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                    {strategy.expectedValue > 0 ? '推荐投注' : '谨慎投注'}
                    <br />
                    胜率预测: {((strategy.expectedReturn / (strategy.totalAmount * 2)) * 100).toFixed(1)}%
                  </Typography.Text>
                </Card>
              </Col>
            </Row>
          </Card>
        ))}
      </Card>
    </Space>
  );
};

export default BettingStrategies;