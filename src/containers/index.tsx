import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    SettingOutlined,
    UserOutlined,
    ExperimentOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import AssetsPage from './AssetsContainer';
import UsersPage from './UsersContainer';
import UnitsPage from './UnitsContainer';
import CompaniesPage from './CompaniesContainer';

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
                    <Menu mode="inline">
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
                        margin: 20,
                    }}
                >
                    <Route exact path="/assets" component={AssetsPage} />
                    <Route exact path="/" component={AssetsPage} />
                    <Route exact path="/users" component={UsersPage} />
                    <Route exact path="/units" component={UnitsPage} />
                    <Route exact path="/companies" component={CompaniesPage} />
                </Content>
            </Layout>
        </BrowserRouter>
    );
};

export default HomePage;
