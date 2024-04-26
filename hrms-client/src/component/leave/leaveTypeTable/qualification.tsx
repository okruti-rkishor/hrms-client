import {Form, Input, TableColumnsType, Tag} from "antd";
import rest from "../../../services/http/api";
import CommonTableComponant from "../CommonTableComponant";

interface DataType {
    key: React.Key;
    description: string;
    code: string;
    status: boolean;
    active: string;
}

const Qualification = ({isModalOpen, setIsModalOpen}: any) => {

    const fetchAllDesignation = async () => {
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
        title: "Leave Entitlement",
        create: rest.createQualification,
        getAll: fetchAllDesignation,
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