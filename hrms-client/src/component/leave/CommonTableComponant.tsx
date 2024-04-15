import {Form, Input, Modal, Popconfirm, Table, TableColumnsType} from "antd";
import React, {useEffect, useState} from "react";
import rest from "../../services/http/api";
import {toast} from "react-toastify";
import useFetchLeaveTableData from "../../custom_hooks/useFetchLeaveTableData";
import {DeleteOutlined} from "@ant-design/icons/lib";

function CommonTableComponant({propsData}: any) {
    console.log("render");
    const {fetchData, setAllData, formFields, columns, title, create, getAll, deleteById, isModalOpen, setIsModalOpen} = propsData;
    const [form] = Form.useForm();
    const [allNewData,deleteHandel]:any= useFetchLeaveTableData({getAll,tableColumns:columns.map((tableColumn:any)=>tableColumn.dataIndex),deleteById})
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
                    >
                        {" "}
                        <DeleteOutlined className={"search-table delete-button"}/>
                    </Popconfirm>
                </>
        },
    ])
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
            } catch(e) {
                console.log(e)
            }

        } else {
            toast("Fill All Fields")
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (<>
        <div>
            <Modal title="Create Leave Type" open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
                <Form
                    form={form}
                    layout="horizontal">
                    {formFields?.map((formInput: any) => (<>{formInput}</>))}
                </Form>
            </Modal>

            <Table
                size={"middle"}
                columns={newColumn}
                dataSource={allNewData}
            />
        </div>
    </>)
}

export default CommonTableComponant;