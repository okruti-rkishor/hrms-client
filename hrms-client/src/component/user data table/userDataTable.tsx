import React, {useEffect, useState} from 'react';
import {Form, Input, Popconfirm, Table, Tag, Typography, Select} from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import './userDataTable.scss';
import restApi from "../../services/http/api";
import {CloseOutlined, EditTwoTone, SaveTwoTone} from "@ant-design/icons/lib";


interface Item {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({   editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {

    const inputNode = inputType === 'number' ? <Select placeholder="Select the role"
                                                       // defaultValue={'EMPLOYEE'}
                                                       style={{ flex: 1 }}
                                                       options={[
                                                           { value: 'ADMIN', label: 'ADMIN' },
                                                           { value: 'HR', label: 'HR' },
                                                           { value: 'EMPLOYEE', label: 'EMPLOYEE' },
                                                           { value: 'GUEST USER', label: 'GUEST USER' },
                                                       ]}
                                                /> : <Input />;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            }
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

const TempFile: React.FC = () => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [userData, setUserData] = useState<Item[]>([]);

    useEffect(()=>{
        usersData();
    },[]);

    const usersData = async () => {
        const response = await restApi.allUsersData();
        const newResponse = response.map((item:any)=>{
            return {
                ...item, email:((item.email).toLowerCase())
            };
        })
        setUserData(newResponse)
    };

    const isEditing = (record: Item) => record.id === editingKey;

    const edit = (record: Item) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: string) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...userData];
            const index = newData.findIndex((item) => key === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setUserData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setUserData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'First name',
            dataIndex: 'firstName',
            width: '15%',
            editable: true,
            sorter: (a:any, b:any) => a.firstName.localeCompare(b.firstName),
        },
        {
            title: 'Last name',
            dataIndex: 'lastName',
            width: '15%',
            editable: true,
            sorter: (a:any, b:any) => a.lastName.localeCompare(b.lastName),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '25%',
            editable: true,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            width: '25%',
            editable: true,
            render: (_:any, { role}:any) => {
                let color;
                if (role === 'ADMIN') {
                    color = 'geekblue';
                } else if(role === 'HR') {
                    color = 'pink';
                } else if(role === 'EMPLOYEE') {
                    color = 'green';
                } else if(role === 'GUEST USER') {
                    color = 'volcano';
                }

                return (
                    <>
                        {role &&
                            <Tag color={color} key={role}>
                                {role.toUpperCase()}
                            </Tag>
                        }
                    </>
                );
            },
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            width: '20%',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                          {/*Save*/}
                          <SaveTwoTone twoToneColor="#52c41a" style={{ fontSize: '18px', marginLeft: '10px' }}/>
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                          {/*<a>Cancel</a>*/}
                          <a><CloseOutlined style={{ color: '#950a11', fontSize: '18px', marginLeft: '10px' }}/></a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        {/*Edit*/}
                        <EditTwoTone style={{ fontSize: '18px', marginLeft: '10px' }}/>
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'role' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div className='user-data-table'>
            <PageHeader
                className="site-page-header"
                title="User Details"
                // breadcrumb={{ }}
                subTitle="The list of all registered users"
            />
            <Form form={form} component={false} >
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    rowKey="id"
                    bordered
                    // dataSource={data}
                    dataSource={userData}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>
    );
};

export default TempFile;