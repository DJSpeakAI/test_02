import React from 'react';
import { Layout, Menu } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import { HomeOutlined, LineChartOutlined, DatabaseOutlined } from '@ant-design/icons';
import Home from './pages/Home';

const { Header, Content, Footer } = Layout;
import MatchData from './pages/MatchData';
import OddsAnalysis from './pages/OddsAnalysis';
import BettingStrategies from './pages/BettingStrategies';

const App: React.FC = () => {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="logo" style={{ color: 'white', marginRight: '20px', fontSize: '18px' }}>足彩资讯</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: <Link to="/">首页</Link>
            },
            {
              key: '2',
              icon: <DatabaseOutlined />,
              label: <Link to="/match-data">比赛数据</Link>
            },
            {
              key: '3',
              icon: <LineChartOutlined />,
              label: <Link to="/odds-analysis">赔率分析</Link>
            },
            {
              key: '4',
              icon: <LineChartOutlined />,
              label: <Link to="/betting-strategies">智能投注组合</Link>
            }
          ]}
        />
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match-data" element={<MatchData />} />
          <Route path="/odds-analysis" element={<OddsAnalysis />} />
          <Route path="/betting-strategies" element={<BettingStrategies />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        足彩资讯网站 ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;