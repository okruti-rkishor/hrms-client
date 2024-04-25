import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Form, Input, Popconfirm, Table, Tag, Typography, Select, Layout, Divider} from 'antd';
import {PageHeader} from '@ant-design/pro-layout';
import restApi from "../../../services/http/api";
import {CloseOutlined, DeleteOutlined, EditTwoTone, SaveTwoTone} from "@ant-design/icons/lib";
import {User_type} from "../../../constant/constant";
import '../../../styles/component/user/userDataTable.scss';
import {toast} from 'react-toastify';
import success = toast.success;


interface Item {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string;
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

const userTypesEnum = Object.keys(User_type);

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {

    const inputNode = dataIndex === 'roles' ?
        <Select mode="multiple"
                placeholder="Select the role"
                style={{flex: 1}}
        >
            {userTypesEnum.map((userType) =>
                <Select.Option key={userType} value={userType.toString().toUpperCase()}>
                    {userType.toString().toUpperCase()}
                </Select.Option>)
            }
        </Select> : <Input/>;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
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




    useEffect(() => {
        usersData();
    }, []);

    const usersData = async () => {
        try {
            const response = await restApi.getUsers(String(navigatedUser.get('userTitle')).toLocaleUpperCase());
            const newResponse = response.map((item: any) => {
                return {
                    ...item, email: ((item.email).toLowerCase())

                };
            })

            setUserData(newResponse);
        } catch (err) {
            console.log(err);
        }
    };

    const isEditing = (record: Item) => record.id === editingKey;

    const edit = (record: Item) => {
        form.setFieldsValue({name: '', age: '', address: '', ...record});
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const getDefaultFilter = () => {
        if (navigatedUser.get('userTitle')) {
            return [navigatedUser.get('userTitle')];

        } else {
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
                const editedData: any = {...row, id: key};
                // delete editedData.id;
                const editResponse = await restApi.userEdit(editedData, key);
                const item: any = newData[index];
                // const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setUserData(newData);
                setEditingKey('');
                success("User edited successfully");
            } else {
                newData.push(row);
                setUserData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteHandel = async (record:any)=>{
        try {
            await restApi.userDelete(record.id)
        }
        catch (e) {
            console.log(e)
        }
    }

    const columns = [
        {
            title: 'First name',
            dataIndex: 'firstName',
            width: '15%',
            editable: true,
            sorter: (a: any, b: any) => a.firstName.localeCompare(b.firstName),
        },
        {
            title: 'Last name',
            dataIndex: 'lastName',
            width: '15%',
            editable: true,
            sorter: (a: any, b: any) => a.lastName.localeCompare(b.lastName),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '25%',
            editable: true,
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            editable: true,
            defaultFilteredValue: getDefaultFilter(),
            onFilter: (value: any, record: any) => {
                return record.roles?.includes(value) ?? false;
            },
            width: '25%',
            render: (_: any, record: any) => (
                <>
                    {record.roles?.map((tag: string) => {
                        return (
                            <Tag className={`user-tag ${tag.toLocaleLowerCase()}`} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                    {record.roles?.map((tag: string) => {
                        return (
                            <Tag className={`user-tag ${tag.toLocaleLowerCase()}`} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'operation',
            width: '20%',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.id)} style={{marginRight: 8}}>
                          <SaveTwoTone twoToneColor="#52c41a" style={{fontSize: '18px', marginLeft: '10px'}}/>
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                          <a><CloseOutlined style={{color: '#950a11', fontSize: '18px', marginLeft: '10px'}}/></a>
                        </Popconfirm>
                    </span>
                ) : (
                    <div style={{display:"flex"}}>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <EditTwoTone style={{fontSize: '18px', marginLeft: '10px'}}/>
                        </Typography.Link>
                        <Popconfirm
                            title={"Are you sure to delete user?"}
                            onConfirm={()=> {
                                deleteHandel(record)
                            }}
                            onCancel={() => {
                                console.log("Cancel")
                            }}
                        >
                            <DeleteOutlined  style={{color:"red"}}/>
                        </Popconfirm>
                    </div>
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

    function capitalizeTitle(s: string) {
        return s.toLowerCase().replace(/\b./g, function (a: string) {
            return a.toUpperCase();
        });
    }

    return (
        <Layout className="with-background">
            <div className='data-table user-data-table'>
                <Divider orientation="left">
                    <PageHeader
                        className="site-page-header"
                        title={navigatedUser.get('userTitle') ?
                            `${capitalizeTitle(`${navigatedUser.get('userTitle')}`)} List` : 'Users List'
                        }
                    />
                </Divider>
                <Form form={form} component={false}>
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
            </div>
        </Layout>
    );
};

export default TempFile;