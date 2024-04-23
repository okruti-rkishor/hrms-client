import {Card, Form, Input, Modal, Popconfirm, Table, TableColumnsType} from "antd";
import React, {useEffect, useState} from "react";
import rest from "../../services/http/api";
import {toast} from "react-toastify";
import useFetchLeaveTableData from "../../custom_hooks/useFetchLeaveTableData";
import {CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, DeleteOutlined} from "@ant-design/icons/lib";

function CommonTableComponant({propsData}: any) {
    console.log("render");
    const {fetchData, setAllData, formFields, columns, title, create, getAll, deleteById, isModalOpen, setIsModalOpen, showStatus = false, ...restParams} = propsData;
    const [form] = Form.useForm();
    const [allNewData, setAllNewData ,deleteHandel]: any = useFetchLeaveTableData({
        getAll,
        tableColumns: columns.map((tableColumn: any) => tableColumn.dataIndex),
        deleteById
    })
    const [newColumn, setNewColumn] = useState([
        ...columns,
        {
            title: 'Action',
            render: (_: any, record: any) =>
                <>
                    <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => deleteHandel(record)}
                        onCancel={() => {
                            console.log("Cancel")
                        }}
                        style={{color:"red"}}
                    >
                        {" "}
                        <DeleteOutlined className={"search-table delete-button"}/>
                    </Popconfirm>
                    {showStatus && <Popconfirm
                        title={`Are you sure to ${record.status==="Active " ? "Inactive" : "Active"}?`}
                        onConfirm={() => {
                            updateStatus(record)
                        }}
                        onCancel={() => {
                            console.log("Cancel")
                        }}>
                        {" "}
                        {record.status ==="Active " ? <CloseCircleOutlined style={{color:"red"}} className={"search-table delete-button"}/> :
                            <CheckCircleOutlined style={{color:"green"}}  className={"search-table delete-button"}/>}
                    </Popconfirm>}

                </>
        },
    ])
    const [render,setRender] = useState(false);
    // const[reRender, setReRender] = useState(false);

    const handleOk = async () => {
        const values = form.getFieldsValue();
        console.log("values", values);
        const keys = Object.keys(values)
        keys.map((key) => {
            values[key] = values[key].replace(" ", "_").toLocaleUpperCase();
        })
        if (keys.length === formFields.length) {
            try {
                await create(values)
                setIsModalOpen(false);
            } catch (e) {
                console.log(e)
            }

        } else {
            toast("Fill All Fields")
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const updateStatus = async (record: any) => {
        try {
            await restParams.update(record.status==="Active " ? "inactive"  : "active", record.id);
            setRender(prev=>!prev)

            setAllNewData((prev:any)=>prev.map((item:any)=>{
                if(item.id===record.id){
                    if(record.status==="Active")
                    item.status="Inactive"
                    else
                        item.status="Active"
                }
                return item;
            }
            ))
        } catch (e) {
            console.log(e)
        }
    }


    return (<>
        <div>
            <Modal title={`Add ${title}`} open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
                <Card>
                    <Form
                        form={form}
                        layout="horizontal">
                        {formFields?.map((formInput: any) => (<>{formInput}</>))}
                    </Form>
                </Card>
            </Modal>


            <Table
                bordered
                size={"middle"}
                columns={newColumn}
                dataSource={allNewData}
            />
        </div>
    </>)
}

export default CommonTableComponant;