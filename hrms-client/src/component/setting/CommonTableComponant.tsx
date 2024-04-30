import {Card, Form, Input, Modal, Popconfirm, Table, TableColumnsType, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import rest from "../../services/http/api";
import {toast} from "react-toastify";
import useFetchLeaveTableData from "../../custom_hooks/useFetchLeaveTableData";
import {CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, DeleteOutlined} from "@ant-design/icons/lib";
import dayjs from "dayjs";

function CommonTableComponant({propsData}: any) {
    //console.log("2222222");
    const {fetchData, setAllData, formFields, columns, title, create, getAll, deleteById, isModalOpen, setIsModalOpen, showStatus = false, ...restParams} = propsData;
    const [allNewData, setAllNewData, deleteHandel]: any = useFetchLeaveTableData({
        getAll,
        tableColumns: columns.map((tableColumn: any) => tableColumn.dataIndex),
        deleteById
    })
    const [newColumn, setNewColumn] = useState([
        ...columns,
        {
            title: 'Action',
            align: "center",
            render: (_: any, record: any) =>
                <>
                    <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => deleteHandel(record)}
                        onCancel={() => {
                            console.log("Cancel")
                        }}
                        style={{color: "red"}}
                    >
                        {" "}
                        <DeleteOutlined style={{color: "red", cursor: "pointer"}}
                                        className={"search-table delete-button"}/>
                    </Popconfirm>
                    {showStatus && <Popconfirm


                        title={`Are you sure to ${record.status ? "Inactive" : "Active"}?`}

                        onConfirm={() => {
                            updateStatus(record)
                        }}
                        onCancel={() => {
                            console.log("Cancel")
                        }}>
                        {" "}
                        {record.status === "Active " ?
                            <CloseCircleOutlined style={{color: "red"}} className={"search-table delete-button"}/> :
                            <CheckCircleOutlined style={{color: "green"}} className={"search-table delete-button"}/>}
                    </Popconfirm>}

                </>
        },
    ])
    const [form] = Form.useForm();
    const [buttonDisabled, setButtonDisabled] = useState(true);

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

    const holidayHandle = (values: any) => {
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

    const handleValues = (values:any,keys:any) =>{

            keys.forEach((key: any) => {
                values[key] = values[key].charAt(0) + values[key].substring(1).toLowerCase().replace("_", " ");
            })
            if(title === "Designation" || title === "Qualification"){
                values["status"]=false;
                values["active"]="Inactive";
            }


    }

    const handleOk = async () => {
        let values = form.getFieldsValue();
        const keys:any = Object.keys(values);

        if (title !== "Holiday") keys.map((key:any) => {
            if (typeof values[key]) dayjs(values[key]).format("YYYY-MM-DD");
        })
        else values = holidayHandle(values);

        if (keys.length === formFields.length) {
            try {
                const response=await create(values)
                setIsModalOpen(false);
                handleValues(values,keys);
                values["id"]=response;
                values["key"]=allNewData.length+1;
                setAllNewData((prevState:any)=>[...prevState,values]);
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
            await restParams.update(record.status ? false : true, record.id);
            setAllNewData((prev: any) => prev.map((item: any) => {
                    if (item.id === record.id) {
                        if (record.active === "Active") {
                            item.active = "Inactive"
                            item.status = false
                        } else {
                            item.active = "Active"
                            item.status = true
                        }
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
            <Modal title={`Add ${title}`} open={isModalOpen} onCancel={handleCancel} onOk={handleOk}
                   okButtonProps={{disabled: buttonDisabled}}>
                <Card>
                    <Form
                        form={form}
                        layout="horizontal"
                        onFieldsChange={() =>
                            setButtonDisabled(
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({errors}) => errors.length).length
                            )
                        }
                    >
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