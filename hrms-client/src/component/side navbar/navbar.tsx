import React, {useState} from 'react';
import {
    FormOutlined,
    SolutionOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom'
import './navbar.scss'

const { Sider } = Layout;

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
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Create', '1', <Link to={'/user/create'} className='side-navbar__button'><FormOutlined/></Link>),
        getItem('List', '2', <Link to={'/user/detail'} className='side-navbar__button'><SolutionOutlined/></Link>),
        // getItem( <Link to={'/user/create'} className='side-navbar__button'>Create</Link>, '3', ),
        // getItem(<Link className='side-navbar__button' to='/user/detail'>List</Link>, '4', ),
    ]),
    getItem('Employee', 'sub2', <TeamOutlined />, [
        getItem('Create', '3', <Link to={'/employee/create'} className='side-navbar__button'><FormOutlined/></Link>),
        getItem('List', '4', <Link to='/employee/search' className='side-navbar__button'><SolutionOutlined/></Link>),

        // getItem(<Link className='side-navbar__button' to='/employee/create'>Create</Link>, '5'),
        // getItem(<Link className='side-navbar__button' to='/employee/search'>Search</Link>, '6'),
    ]),
];


const Navbar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className='side-navbar'>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{ position: 'unset' }}/>
            </Sider>
        </div>
    );
};

export default Navbar;