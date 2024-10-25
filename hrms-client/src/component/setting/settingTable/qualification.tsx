import {Button, Form, Input, Layout, Select, TableColumnsType, Tag, Tooltip} from "antd";
import rest from "../../../services/http/api";
import {PlusCircleOutlined} from "@ant-design/icons/lib";
import React, {useCallback, useMemo, useState} from "react";
import {Status} from "../../../constant/constant";
import CommonTableComponent from "../CommonTableComponent";

interface DataType {
    key: React.Key;
    description: string;
    code: string;
    status: boolean;
}

const Qualification = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterValues, setFilterValues] = useState<object>({});

    const filterChangeHandle = (filteredValues: string) => {
        setFilterValues({active: filteredValues});
    };

    const fetchQualifications = useCallback(async (params?: any) => {
        try {
            const qualifications = params
                ? await rest.getAllQualification(params)
                : await rest.getAllQualification();
            const newQualifications = qualifications.map((designation: any) => ({
                ...designation,
            }))
            console.log("newQualifications: ",newQualifications)
            return newQualifications;
        } catch (e) {
            console.log(e);
            return [];
        }
    }, []);

    const columns: TableColumnsType = [
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
            dataIndex: 'status',
            align: "center",
            render: (status: boolean) => (
                <Tag color={status ? 'green' : 'red'}>
                    {status ? "Active" : "Inactive"}
                </Tag>
            ),
        },
    ];

    const propsData = useMemo(
        () => ({
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
            formFieldsType: [
                {name: "code", type: "code"},
                {name: "description", type: "string"}
            ],
            tableFieldsType: [
                {name: "code", type: "code"},
                {name: "description", type: "string"},
                {name: "status", type: "boolean"}
            ],
            showStatus: true,
            filterValues: {}
        }),
        [isModalOpen, setIsModalOpen, columns, fetchQualifications]
    );

    return (
        <div className={"leave-list_table_data"}>
            <Select
                placeholder="Select Status"
                onChange={(value) => filterChangeHandle(value)}
                style={{ width: 125, marginLeft: 610, bottom: 61 }}
                value={(filterValues as any).active}>
                <Select.Option value={true}>Active</Select.Option>
                <Select.Option value={false}>Inactive</Select.Option>
            </Select>
            <Tooltip title="Add" color={"blue"} key={"blue"}>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined/>}
                    onClick={() => setIsModalOpen(true)}
                    className={"leave-list_table_data_button"}
                />
            </Tooltip>
            <Layout className="with-background leaves-type">
                <CommonTableComponent propsData={{ ...propsData, filterValues }} />
            </Layout>
        </div>
    )
}
export default Qualification;