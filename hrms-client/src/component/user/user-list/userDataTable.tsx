import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Button, Form, Input, Layout, Modal, Popconfirm, Select, Table, Tag, Typography} from 'antd';
import restApi from "../../../services/http/api";
import {CloseOutlined, DeleteOutlined, EditTwoTone, EyeOutlined, SaveTwoTone} from "@ant-design/icons/lib";
import {Status, User_type} from "../../../constant/constant";
import '../../../styles/component/user/userDataTable.scss';
import UserCreate from '../user-create/userCreate';

import "../../../styles/component/user/userCreate.scss";

import {SearchOutlined} from '@ant-design/icons';
import {toast} from 'react-toastify';
import success = toast.success;


interface Item {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    active: boolean;
    status: string;
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
        </Select> : dataIndex === 'status' ?
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
    const [filteredInfo, setFilteredInfo] = useState<{ firstName?: string[]; email?: string[] }>({});
    const [pagination, setPagination] = useState({current: 1, pageSize: 10});
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Item | null>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const showUserModal = (record: Item) => {
        setSelectedUser(record);
        setIsUserModalVisible(true);
    };
    const showEditModal = (record: Item) => {
        setSelectedUser(record);
        setIsEditModalVisible(true);
    };

    const closeModal = () => {
        setIsEditModalVisible(false);
        setIsUserModalVisible(false)
        setSelectedUser(null);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

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
        setSelectedUser(record);
        form.setFieldsValue({ ...record });
        setIsEditModalVisible(true);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const handleChange = (_pagination: any, filters: any) => {
        setFilteredInfo(filters);
    };

    const handleSearch = (selectedKeys: string[], confirm: () => void) => {
        confirm();
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
    };


    const getDefaultFilter = () => {
        if (navigatedUser.get('userTitle')) {
            return [navigatedUser.get('userTitle')];

        } else {
            return [];
        }
    }

    const save = async () => {
        try {
            const row = await form.validateFields();


            let newData = [...userData];
            const index = newData.findIndex((item) => item.id === selectedUser?.id);

            if (index > -1) {
                const editedData = { ...row, id: selectedUser?.id };
                try {
                    if(selectedUser?.id){
                        await restApi.userEdit(editedData, selectedUser?.id);
                        success("User edited successfully");}

                    newData.splice(index, 1, { ...newData[index], ...row });
                    setUserData(newData);
                    setEditingKey('');
                    closeModal();
                } catch (error) {
                    console.log(error);
                }
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

    const markUserActive = async (record: any) => {
        let newData = [...userData]
        const index = newData.findIndex((item: any) => record.id === item.id);
        if (index > -1) {
            try {
                record.active = record.status === 'ACTIVE';
                await restApi.userMarkActive(record.id, record.active);
            } catch (error) {
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
            title: 'S.No.',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            width: '4%',
            render: (_: any, __: any, index: number) => {
                const page = pagination.current || 1;
                const pageSize = pagination.pageSize || 10;
                return (page - 1) * pageSize + index + 1;
            },
        },

        {
            title: 'First Name',
            dataIndex: 'firstName',
            width: '18%',
            sorter: (a: any, b: any) => a.firstName.localeCompare(b.firstName),
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
                <div style={{padding: 8}}>
                    <Input
                        placeholder="Search First Name"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm)}
                        style={{marginBottom: 8, display: 'block'}}
                    />
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm)}
                        size="small"
                        style={{width: 90, marginRight: 8}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
            ),
            onFilter: (value: string | number | boolean, record: { firstName: string }) =>
                record.firstName.toLowerCase().includes(value.toString().toLowerCase()),
        },
        {
            title: 'Last name',
            dataIndex: 'lastName',
            width: '18%',
            editable: true,
            sorter: (a: any, b: any) => a.lastName.localeCompare(b.lastName),
        },

        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%',
            sorter: (a: any, b: any) => a.email.localeCompare(b.email),
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
                <div style={{padding: 8}}>
                    <Input
                        placeholder="Search Email"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm)}
                        style={{marginBottom: 8, display: 'block'}}
                    />
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm)}
                        size="small"
                        style={{width: 90, marginRight: 8}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
            ),
            onFilter: (value: string | number | boolean, record: { email: string }) =>
                record.email.toLowerCase().includes(value.toString().toLowerCase()),
        },

        {
            title: 'Status',
            dataIndex: 'status',
            width: '8%',
            editable: false,
            render: (_: any, record: any) => (
                <>
                    <Tag color={_.length === 6 ? "green" : "red"} style={{
                        //  fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}>
                        {_.toUpperCase()}
                    </Tag>
                </>
            ),
        },


        {
            title: 'Role',
            dataIndex: 'roles',
            editable: true,
            width: '21%',
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
            width: '12%',
            render: (_: any, record: Item) => (
                <div style={{display: "flex"}}>
                    <Typography.Link onClick={() => showUserModal(record)}>
                        <EyeOutlined style={{fontSize: '15px', color: '#1890ff', marginLeft: '0px'}}/>
                    </Typography.Link>
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <EditTwoTone style={{fontSize: '15px'}} />
                    </Typography.Link>
                    <Popconfirm
                        title={`Are you sure to ${record?.active === true ? "Inactive" : "Active"} user?`}
                        onConfirm={() => {
                            record.status = record.active === true ? "IN_ACTIVE" : "ACTIVE";
                            markUserActive(record);
                            console.log("Status changed!!");
                        }}
                        onCancel={() => {
                            console.log("Cancel");
                        }}
                    >
                        {record?.active === true ? (
                            <img src="/icons/activeUser.png" alt="Active User"
                                 style={{width: '22px', height: '22px', padding: '1px', marginLeft: '4px'}} />
                        ) : (
                            <img src="/icons/inActiveUser.png" alt="Inactive User"
                                 style={{width: '22px', height: '22px', paddingRight: '1px', marginLeft: '4px'}} />
                        )}
                    </Popconfirm>
                    <Popconfirm
                        title={"Are you sure to delete user?"}
                        onConfirm={() => deleteHandle(record)}
                        onCancel={() => console.log("Cancel")}
                    >
                        <DeleteOutlined style={{color: "red", fontSize: '14px', marginLeft: '4px'}} />
                    </Popconfirm>
                </div>
            ),
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
                {/*<Divider orientation="left">*/}
                {/*    <PageHeader*/}
                {/*        className="site-page-header"*/}
                {/*        // title={navigatedUser.get('userTitle') ?*/}
                {/*        //     `${capitalizeTitle(`${navigatedUser.get('userTitle')}`)} List` : 'Users List'*/}
                {/*        // }*/}
                {/*    />*/}
                {/*</Divider>*/}
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        rowKey="id"
                        bordered
                        // rowSelection={rowSelection}
                        dataSource={userData}
                        // @ts-ignore
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            onChange: (page, pageSize) => {
                                setPagination({current: page, pageSize});
                            },
                        }}

                        onChange={handleChange}
                    />
                </Form>
            </div>
            <Modal
                title="USER DETAILS"
                className="user-detail-modal"
                visible={isUserModalVisible}
                onCancel={closeModal}
                footer={null}
                centered
            >
                <UserCreate
                    initialData={selectedUser}
                    mode="view"
                />
            </Modal>

            <Modal
                title="Edit User"
                visible={isEditModalVisible}
                onCancel={closeModal}
                className="edit-user-modal"
                footer={null}
            >

                <UserCreate
                    initialData={selectedUser}
                    mode="edit"
                    onModalClose={closeModal}
                />
            </Modal>


        </Layout>
    );
};

export default TempFile;