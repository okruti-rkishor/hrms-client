import {Button, Form, Input, Layout, Select, TableColumnsType, Tag, Tooltip} from "antd";
import rest from "../../../services/http/api";
import React, {useCallback, useMemo, useState} from "react";
import {PlusCircleOutlined} from "@ant-design/icons/lib";
import CommonTableComponent from "../CommonTableComponent";

interface DataType {
    key: React.Key;
    description: string;
    code: string;
    status: boolean;
}

const Designation = () => {
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [filterValues, setFilterValues] = useState<object>({});

    const filterChangeHandle = (filteredValues: string) => {
        setFilterValues({active: filteredValues});
    };

    const fetchDesignations = useCallback(async (params?: any) => {
        try {

            const designations = params
                ? await rest.getAllDesignation(params)
                : await rest.getAllDesignation();
            const newDesignations = designations.map((designation: any) => ({
                ...designation,
            }))
            return newDesignations;
        } catch (e) {
            console.log(e);
            return [];
        }
    }, []);

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
            dataIndex: 'status',
            align: "center",
            render:(status:boolean)=>(
                <Tag color={status ? 'green' : 'red'}>
                    {status ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
    ];

    const propsData = useMemo(
        () => ({
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
            {name: "status", type: "boolean"}
        ],
            filterValues: {}
        }),
        [isModalOpen, setIsModalOpen, columns, fetchDesignations]
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
export default Designation;