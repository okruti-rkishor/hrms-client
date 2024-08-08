import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Form, Input, Popconfirm, Table, Tag, Typography, Select, Layout, Divider} from 'antd';
import {PageHeader} from '@ant-design/pro-layout';
import restApi from "../../../services/http/api";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditTwoTone, SaveTwoTone} from "@ant-design/icons/lib";
import { Status, User_type } from "../../../constant/constant";
import '../../../styles/component/user/userDataTable.scss';
import {toast} from 'react-toastify';
import success = toast.success;




interface Item {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    active:boolean;
    status:string;
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


const EditableCell: React.FC<EditableCellProps> = ({editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {

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
        </Select> : dataIndex ==='status'?
            <Select
                    placeholder="Choose Status"
                    style={{flex: 1}}
                    options={[
                        {
                            value: 'ACTIVE',
                            label: 'Active',
                        },
                        {
                            value: 'IN_ACTIVE',
                            label: 'In Active',
                        }]}
            >
            </Select>:<Input/>;

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
                    ...item, email: ((item.email).toLowerCase()),
                    status: item.active ? "Active" : "InActive"
                };
            })
            setUserData(newResponse);
            console.log(newResponse);
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
             row.active=row.status==='ACTIVE';
             let newData=[...userData]
             const index = newData.findIndex((item:any) => key === item.id);
             if (index > -1) {
                const editedData: any = {...row, id: key};
                try {
                    const{status,active,...editedResponse}=editedData;
                     await restApi.userEdit(editedResponse,key);
                    success("User edited successfully");
                }catch(error){
                    console.log(error)
                }
                const item: any = newData[index];
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

    const deleteHandle = async (record: any) => {
        try {
            await restApi.userDelete(record.id)
            const newUserData = userData.filter((user) => (record.id !== user.id))
            setUserData(newUserData);
        } catch (e) {
            console.log(e)
        }
    }

   const markUserActive = async( record:any) => {
        let newData=[...userData]
       const index = newData.findIndex((item:any) => record.id === item.id);
       if (index > -1) {
        try{
            record.active=record.status==='ACTIVE';
            await restApi.userMarkActive(record.id,record.active);
        }
        catch(error){
            console.log(error)
        }
           const item: any = newData[index];
           newData.splice(index, 1, {
               ...item,
               ...record,
           });
           setUserData(newData);
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
            title: 'Status',
            dataIndex: 'status',
            width: '10%',
            editable: false,
            render: (_: any, record: any) => (
                <>
                    <Tag color={_.length === 6 ? "green" : "gray"}>
                        {_.toUpperCase()}
                    </Tag>
                </>
            ),
        },

        {
            title: 'Role',
            dataIndex: 'roles',
            editable: true,
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
                    <div style={{display: "flex"}}>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <EditTwoTone style={{fontSize: '18px', marginLeft: '10px'}}/>
                        </Typography.Link>
                        <Popconfirm
                            title={"Are you sure to delete user?"}
                            onConfirm={() => {
                                deleteHandle(record)
                            }}
                            onCancel={() => {
                                console.log("Cancel")
                            }}
                        >
                            <DeleteOutlined style={{color: "red"}}/>
                        </Popconfirm>
                        <Popconfirm
                            title={`Are you sure to
                            ${record?.active===true?"Inactive":"Active"} user?
                             `}
                            onConfirm={() => {
                                record.status=record.active===true?"IN_ACTIVE":"ACTIVE";
                                 markUserActive(record);
                                 console.log("Status changed!!")
                            }}
                            onCancel={() => {
                                console.log("Cancel")
                            }}
                        >
                            {record?.active===true?<CloseOutlined style={{color: "red"}}/>:<CheckOutlined style={{color: "green"}}/>}
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