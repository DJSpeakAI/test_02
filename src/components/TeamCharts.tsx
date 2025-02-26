import React, { useEffect, useState } from 'react';
import { Card, Spin, Switch, Alert } from 'antd';
// 需要先安装依赖: npm install --save echarts-for-react @types/echarts
import ReactECharts from 'echarts-for-react';
import { getTeamPointsTrend, getTeamGoalsStats } from '../services/api';

interface TeamPointsTrend {
  name: string;
  value: number;
  wins: number;
  draws: number;
  losses: number;
}

interface TeamGoalsStats {
  team: string;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

const TeamCharts: React.FC<{}> = () => {
  const [pointsTrendData, setPointsTrendData] = useState<TeamPointsTrend[]>([]);
  const [goalsStatsData, setGoalsStatsData] = useState<TeamGoalsStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
// 定义刷新间隔时间（毫秒）
const refreshInterval = 30000;
  const [lastUpdateTime, setLastUpdateTime] = useState<string>('');
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pointsRes, goalsRes] = await Promise.all([
          getTeamPointsTrend({ league: '英超', season: '2023-2024' }),
          getTeamGoalsStats({ league: '英超', season: '2023-2024' })
        ]);
        setPointsTrendData(prevData => {
          const newData = pointsRes.data;
          return JSON.stringify(prevData) !== JSON.stringify(newData) ? newData : prevData;
        });
        setGoalsStatsData(prevData => {
          const newData = goalsRes.data;
          return JSON.stringify(prevData) !== JSON.stringify(newData) ? newData : prevData;
        });
        setLastUpdateTime(new Date().toLocaleTimeString());
        setError(null);
      } catch (error) {
        console.error('获取数据失败:', error);
        setError('数据加载失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    if (isAutoRefresh) {
      fetchData();
      const intervalId = setInterval(fetchData, refreshInterval);
      return () => clearInterval(intervalId);
    } else {
      fetchData();
    }
  }, [refreshInterval, isAutoRefresh]);

  const getPointsTrendOption = () => ({
    title: {
      text: '球队积分趋势',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const data = params[0].data;
        return `${data.name}<br/>积分: ${data.value}<br/>胜: ${data.wins}<br/>平: ${data.draws}<br/>负: ${data.losses}`;
      },
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#ccc',
      textStyle: {
        color: '#333'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: pointsTrendData.map(item => item.name),
      axisLabel: {
        interval: 0,
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '积分',
      nameTextStyle: {
        padding: [0, 30, 0, 0]
      }
    },
    series: [
      {
        name: '积分',
        type: 'line',
        smooth: true,
        data: pointsTrendData.map(item => ({
          name: item.name,
          value: item.value,
          wins: item.wins,
          draws: item.draws,
          losses: item.losses
        })),
        markPoint: {
          data: [
            { type: 'max', name: '最高积分' },
            { type: 'min', name: '最低积分' }
          ]
        },
        lineStyle: {
          width: 3
        },
        itemStyle: {
          borderWidth: 2
        },
        emphasis: {
          scale: 1.2
        }
      }
    ]
  });

  const getGoalsStatsOption = () => ({
    title: {
      text: '球队进球数据统计',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#ccc',
      textStyle: {
        color: '#333'
      }
    },
    legend: {
      data: ['进球', '失球', '净胜球'],
      top: 30,
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: goalsStatsData.map(item => item.team),
      axisLabel: {
        interval: 0,
        rotate: 45,
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      name: '球数',
      nameTextStyle: {
        padding: [0, 30, 0, 0]
      }
    },
    series: [
      {
        name: '进球',
        type: 'bar',
        data: goalsStatsData.map(item => item.goalsFor),
        itemStyle: {
          color: '#91cc75'
        },
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: '失球',
        type: 'bar',
        data: goalsStatsData.map(item => item.goalsAgainst),
        itemStyle: {
          color: '#ee6666'
        },
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: '净胜球',
        type: 'line',
        data: goalsStatsData.map(item => item.goalDifference),
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#5470c6'
        },
        itemStyle: {
          color: '#5470c6'
        },
        emphasis: {
          scale: 1.2
        }
      }
    ]
  });

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px', alignItems: 'center' }}>
        <Switch
          checked={isAutoRefresh}
          onChange={setIsAutoRefresh}
          checkedChildren="自动刷新"
          unCheckedChildren="手动刷新"
        />
        <span style={{ color: '#888' }}>最后更新时间: {lastUpdateTime}</span>
      </div>
      {error ? (
        <Alert message={error} type="error" showIcon />
      ) : (
        <>
          <Card>
            <ReactECharts 
              option={getPointsTrendOption()} 
              style={{ height: '400px' }} 
              notMerge={true} 
              lazyUpdate={true}
            />
          </Card>
          <Card>
            <ReactECharts 
              option={getGoalsStatsOption()} 
              style={{ height: '400px' }} 
              notMerge={true} 
              lazyUpdate={true}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default TeamCharts;