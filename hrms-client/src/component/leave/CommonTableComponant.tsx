import {Card, Form, Input, Modal, Popconfirm, Table, TableColumnsType} from "antd";
import React, {useEffect, useState} from "react";
import rest from "../../services/http/api";
import {toast} from "react-toastify";
import useFetchLeaveTableData from "../../custom_hooks/useFetchLeaveTableData";
import {CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, DeleteOutlined} from "@ant-design/icons/lib";
import dayjs from "dayjs";

function CommonTableComponant({propsData}: any) {
    console.log("common componant render")
    const {fetchData, setAllData, formFields, columns, title, create, getAll, deleteById, isModalOpen, setIsModalOpen, showStatus = false, ...restParams} = propsData;
    const [allNewData, setAllNewData ,deleteHandel]: any = useFetchLeaveTableData({
        getAll,
        tableColumns: columns.map((tableColumn: any) => tableColumn.dataIndex),
        deleteById
    })
    const [newColumn, setNewColumn] = useState([
        ...columns,
        {
            title: 'Action',
            align:"center",
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
                        <DeleteOutlined style={{color:"red"}} className={"search-table delete-button"}/>
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
    const [form] = Form.useForm();

    const getDayOfWeek = (date: any) => {
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
    };

    const holidayHandle = (values: any) =>{
        let payload: any = {
            "year": new Date().getFullYear(),
            "name": values.name,
            "type": values.type,
            "calender": {}
        }
        const tempCalender = values.date.map((item: any) => {
            let tempCal: any = {};
            tempCal["date"] = dayjs(item).format("YYYY-MM-DD");
            tempCal["day"] = getDayOfWeek(item).toUpperCase();
            tempCal["status"] = values.status;
            return {...tempCal};
        });

        payload.calender = tempCalender;

        return payload;
    }

    const handleOk = async () => {
        console.log(form.getFieldError);
        let values = form.getFieldsValue();
        const keys = Object.keys(values);
        if(title!=="Holiday")keys.map((key) => {
            if(typeof values[key]) dayjs(values[key]).format("YYYY-MM-DD");
            else values[key] = values[key].replace(" ", "_").toLocaleUpperCase();
        })
        else values=holidayHandle(values);
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