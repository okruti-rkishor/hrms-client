import React, {useContext, useState} from 'react';
import type { MenuProps } from 'antd';
import {Menu} from 'antd';
import {
    FormOutlined,
    SolutionOutlined,
    TeamOutlined,
    UserOutlined,
    SearchOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {
    AppstoreOutlined,
    CalendarOutlined,
    EditOutlined,
    FileSearchOutlined,
    UserAddOutlined
} from "@ant-design/icons/lib";
import './navbar.scss';
import UserLoginContext from "../../context/userLoginContext";

const items = [
    [
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
        {
            label: 'Holiday',
            key: 'holiday',
            icon: <CalendarOutlined />,
            children: [
                {
                    label: (
                        <Link to='/holiday/create'>Create</Link>
                    ),
                    key: 'holiday-create',
                },
            ],
        },
    ],
    [
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
        {
            label: 'Holiday',
            key: 'holiday',
            icon: <CalendarOutlined />,
            children: [
                {
                    label: (
                        <Link to='/holiday/create'>Create</Link>
                    ),
                    key: 'holiday-create',
                },
            ],
        },
        {
            label: 'Settings',
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
                {
                    label: (
                        <Link to='/setting/leaves'>Leaves</Link>
                    ),
                    key: 'leave detail',
                    icon: <FormOutlined/>,
                },
            ],
        }
    ]
];


const NavigationMenu: React.FC = () => {
    const [current, setCurrent] = useState('');
    const {newUser} = useContext<any>(UserLoginContext);

    const isEmployee = () => {
        if (newUser.loginStatus && (newUser.roles.includes("ADMIN") || newUser.roles.includes("HR"))) {
            return false;
        }

        return true;
    }

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <Menu onClick={onClick}
              selectedKeys={[current]}
              mode="vertical"
              items={items && isEmployee() ? items[0] : items[1]}
              className='navigation-menu'
        />
    );
};

export default NavigationMenu;