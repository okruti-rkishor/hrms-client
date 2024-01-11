import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './tempFile.scss';

interface DataType {
    key: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string[];
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: DataType;
    index: number;
    children: React.ReactNode;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'First name',
        dataIndex: 'firstName',
        key: 'first name',
        // render: (text) => <a>{text}</a>,
    },
    {
        title: 'Last name',
        dataIndex: 'lastName',
        key: 'last name',
        // render: (text) => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        key: 'role',
        dataIndex: 'role',
        render: (_, { role }) => (
            <>
                {role.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        firstName: 'Gaurav',
        lastName: 'Joshi',
        email: "gjoshi@okruti.com",
        role: ['nice', 'developer']
    },
    {
        key: '2',
        firstName: 'John',
        lastName: 'Brown',
        email: "john@okruti.com",
        role: ['developer']
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        email: "joe@okruti.com",
        role: ['cool', 'teacher']
    },
];

const TempFile: React.FC = () => <Table columns={columns} dataSource={data} />;

export default TempFile;