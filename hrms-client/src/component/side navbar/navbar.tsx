import React, {useState} from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {Link} from 'react-router-dom'
import './navbar.scss'


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    // getItem('Option 1', '1', <PieChartOutlined />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem( <Link to={'/user/create'} className='side-navbar__button'>Create </Link>, '3', ),
        getItem(<Link className='side-navbar__button' to='/user/detail'>List</Link>, '4', ),
        // getItem('User 2', '4'),
        // getItem('User 3', '5'),
    ]),
    getItem('Employee', 'sub2', <TeamOutlined />, [
        getItem(<Link className='side-navbar__button' to='/employee/create'>Create</Link>, '5'),
        getItem(<Link className='side-navbar__button' to='/employee/search'>Search</Link>, '6'),
    ]),
    // getItem('Files', '9', <FileOutlined />),
];

const Navbar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <div className='side-navbar'>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                {/*<div className="demo-logo-vertical">*/}
                {/*    <h1 style={{color: 'white'}}>HRMS</h1>*/}
                {/*</div>*/}
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{ position: 'unset' }}/>
            </Sider>
        </div>
    );
};

export default Navbar;