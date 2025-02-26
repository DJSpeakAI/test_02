import React from 'react';
import { Card, Typography, Row, Col, Statistic, Divider } from 'antd';

interface SmartBettingProps {
  matchOdds: {
    win: number;
    draw: number;
    lose: number;
  };
  prediction: string;
  confidence: number;
}

interface BettingStrategy {
  amount: number;
  expectedReturn: number;
  profitRate: number;
  description: string;
}

const SmartBetting: React.FC<SmartBettingProps> = ({ matchOdds, prediction, confidence }) => {
  const { win, draw, lose } = matchOdds;
  
  const calculateOdds = (predictionType: string) => {
    switch (predictionType) {
      case '胜': return win;
      case '平': return draw;
      case '负': return lose;
      default: return 0;
    }
  };

  const generateStrategies = (): BettingStrategy[] => {
    const odds = calculateOdds(prediction);
    const baseAmount = 1000;
    
    return [
      {
        amount: baseAmount,
        expectedReturn: baseAmount * odds,
        profitRate: ((odds - 1) * 100),
        description: '标准投注'
      },
      {
        amount: baseAmount * 0.5,
        expectedReturn: baseAmount * 0.5 * odds,
        profitRate: ((odds - 1) * 100),
        description: '保守投注'
      },
      {
        amount: baseAmount * 1.5,
        expectedReturn: baseAmount * 1.5 * odds,
        profitRate: ((odds - 1) * 100),
        description: '激进投注'
      }
    ];
  };

  const strategies = generateStrategies();

  const getProfitColor = (rate: number) => {
    if (rate >= 150) return '#f50';
    if (rate >= 100) return '#52c41a';
    if (rate >= 50) return '#1890ff';
    return '#faad14';
  };

  return (
    <Card title="智能投注建议" style={{ marginTop: 24 }}>
      <Typography.Text style={{ marginBottom: 16, display: 'block' }}>
        置信度：{(confidence * 100).toFixed(1)}%
      </Typography.Text>
      {strategies.map((strategy, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Divider />}
          <Row gutter={16}>
            <Col span={24}>
              <Typography.Text strong>{strategy.description}</Typography.Text>
            </Col>
            <Col span={8}>
              <Statistic
                title="投注金额"
                value={strategy.amount}
                prefix="¥"
                precision={2}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="预期收益"
                value={strategy.expectedReturn}
                prefix="¥"
                precision={2}
                valueStyle={{ color: getProfitColor(strategy.profitRate) }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="收益率"
                value={strategy.profitRate}
                suffix="%"
                precision={1}
                valueStyle={{ color: getProfitColor(strategy.profitRate) }}
              />
            </Col>
          </Row>
        </React.Fragment>
      ))}
    </Card>
  );
};

export default SmartBetting;