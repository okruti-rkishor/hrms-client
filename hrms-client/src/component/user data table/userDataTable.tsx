import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Form, Input, Popconfirm, Table, Tag, Typography, Select, Layout} from 'antd';
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
    const [navigatedUser] = useSearchParams();


    useEffect(()=>{
        usersData();
    },[]);

    const usersData = async () => {
        try {
            const response = await restApi.allUsersData();
            const newResponse = response.map((item: any) => {
                return {
                    ...item, email: ((item.email).toLowerCase())
                };
            })
            setUserData(newResponse)
        }
        catch(err){
            console.log(err);
        }
    };

    const isEditing = (record: Item) => record.id === editingKey;

    const edit = (record: Item) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const getDefaultFilter=()=>{
        if(navigatedUser.get('userTitle')){
            return [navigatedUser.get('userTitle')];
        }else {
            return [];
        }
    }

    const save = async (key: string) => {
        try {
            const row = (await form.validateFields()) as Item;
            const newData = [...userData];
            const index = newData.findIndex((item) => key === item.id);
            if (index > -1) {
                //call API
                const editedData :any = { ...row};
                // delete editedData.id;
                const editResponse = await restApi.userEdit(editedData,key);
                console.log(editResponse)
                const item :any = newData[index];
                // const item = newData[index];
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
            filters: [
                {
                    text: 'Admin',
                    value: 'ADMIN',
                },
                {
                    text: 'HR',
                    value: 'HR',
                },
                {
                    text: 'Employee',
                    value: 'EMPLOYEE',
                },
            ],
            editable: true,
            defaultFilteredValue: getDefaultFilter(),
            onFilter: (value: any, record: any) => {
               return record.role.includes(value);
            },
            width: '25%',
            render: (_:any, { role}:any) => {
                let color;
                if (role === 'ADMIN') {
                    color = 'geekblue';
                } else if(role === 'HR') {
                    color = 'pink';
                } else if(role === 'EMPLOYEE') {
                    color = 'green';
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
        <Layout className='data-table user-data-table'>
            <PageHeader
                className="site-page-header"
                title="User Details"
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
                    dataSource={userData}
                    // @ts-ignore
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </Layout>
    );
};

export default TempFile;