import {Button, Form, Input, Layout, TableColumnsType, Tag, Tooltip} from "antd";
import rest from "../../../services/http/api";
import CommonTableComponant from "../CommonTableComponant";
import React, {useState} from "react";
import {PlusCircleOutlined} from "@ant-design/icons/lib";

interface DataType {
    key: React.Key;
    description: string;
    code: string;
    status: string;
}

const Designation = () => {
    const [isModalOpen,setIsModalOpen]=useState(false);

    const fetchDesignations = async () => {
        try {
            const designations = await rest.getAllDesignation();
            const newDesignations = designations.map((designation: any) => ({
                ...designation,
                status: designation.active ? "Active" : "Inactive"
            }))
            return newDesignations;
        } catch (e) {
            console.log(e);
        }

    }

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Sr. No',
            dataIndex: 'key',
            align: "center",
            width: '7%',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            align: "center",
        },
        {
            title: 'Description',
            dataIndex: 'description',
            align: "center",

        },
        {
            title: 'Status',
            dataIndex: 'active',
            align: "center",
            // render: (_, {status}) => (
            //     <>
            //         {(
            //             <Tag color={status.length === 4 ? 'green' : 'red'} key={status}>
            //                 {`${status===true?}`}
            //             </Tag>
            //         )}
            //     </>
            // ),
        },
    ];

    const propsData = {
        title: "Designation",
        create: rest.createDesignation,
        getAll: fetchDesignations,
        delete: rest.deleteDesignation,
        update: rest.updateDesignationStatus,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        columns: columns,
        deleteById: rest.deleteDesignation,
        showStatus: true,
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
        formFieldsType: [
            {name: "code", type: "code"},
            {name: "description", type: "string"}
        ],
        tableFieldsType: [
            {name: "code", type: "code"},
            {name: "description", type: "string"},
            {name: "active",type:" ",value:"inactive"}
        ]
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
export default Designation;