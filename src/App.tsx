import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import LoginPageEnhanced from './components/LoginPageEnhanced';
import ChatPageEnhanced from './components/ChatPageEnhanced';
import HomePage from './pages/HomePage';
import DemoDashboard from './components/DemoDashboard';
import MapView from './components/MapView';
import SpotList from './pages/SpotList';
import SpotDetail from './pages/SpotDetail';
import AdminDashboard from './pages/AdminDashboard';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
            <Menu.Item key="home"><Link to="/">首页</Link></Menu.Item>
            <Menu.Item key="spots"><Link to="/spots">景点列表</Link></Menu.Item>
            <Menu.Item key="map"><Link to="/map">地图导览</Link></Menu.Item>
            <Menu.Item key="chat"><Link to="/chat">智能客服</Link></Menu.Item>
            <Menu.Item key="admin"><Link to="/admin">管理后台</Link></Menu.Item>
            <Menu.Item key="login" style={{ marginLeft: 'auto' }}><Link to="/login">登录</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: '24px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Routes>
              <Route path="/" element={<DemoDashboard />} />
              <Route path="/spots" element={<SpotList />} />
              <Route path="/spots/:id" element={<SpotDetail />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/chat" element={<ChatPageEnhanced />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<LoginPageEnhanced />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          东里村智能导游系统 ©2024 Created by Jules
        </Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
