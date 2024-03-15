import {
    Button,
    Card,
    Col,
    Divider,
    Input,
    Layout,
    message,
    Row, Select,
    Table,
    TableProps,
    Tag, Tooltip,
} from "antd";
import CountUp from "react-countup";
import {PageHeader} from "@ant-design/pro-layout";
import '../enum-card.scss'
import React, {useEffect, useState} from "react";
import {
    CheckCircleOutlined,
    CheckOutlined, CloseCircleOutlined,
    CloseOutlined,
    DeleteTwoTone,
    EditTwoTone,
    PlusCircleOutlined, SaveTwoTone
} from "@ant-design/icons/lib";
import restApi from "../../../services/http/api";


const EnumCards = () => {
    const [designationData, setDesignationData] = useState<DataType[]>([]);
    const [qualificationData, setQualificationData] = useState<DataType[]>([]);
    const [type, setType] = useState<string>();
    const [enumCreate, setEnumCreate] = useState<DataType>();
    const [editingKey, setEditingKey] = useState<string>();
    const [filteredInfo, setFilteredInfo] = useState<any>({});
    const [size, setSize] = useState<any>({
        designation: "",
        qualification: ""
    });
    const [disabled, setDisabled] = useState<any>({
        designation: false,
        qualification: false
    });

    interface DataType {
        key?: React.Key;
        description: string;
        status: string;
        id?: string;
    }

    type OnChange = NonNullable<TableProps<DataType>['onChange']>;

    const increaseEnum = () => {
        if (type === "designation") {
            setSize((prevState: any) => {
                return {
                    ...prevState, designation: prevState.designation + 1
                }
            })
        } else {
            setSize((prevState: any) => {
                return {
                    ...prevState, qualification: prevState.qualification + 1
                }
            })
        }
    }

    const decreaseEnum = () => {
        if (type === "designation") {
            setSize((prevState: any) => {
                return {
                    ...prevState, designation: prevState.designation - 1
                }
            })
        } else {
            setSize((prevState: any) => {
                return {
                    ...prevState, qualification: prevState.qualification - 1
                }
            })
        }
    }

    const enableEnum = () => {
        if(type==="designation"){
            setDisabled((prevState: any) => {
                return {
                    ...prevState, designation: true
                }
            })
        }else{
            setDisabled((prevState: any) => {
                return {
                    ...prevState, qualification: true
                }
            })

        }
    }

    const disableEnum = () => {
        if(type==="designation"){
            setDisabled((prevState: any) => {
                return {
                    ...prevState, designation: false
                }
            })
        }else{
            setDisabled((prevState: any) => {
                return {
                    ...prevState, qualification: false
                }
            })
        }
    }

    const createEnum = () => {
        if (enumCreate?.description === "" || enumCreate?.status === "") {
            message.error("please fill the required field");
            return;
        }
        let id = `${type}`;
        let values: any = {...enumCreate};
        values["code"] = values?.description?.toUpperCase();
        delete values.status;
        setEnumCreate({...enumCreate, description: "", status: ""});
        restApi.postEnum(values, id).then((e) => {
            values["status"] = enumCreate?.status === "Active" ? "Active" : "InActive";
            values["id"] = e;
            const finalData = type === "designation" ? designationData.map((items: any) => {
                if (items.description === "") return values;
                else return items;
            }) : qualificationData.map((items: any) => {
                if (items.description === "") return values;
                else return items;
            })
            if (type === "designation") {
                setDesignationData(finalData);
                disableEnum();
            } else {
                setQualificationData(finalData);
                disableEnum();
            }
            message.success(`${type} suucessfully inserted`);
        }).catch((e) => message.error("data is not inserted"));
    }

    const cancelEnum = () => {
        if (type === "designation") {
            setDesignationData(designationData.filter((items: any) => items.description !== ""))
            decreaseEnum();
            setDisabled((prevState: any) => {
                return {
                    ...prevState, designation: false
                }
            })
        } else {
            setQualificationData(qualificationData.filter((items: any) => items.description !== ""))
            decreaseEnum();
            setDisabled((prevState: any) => {
                return {
                    ...prevState, qualification: false
                }
            })
        }
        setEnumCreate({...enumCreate, description: "", status: ""});
    }

    const save = (record: DataType) => {
        if (enumCreate?.description === "") {
            message.error("please fill the required field");
            return;
        }
        let id = `${type}/${record.id}`;
        let values: any = {...enumCreate};
        values["code"] = values?.description?.toUpperCase();
        delete values.status;
        restApi.putEnum(values, id).then((e) => {
            values["status"] = record.status;
            values["id"] = record.id;
            const finalData = type === "designation" ? designationData.map((items) => {
                if (items.id === editingKey) {
                    return values;
                } else {
                    return items;
                }
            }) : qualificationData.map((items) => {
                if (items.id === editingKey) {
                    return values;
                } else {
                    return items;
                }
            })
            {
                type === "designation" ? setDesignationData(finalData) : setQualificationData(finalData)
            }
            setEditingKey("");
        }).catch((e) => console.log(e));
    }

    const cancel = () => {
        setEditingKey("");
        setEnumCreate({...enumCreate, description: "", status: ""});
        decreaseEnum();
    }

    const enumCardProps = [
        {
            title: "Designation",
            count: size.designation,
            content: "Types of Designation goes here",
            className: "designation",
        },
        {
            title: "Qualification",
            count: size.qualification,
            content: "Types of Qualifications goes here",
            className: "qualification",
        },
    ];

    const onDelete = (record: any) => {
        let id = `${type}/${record.id}`;
        restApi.deleteEnum(id).then((e) => {
            //setDesignationData(designationData.filter((item: any) => item.id !== record.id));
            type === "designation" ? setDesignationData(designationData.filter((item: any) => item.id !== record.id)) : setQualificationData(qualificationData.filter((item: any) => item.id !== record.id))
            decreaseEnum();
            message.success(`${type} successfully deleted`)
        }).catch((e) => message.error("data is not deleted"));
    }

    const onAdd = () => {
        setFilteredInfo({});
        let obj: DataType = {
            description: "",
            status: "",
        };
        const tempArray = type === "designation" ? [...designationData] : [...qualificationData];
        tempArray.unshift(obj)
        if (type === "designation") {
            setDesignationData(tempArray)
            increaseEnum();
            enableEnum();
        } else {
            setQualificationData(tempArray)
            increaseEnum();
            enableEnum()
        }
        setEditingKey("");
    }

    const handleStatus = (record: DataType) => {
        let status = record.status === "Active" ? "inactive" : "active";
        let id = `${type}/${record.id}/${status}`;
        restApi.activeEnum({}, id).then((e) => {
            const finalData = designationData.map((items) => {
                if (items.id === record.id) {
                    return {...items, status: record.status === "Active" ? "InActive" : "Active"}
                }
                return items;
            })
            type === "designation" ? setDesignationData(finalData) : setQualificationData(finalData)
        }).catch((e) => console.log(e));
    }

    const renderDescription = (text: string, record: DataType) => {
        if (record?.description === "") {
            return <Input onChange={(e) => setEnumCreate((prevState: any) => ({
                ...prevState,
                description: e.target.value
            }))} className={"editableInput"}/>
        }
        if (editingKey === record.id) {
            return <Input onChange={(e) => setEnumCreate((prevState: any) => ({
                ...prevState,
                description: e.target.value
            }))} className={"editableInput"} defaultValue={record.description}/>

        } else return text;
    }

    const renderStatus = (text: string, record: DataType) => {
        if (record?.status === "") {
            return <Select className={"editableInput"}
                           options={[{value: "Active", label: "Active"}, {value: "InActive", label: "InActive"}]}
                           onChange={(e) => setEnumCreate((prevState: any) => ({
                               ...prevState,
                               status: e
                           }))}/>

        } else {
            return <Tag color={record.status.length > 6 ? 'green' : 'geekblue'} key={record.key}>
                {record.status}
            </Tag>
        }
    }

    const renderAction = (record: DataType) => {
        if (record?.description === "") {
            return <>
                <CheckOutlined onClick={createEnum} style={{fontSize: 18, marginRight: 15, color: "#1677FF"}}/>
                <CloseOutlined onClick={cancelEnum} style={{fontSize: 18, color: "#1677FF"}}/>
            </>
        }
        if (editingKey === record.id) {
            return <>
                <SaveTwoTone onClick={() => save(record)} style={{marginRight: 8}}/>
                <CloseOutlined onClick={cancel}/>
            </>
        } else {
            return <>
                <EditTwoTone onClick={() => setEditingKey(record.id)} style={{fontSize: 18, marginRight: 15}}/>
                <DeleteTwoTone onClick={() => onDelete(record)} style={{fontSize: 18, marginRight: 15}}/>
                {record.status === "Active" ? <Tooltip title="Deactivate" color={"red"} key={"red"}>
                    <CloseCircleOutlined onClick={() => handleStatus(record)}/>
                </Tooltip> : <Tooltip title="Activate" color={"green"} key={"green"}>
                    <CheckCircleOutlined onClick={() => handleStatus(record)}/>
                </Tooltip>}
            </>
        }
    }

    const handleChange: OnChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: "33%",
            render: (text, record) => renderDescription(text, record),
            filteredValue: filteredInfo.description || null,
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            width: "33%",
            render: (text, record) => renderStatus(text, record),
            filters: [
                {
                    text: 'Active',
                    value: 'Active',
                },
                {
                    text: 'InActive',
                    value: 'InActive',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value as string) === 0,
            filteredValue: filteredInfo.status || null,
        },
        {
            title: 'Action',
            key: 'action',
            width: "33%",
            render: (_, record) => renderAction(record)
        },
    ]

    useEffect(() => {
        restApi.getEnum(`designation/all`).then((e) => {
            e.forEach((item: any) => {
                item["status"] = item.active === true ? "Active" : "InActive";
                delete item.active;
            })
            setDesignationData(e);
            setSize((prevState: any) => {
                return {
                    ...
                        prevState, designation: e.length
                }
            })
        }).catch((e) => message.error("data is not inserted"));

        restApi.getEnum(`qualification/all`).then((e) => {
            e.forEach((item: any) => {
                item["status"] = item.active === true ? "Active" : "InActive";
                delete item.active;
            })
            setQualificationData(e);
            setSize((prevState: any) => {
                return {
                    ...
                        prevState, qualification: e.length
                }
            })
        }).catch((e) => message.error("data is not inserted"));

    }, [])

    return (
        <Layout className="with-background">
            <section className="data-table enum-create-section">
                <div className="enum-create-card">
                    <Divider orientation="left">
                        <PageHeader className="" title="Enum Create"/>
                    </Divider>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} justify="space-between">
                        {enumCardProps.map((item) => (
                            <Col className="gutter-row" span={7} key={Math.random().toString(36).slice(2)}>
                                <Card title={item.title}
                                      className={`${item.className} ${item.className===type?"active ":''}enum-card`}
                                      onClick={() => setType(item.title.toLowerCase())}>
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
            {type ? <section className={"data-table data-table-with-enums"}>
                <Tooltip title="Add" color={"blue"} key={"blue"}>
                    <Button onClick={onAdd}
                            disabled={type === "designation" ? disabled.designation : disabled.qualification}><PlusCircleOutlined/></Button>
                </Tooltip>
                <Table columns={columns} dataSource={type === "designation" ? designationData : qualificationData}
                       pagination={{defaultPageSize: 4}} size={"small"}
                       rowKey={(record) => record.description} onChange={handleChange}/>
            </section> : <></>}
        </Layout>
    );
}

export default EnumCards;