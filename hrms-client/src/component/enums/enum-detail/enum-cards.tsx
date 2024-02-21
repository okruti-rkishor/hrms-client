import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Layout,
    message,
    Row, Select,
    Table,
    TableProps,
    Tag,
} from "antd";
import CountUp from "react-countup";
import {PageHeader} from "@ant-design/pro-layout";
import '../enum-card.scss'
import React, {useEffect, useState} from "react";
import {
    CheckOutlined,
    CloseOutlined,
    DeleteTwoTone,
    EditTwoTone,
    PlusCircleOutlined, SaveTwoTone, SwapOutlined
} from "@ant-design/icons/lib";
import restApi from "../../../services/http/api";


const EnumCards = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [form] = Form.useForm();
    const [type, setType] = useState<string>();
    const [enumCreate, setEnumCreate] = useState<DataType>();
    const [editingKey, setEditingKey] = useState<string>();

    interface DataType {
        key?: React.Key;
        description: string;
        status: string;
        id?: string;
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
            values["id"]=Math.random().toString(36).slice(2);
            const finalData = data.map((items: any) => {
                if (items.description === "") return values;
                else return items;
            })
            setData(finalData);
            message.success("data successfully inserted")
        }).catch((e) => message.error("data is not inserted"));
    }

    const cancelEnum = () => {
        setData(data.filter((items: any) => items.description !== ""));
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
            const finalData = data.map((items) => {
                if (items.id === editingKey) {
                    return values;
                } else {
                    return items;
                }
            })
            setData(finalData)
            setEditingKey("");
        }).catch((e) => console.log(e));
    }

    const cancel = () => {
        setEditingKey("");
        setEnumCreate({...enumCreate, description: "", status: ""});
    }

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

    const onDelete = (record: any) => {
        let id = `designation/${record.id}`;
        restApi.deleteEnum(id).then((e) => {
            setData(data.filter((item: any) => item.id !== record.id));
            message.success("data successfully deleted")
        }).catch((e) => message.error("data is not deleted"));
    }

    const onAdd = () => {
        let obj: DataType = {
            description: "",
            status: "",
        };
        const tempArray = [...data]
        tempArray.unshift(obj)
        setData(tempArray);
    }

    const handleStatus = (record:DataType) =>{
        let status=record.status==="Active"?"inactive":"active";
        let id = `${type}/${record.id}/${status}`;
        restApi.activeEnum({},id).then((e)=> {
            const finalData=data.map((items)=>{
                if(items.id===record.id){
                    return {...items,status:record.status==="Active"?"InActive":"Active"}
                }
                return items;
            })
            setData(finalData)
        }).catch((e)=>console.log(e));
    }

    const renderDescription =(text:string,record:DataType)=>{
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

    const renderStatus =(text:string,record:DataType)=>{
        if(record?.status === ""){
         return <Select className={"editableInput"}
                    options={[{value: "Active", label: "Active"}, {value: "InActive", label: "InActive"}]}
                    onChange={(e) => setEnumCreate((prevState: any) => ({
                        ...prevState,
                        status: e
                    }))}/>

        }else{
            return <Tag color={record.status.length > 6 ? 'green' : 'geekblue'} key={record.key}>
                {record.status}
            </Tag>
        }
    }

    const renderAction=(record:DataType)=>{
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
                <DeleteTwoTone onClick={() => onDelete(record)} style={{fontSize: 18,marginRight:15}}/>
                <SwapOutlined onClick={()=>handleStatus(record)}/>
            </>
        }
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: "33%",
            render: (text,record)=>renderDescription(text,record)
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            width: "33%",
            render: (text, record) =>renderStatus(text,record),
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
        },
        {
            title: 'Action',
            key: 'action',
            width: "33%",
            render: (_, record) => renderAction(record),
        },
    ]

    useEffect(() => {
        if (type) {
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
                    <Divider orientation="left" >
                        <PageHeader className="" title="Enum Create"/>
                    </Divider>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} justify="space-between">
                        {enumCardProps.map((item) => (
                            <Col className="gutter-row" span={7} key={Math.random().toString(36).slice(2)}>
                                <Card title={item.title}
                                      className={`${item.className} enum-card`}
                                      onClick={() => setType(item.title.toLowerCase())}
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
            {type ? <section className={"data-table data-table-with-enums"}>
                <Button onClick={onAdd}><PlusCircleOutlined/></Button>
                <Table columns={columns} dataSource={data} pagination={{defaultPageSize: 4}} size={"small"}
                       rowKey={(record) => record.description}/>
            </section> : <></>}
        </Layout>
    );
}

export default EnumCards;