import {Form, Input, TableColumnsType, Tag} from "antd";
import rest from "../../../services/http/api";
import CommonTableComponant from "../CommonTableComponant";

interface DataType {
    key: React.Key;
    description: string;
    code: string;
    status: string;
}

const Designation = ({isModalOpen, setIsModalOpen}: any) => {

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
    }

    return (
        <div>
            <CommonTableComponant propsData={propsData}/>
        </div>
    )
}
export default Designation;