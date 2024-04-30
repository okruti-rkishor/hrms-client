import {Button, Form, Input, Layout, TableColumnsType, Tag, Tooltip} from "antd";
import rest from "../../../services/http/api";
import CommonTableComponant from "../CommonTableComponant";
import {PlusCircleOutlined} from "@ant-design/icons/lib";
import React, {useState} from "react";

interface DataType {
    key: React.Key;
    description: string;
    code: string;
    status: boolean;
    active: string;
}

const Qualification = () => {
    const [isModalOpen,setIsModalOpen]=useState(false);
    const fetchQualifications = async () => {
        try {
            const qualifications = await rest.getAllQualification();
            const newQualifications = qualifications.map((designation: any) => ({
                ...designation,
                status: designation.active ? "Active" : "Inactive"
            }))
            return newQualifications;
        } catch (e) {
            console.log(e);
        }

    }

    const columns: TableColumnsType = [
        {
            title: 'Sr. No',
            dataIndex: 'key',
            align:"center",
            width: '7%',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            align:"center",
        },
        {
            title: 'Description',
            dataIndex: 'description',
            align:"center",
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'status',
        // },
        {
            title: 'Status',
            dataIndex: 'active',
            align: "center",
            // render: (_, {status:any}) => (
            //     <>
            //         {(
            //             <Tag color={status === "true" ? 'green' : 'red'} key={status}>
            //                 {status === "true"?"Active":"Inactive"}
            //             </Tag>
            //         )}
            //     </>
            // ),
        },
    ];

    const propsData = {
        title: "Qualification",
        create: rest.createQualification,
        getAll: fetchQualifications,
        delete: rest.deleteQualification,
        update: rest.updateQualificationStatus,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        columns: columns,
        deleteById: rest.deleteQualification,
        formFields: [
            <Form.Item
                label="Code"
                name={"code"}
                rules={[{required: true, message: 'Please input Code!'}]}>
                <Input name={"code"}/>
            </Form.Item>,
            <Form.Item
                label="Description"
                name="description"
                rules={[{required: true, message: 'Please input Description!'}]}>
                <Input name="description"/>
            </Form.Item>,
        ],
        showStatus: true,
    }

    return (
        <div className={"leave-list_table_data"}>
            <Tooltip title="Add" color={"blue"} key={"blue"}>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined/>}
                    onClick={() => setIsModalOpen(true)}
                    className={"leave-list_table_data_button"}
                />
            </Tooltip>
            <Layout className="with-background leaves-type">
                <CommonTableComponant propsData={propsData}/>
            </Layout>
        </div>
    )
}
export default Qualification;