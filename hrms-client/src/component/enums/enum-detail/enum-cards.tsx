import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Layout,
    message,
    Popconfirm,
    Row, Space,
    Table,
    TableProps,
    Tag
} from "antd";
import CountUp from "react-countup";
import {PageHeader} from "@ant-design/pro-layout";
import '../enum-card.scss'
import React, {useEffect, useState} from "react";
import {DeleteOutlined, EditOutlined, PlusCircleOutlined} from "@ant-design/icons/lib";
import {Typography} from "antd/lib";
import restApi from "../../../services/http/api";


const EnumCards = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    //const [editingKey, setEditingKey] = useState(false);
    const [form]=Form.useForm();
    const [type,setType]=useState();


    const handleEnumCreate = (item:any) => {
        console.log(item);
        setType(item.toLowerCase());
    };

    interface DataType {
        key: React.Key;
        description: string;
        status: string;
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
        const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;

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
                            },
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


    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: "33%"
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            width: "33%",
            render: (_, {status}) => {
                let color = status.length > 7 ? 'geekblue' : 'green';
                return (
                    <Tag color={color}>
                        {status}
                    </Tag>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: "33%",
            render: (_, record) => {
                return <div className={"record"}>
                <EditOutlined onClick={() => onEdit(record)}/>

                    <DeleteOutlined onClick={() => onDelete(record)}/>

                </div>


            }
        },
    ];

    const enumCardProps = [
        {
            title: "User Type",
            count: 12,
            content: "User types goes here",
            className: "user-type",
        },
        {
            title: "Designation",
            count: 10,
            content: "Types of Designation goes here",
            className: "designation",
        },
        {
            title: "Qualification",
            count: 0,
            content: "Types of Qualifications goes here",
            className: "qualification",
        },
    ];

    const onFinish = (values: any) => {
        let id = `${type}`;
        values["code"] = values.description.toUpperCase();
        delete values.status;
        console.log(values);
        restApi.postEnum(values, id).then((e) => {
            console.log(e);
            values["status"] = "Active";
            setData(result => [...result, values]);
            setIsModalOpen(false);

            message.success("data successfully inserted")
        }).catch((e) => message.error("data is not inserted"));
    }

    const onDelete = (record: any) => {
        console.log(record);
        let id = `designation/${record.id}`;
        restApi.deleteEnum(id).then((e) => {
            setData(data.filter((item: any) => item.id !== record.id));
            message.success("data successfully deleted")
        }).catch((e) => message.error("data is not deleted"));
    }

    const handleActive = (value: any) => {
        value.status = value.status.toLowerCase();
        let id = `${type}/${value.id}/${value.status}`
        restApi.putEnum("", id).then((e) => {
            const status = data.map((item: any) => {
                if (item.id === value.id) {
                    if (item.status.toLowerCase() === "inactive") {
                        item.status = "Active"
                        return item;
                    } else {
                        item.status = "InActive"
                        return item;
                    }
                }
                return item;

            });
            setData(status);
            message.success("data successfully changed")
        }).catch((e) => message.error("data not changed"));
    }

    const onEdit = (value: DataType) => {
        // setEditingKey(true);
        form.setFieldsValue({...value});
    }

    const onAdd = () =>{
        let obj:DataType={
            key:0,
            description:"",
            status:"",
        }
        console.log(obj);
        setData([...data,obj]);

    }

    useEffect(() => {
        console.log("1111");
        if (type){
            let id = `${type}/all`;
            restApi.getEnum(id).then((e) => {
                e.forEach((item: any) => {
                    item["status"] = item.active === true ? "Active" : "InActive";
                    delete item.active;
                })
                setData(e);
            }).catch((e) => message.error("data is not inserted"));

        }
        }, [type])

    return (
        <Layout className="with-background">
            <section className="data-table enum-create-section">
                <div className="enum-create-card">
                    <Divider orientation="left">
                        <PageHeader className="" title="Enum Create" />
                    </Divider>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
                        {enumCardProps.map((item) => (
                            <Col className="gutter-row" span={7}>
                                <Card title={item.title}
                                    className={`${item.className} enum-card`}
                                    onClick={()=>handleEnumCreate(item.title)}
                                >
                                    <CountUp start={0}
                                        end={item.count}
                                        duration={2}
                                        className="user-count"
                                    />
                                    {item.content}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>
            {type?<section className={"data-table data-table-with-enums"}>


                <Button onClick={onAdd}><PlusCircleOutlined /></Button>

                <Table columns={columns} dataSource={data} pagination={{defaultPageSize: 4}} components={{
                    body: {
                        cell: EditableCell,
                    },
                }} size={"small"}/>


            </section>:<></>}
        </Layout>
    );
}

export default EnumCards;