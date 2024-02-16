import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {
    FormOutlined,
    SolutionOutlined,
    TeamOutlined,
    UserOutlined,
    SearchOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {AppstoreOutlined, EditOutlined, PhoneOutlined} from "@ant-design/icons/lib";
import './navbar.scss';


const items: MenuProps['items'] = [
    {
        label: 'About',
        key: 'about',
        // icon: <UserOutlined />,
        children: [
            {
                label: (
                    <Link to='#'>Our Story</Link>
                ),
                key: 'our story',
            },
            {
                label: (
                    <Link to='#'>Our Team</Link>
                ),
                key: 'our team',
            },
            {
                label: (
                    <Link to='/contact-us'>Contact Us</Link>
                ),
                key: 'contact us',
                icon: <PhoneOutlined/>,
            },
        ],
    },
    {
        label: 'User',
        key: 'user',
        icon: <UserOutlined />,
        children: [
            {
                label: (
                    <Link to='/user/create'>Create</Link>
                ),
                key: 'user create',
                icon: <FormOutlined/>,
            },
            {
                label: (
                    <Link to='/user/list'>List</Link>
                ),
                key: 'user list',
                icon: <SolutionOutlined/>,
            },
            {
                label: (
                    <Link to='/user/detail'>Details</Link>
                ),
                key: 'user detail',
                icon: <SolutionOutlined/>,
            },
        ],
    },
    {
        label: 'Employee',
        key: 'employee',
        icon: <TeamOutlined />,
        children: [
            {
                label: (
                    <Link to='/employee/create'>Create</Link>
                ),
                key: 'employee create',
                icon: <FormOutlined/>,
            },
            {
                label: (
                    <Link to='/employee/search'>Search</Link>
                ),
                key: 'employee search',
                icon: <SearchOutlined/>,
            }
        ],
    },
    {
        label: 'Enum',
        key: 'enum',
        icon: <EditOutlined />,
        children: [
            {
                label: (
                    <Link to='/enum'>Detail</Link>
                ),
                key: 'enum detail',
                icon: <FormOutlined/>,
            },
        ],
    },
    {
        label: 'Events',
        key: 'events',
        icon: <AppstoreOutlined />,
        children: [
            {
                label: (
                    <Link to='/event/birthday'>Birthday</Link>
                ),
                key: 'birthday',
                icon: <FormOutlined/>,
            },
            {
                label: (
                    <Link to='/event/anniversary'>Work Anniversary</Link>
                ),
                key: 'work anniversary',
                icon: <SearchOutlined/>,
            },
            {
                label: 'Internal Events',
                type: 'group',
                children: [
                    {
                        label: 'Option 1',
                        key: 'custom01',
                    },
                    {
                        label: 'Option 2',
                        key: 'custom02',
                    },
                ],
            },
        ],
    },
    // {
    //     label: (
    //         <Link to='/contact-us'>Contact Us</Link>
    //     ),
    //     key: 'contact',
    //     icon: <PhoneOutlined/>,
    // },
];

const NavigationMenu: React.FC = () => {
    const [current, setCurrent] = useState('');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <Menu style={{width: '100%'}}
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
              className='navigation-menu'
        />
    );
};

export default NavigationMenu;