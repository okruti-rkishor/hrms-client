import {Form, Input, TableColumnsType} from "antd";
import rest from "../../../services/http/api";
import CommonTableComponant from "../CommonTableComponant";

interface DataType {
    key: React.Key;
    description: string;
}

const Qualification = ({isModalOpen, setIsModalOpen}: any) => {
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Code',
            dataIndex: 'code',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
    ];

    const propsData = {
        title: "Leave Entitlement",
        create: rest.createQualification,
        getAll: rest.getAllQualification,
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
        <div>
            <CommonTableComponant propsData={propsData}/>
        </div>
    )
}
export default Qualification;