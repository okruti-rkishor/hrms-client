import React, {useContext, useState} from 'react';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {
    FormOutlined,
    SearchOutlined,
    SettingOutlined,
    SolutionOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {
    AppstoreOutlined,
    CalendarOutlined, CheckSquareOutlined,
    DiffOutlined,
    GiftOutlined,
    HomeOutlined,
    ScheduleOutlined,
    SoundOutlined,
    StarOutlined,
} from "@ant-design/icons/lib";
import '../../styles/component/navbar.scss';
import UserLoginContext from "../../context/userLoginContext";
import {checkUserRole} from "../../utility/utility";

const items = [
    [
        {
            label: <Link to='/' className="nav-home">Home</Link>,
            key: 'home',
            icon: <HomeOutlined className="custom-home-icon"/>,
        },
        {
            label: 'Employee',
            key: 'employee',
            icon: <TeamOutlined/>,

            children: [
                {
                    label: (
                        <Link to='/employee/search' className="sub-menu" id="employee-search">Search</Link>
                    ),
                    key: 'employee search',
                    icon: <SearchOutlined/>,
                },
                {
                    label: (
                        <Link to='/employee/documentNew' className="sub-menu">Documents</Link>
                    ),
                    key: 'Document',
                    icon: <DiffOutlined/>,
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
                        <Link to='/event/birthday' className="sub-menu">Birthday</Link>
                    ),
                    key: 'birthday',
                    icon: <GiftOutlined/>,
                },
                {
                    label: (
                        <Link to='/event/anniversary' className="sub-menu">Work Anniversary</Link>
                    ),
                    key: 'work anniversary',
                    icon: <StarOutlined/>,
                },
                {
                    label: (
                        <Link to='/event/customEvents' className="sub-menu">Announcements</Link>
                    ),
                    key: 'Announcements',
                    icon: <SoundOutlined/>
                },
            ],
        },
        {
            label: <Link to='/leave' className="nav-home">Leaves</Link>,
            key: 'leaves',
            icon: <CalendarOutlined  className="custom-home-icon"/>,
        },
    ],
    [
        {
            label: <Link to='/' className="nav-home">Home</Link>,
            key: 'home',
            icon: <HomeOutlined className="custom-home-icon"/>,
        },
        {

            label: (
                <Link to='/user/userNew' >User</Link>
            ),
            key: 'new user ',
            icon: <UserOutlined />,

           // children: [
                // {
                //     label: (
                //         <Link to='/user/create' className="sub-menu">Create</Link>
                //     ),
                //     key: 'user create',
                //     icon: <FormOutlined/>,
                // },

                // {
                //     label: (
                //         <Link to='/user/userNew' >User</Link>
                //     ),
                //     key: 'new user ',
                //     icon: <CheckSquareOutlined />,
                // },
                // {
                //     label: (
                //         <Link to='/user/list' className="sub-menu">List</Link>
                //     ),
                //     key: 'user list',
                //     icon: <SolutionOutlined/>,
                // },
                // {
                //     label: (
                //         <Link to='/user/detail' className="sub-menu">Details</Link>
                //     ),
                //     key: 'user detail',
                //     icon: <SolutionOutlined/>,
                // },
        //    ],
        },
        {
            label: 'Employee',
            key: 'employee',
            icon: <TeamOutlined/>,
            children: [
                {
                    label: (
                        <Link to='/employee/create' className="sub-menu">Create</Link>
                    ),
                    key: 'employee create',
                    icon: <FormOutlined/>,
                },
                {
                    label: (
                        <Link to='/employee/search' className="sub-menu">Search</Link>
                    ),
                    key: 'employee search',
                    icon: <SearchOutlined/>,
                },
                {
                    label: (
                        <Link to='/employee/documentNew' className="sub-menu">Documents</Link>
                    ),
                    key: 'Document',
                    icon: <DiffOutlined/>,
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
                        <Link to='/event/birthday' className="sub-menu" id="birthday">Birthday</Link>
                    ),
                    key: 'birthday',
                    icon: <GiftOutlined/>,
                },
                {
                    label: (
                        <Link to='/event/anniversary'>Work Anniversary</Link>
                    ),
                    key: 'work anniversary',
                    icon: <StarOutlined/>,
                },

                {
                    label: (
                        <Link to='/event/eventCreate' className="sub-menu" id="event-create">Custom Event</Link>
                    ),
                    key: 'CustomEvent',
                    icon: <ScheduleOutlined/>
                },
                {
                    label: (
                        <Link to='/event/customEvents' className="sub-menu" id="announcement">Announcements</Link>
                    ),
                    key: 'Announcements',
                    icon: <SoundOutlined/>
                },
            ],
        },
        {
            label: <Link to='/leave' className="nav-home">Leaves</Link>,
            key: 'leaves',
            icon: <CalendarOutlined className="custom-home-icon"/>,
        },
        {
            label: <Link to='/setting'>Settings</Link>,
            key: 'setting',
            icon: <SettingOutlined/>,
        }
    ]
];


const NavigationMenu: React.FC = () => {
    const [current, setCurrent] = useState('');
    const {newUser} = useContext<any>(UserLoginContext);

    const isEmployee = () => {
        if (newUser.loginStatus && checkUserRole(newUser)
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
                  mode="inline"
                  items={items && isEmployee() ? items[0] : items[1]}
                  className='navigation-menu'
            />
        </section>

    );
};

export default NavigationMenu;