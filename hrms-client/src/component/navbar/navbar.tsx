import React, {useContext, useState} from 'react';
import type {MenuProps} from 'antd';
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
    FileSearchOutlined, HomeOutlined,
    UserAddOutlined
} from "@ant-design/icons/lib";
import '../../styles/component/navbar.scss';
import UserLoginContext from "../../context/userLoginContext";
import { checkUserRole } from "../../utility/utility";

const items = [
    [
        {
            label: <Link to='/'>Home</Link>,
            key: 'home',
            icon: <HomeOutlined/>,
        },
        {
            label: 'Employee',
            key: 'employee',
            icon: <TeamOutlined/>,
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
            icon: <AppstoreOutlined/>,
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
            label: <Link to='/leave'>Leaves</Link>,
            key: 'leaves',
            icon: <CalendarOutlined/>,
        },
    ],
    [
        {
            label: <Link to='/'>Home</Link>,
            key: 'home',
            icon: <HomeOutlined/>,
        },
        {
            label: 'User',
            key: 'user',
            icon: <UserOutlined/>,
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
            icon: <TeamOutlined/>,
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
            icon: <AppstoreOutlined/>,
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
            label: <Link to='/leave'>Leaves</Link>,
            key: 'leaves',
            icon: <CalendarOutlined/>,
        },
        {
            label: <Link to='/setting'>Settings</Link>,
            key: 'setting',
            icon: <EditOutlined/>,
        }
    ]
];


const NavigationMenu: React.FC = () => {
    const [current, setCurrent] = useState('');
    const {newUser} = useContext<any>(UserLoginContext);

    const isEmployee = () => {
        if(newUser.loginStatus && checkUserRole(newUser)
            // (newUser.roles.includes("ADMIN") || newUser.roles.includes("HR"))
        ) {
            return false;
        }

        return true;
    }

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <section className="hrms-navbar">
            <Link to='/' className="hrms-navbar__header">
                <h1 className="hrms-navbar__header-text">HRMS</h1>
            </Link>
            <Menu onClick={onClick}
                  selectedKeys={[current]}
                  mode="vertical"
                  items={items && isEmployee() ? items[0] : items[1]}
                  className='navigation-menu'
            />
        </section>

    );
};

export default NavigationMenu;