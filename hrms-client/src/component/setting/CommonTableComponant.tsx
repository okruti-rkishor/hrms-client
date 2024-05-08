import {Card, Form, Input, Modal, Popconfirm, Table, TableColumnsType, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import rest from "../../services/http/api";
import {toast} from "react-toastify";
import useFetchLeaveTableData from "../../custom_hooks/useFetchLeaveTableData";
import {CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, DeleteOutlined} from "@ant-design/icons/lib";
import dayjs from "dayjs";
import {Leave_Type_Status} from "../../constant/constant";

function CommonTableComponant({propsData}: any) {
    const {fetchData, setAllData, formFields, columns, title, create, getAll, deleteById, isModalOpen, setIsModalOpen, showStatus = false,totalHoliday,setTotalHoliday, ...restParams} = propsData;
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

                    {!(title === 'Leave Application')&&<Popconfirm
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
                    </Popconfirm>}


                    {showStatus && !(title === 'Leave Application') && <Popconfirm
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
                    </Popconfirm>
                    }
                    {showStatus && title === 'Leave Application' && <>
                        <Popconfirm
                            title={`Are you sure to  Aproved Request?`}

                            onConfirm={() => {
                                updateLeaveRequest(record, "APPROVED")
                            }}
                            onCancel={() => {
                                console.log("Cancel")
                            }}>
                            {" "}
                            <Tooltip title={"Approve"} color={"green"}>
                                <CheckCircleOutlined  className={"search-table delete-button"} style={{cursor:"pointer"}}/>
                            </Tooltip>

                        </Popconfirm>


                        <Popconfirm
                            title={`Are you sure to Rejected Request?`}
                            onConfirm={() => {
                                updateLeaveRequest(record, "REJECTED")
                            }}
                            onCancel={() => {
                                console.log("Cancel")
                            }}>
                            {" "}
                            {
                                <Tooltip title={"Rejected"} color={"red"}>
                                    <CloseCircleOutlined
                                                         className={"search-table delete-button"} style={{cursor:"pointer"}}/>
                                </Tooltip>

                            }
                        </Popconfirm>

                    </>}

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

    const replaceUnderScore = (values: any, keys: any) => {
        if (title !== "Holiday" && title!=="Designation" && title!=="Qualification") {
            keys.forEach((key: any) => {
                values[key] = values[key].charAt(0) + values[key].substring(1).toLowerCase().replace("_", " ");
            })
        }else{
            values["status"] = false;
            values["active"] = "Inactive";
        }
    }

    const replaceSpace = (values: any, keys: any) =>{
        if (title==="Designation" || title==="Qualification") {
            keys.forEach((key: any) => {
                if(key==="code")values[key] = values[key].replaceAll(" ", "_");
            })
        }
    }

    const disableDate = (values:any) =>{
        if(title==="Holiday") {
            const data=form.getFieldsValue();
            const date=data.date.map((item:any)=>{
                return dayjs(item).format("YYYY-MM-DD");
            })
            const start:any=new Date(date[0]);
            const end:any=new Date(date[date.length-1]);
            const oneday:any = 1000 * 60 * 60 * 24;
            values["startDate"]=date[0];
            values["endDate"]=date[date.length-1];
            values["count"]=Math.round(Math.abs((end - start) / oneday));
            values["day"] = getDayOfWeek(start)+" to "+getDayOfWeek(end);
            setTotalHoliday([...totalHoliday,...date]);
        }

    }

    const handleOk = async () => {
        let values = form.getFieldsValue();
        const keys: any = Object.keys(values);

        if (title !== "Holiday") keys.map((key: any) => {
            if (typeof values[key]) dayjs(values[key]).format("YYYY-MM-DD");
        })
        else values = holidayHandle(values);

        if (keys.length === formFields.length) {
            try {
                replaceSpace(values, keys);
                const response = await create(values)
                setIsModalOpen(false);
                replaceUnderScore(values, keys);
                values["id"] = response;
                values["key"] = allNewData.length + 1;
                disableDate(values);
                setAllNewData((prevState: any) => [...prevState, values]);
                form.resetFields();

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

    const updateLeaveRequest = async (record: any, status: string) => {
        try {
            await rest.updateLeaveRequest(status, record.id);
            setAllNewData((prev: any) => prev.map((item: any) => {
                if(item.id===record.id){
                    return {
                        ...item,leaveStatus:status
                    }
                }else{
                    return item
                }

                }
            ))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        console.log(allNewData)

    },[allNewData])


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