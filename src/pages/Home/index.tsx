import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    SettingOutlined,
    UserOutlined,
    ExperimentOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import AssetsPage from './Containers/AssetsContainer';

const { Content, Sider } = Layout;

const HomePage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <BrowserRouter>
            <Layout style={{ height: '100vh' }}>
                <Sider
                    theme="light"
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    style={{ height: '100vh' }}
                >
                    <Menu defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<SettingOutlined />}>
                            Ativos
                            <Link to="/assets" />
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />}>
                            Usuários
                            <Link to="/users" />
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ExperimentOutlined />}>
                            Unidades
                            <Link to="/units" />
                        </Menu.Item>
                        <Menu.Item key="4" icon={<AppstoreOutlined />}>
                            Empresas
                            <Link to="/companies" />
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexDirection: 'column',
                        margin: 10,
                    }}
                >
                    <Route exact path="/assets" component={AssetsPage} />
                </Content>
            </Layout>
        </BrowserRouter>
    );
};

export default HomePage;
