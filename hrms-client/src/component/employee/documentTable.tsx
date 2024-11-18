import React, {useContext, useEffect, useState} from "react";
import { Table, Typography, Popconfirm, message } from "antd";
import { DeleteOutlined, DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import restApi from "../../services/http/api";
import UserLoginContext from "../../context/userLoginContext";
import {SaveTwoTone} from "@ant-design/icons/lib";

interface FileData {
    contentType: string;
    documentType: string;
    documentNumber: string;
    fileSize: string;
    fileName: string;
    originalFileName: string;
    baseLocation: string;
    id?: string;
}

interface DocumentTableProps {
    documentType: string;
}

const DocumentTable: React.FC<DocumentTableProps> = ({ documentType}) => {
    const [files, setFiles] = useState<FileData[]>([]);
    const { newUser } = useContext(UserLoginContext);
   const [employeeId, setEmployeeId] = useState<string | null>(null);


    const fetchEmployeeId = async () => {
        try {
            const allEmployees = await restApi.getAllEmployee();
            const employee = allEmployees.find((item: any) => item?.officialEmail === newUser?.email);
            setEmployeeId(employee?.id || null);
        } catch (error) {
            console.error("Error fetching employee data: ", error);
            message.error("Error fetching employee data.");
        }
    };

    const fetchDocuments = async (empId: string) => {
        if (!empId) return;
        try {
            const response = await restApi.getDocument(empId);
            console.log(response);
            setFiles(response || []);
        } catch (error) {
            message.error("Error fetching documents.");
            console.error("Fetch Error: ", error);
        }
    };


    const handleDelete = async (id: string | undefined, fileName: string) => {
        if (id) {
            try {
                await restApi.documentDelete(id);
               if(employeeId) {fetchDocuments(employeeId);}
                message.success(`File ${fileName} deleted successfully.`);
            } catch (error) {
                message.error(`Error deleting file: ${fileName}`);
                console.error("Delete Error: ", error);
            }
        } else {
            message.error("Document ID is undefined.");
        }
    };

    const handleSave = async (id: any) => {
        try {
            const response = await restApi.changeStatus(id);
        }
        catch (error) {
            console.error('Error while Saving the document:', error);
        }
    };

    const handleDownload = async (fileName: string, documentType:any) => {
        try {
            const response = await restApi.downloadDocument(fileName);
            const link = document.createElement('a');
            const url = window.URL.createObjectURL(response);
            link.href = url;
            link.setAttribute('download', documentType);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
        }
    };

    useEffect(() => {
        if (!employeeId) {
            fetchEmployeeId();
        }
    }, [newUser]);

    useEffect(() => {
        if (employeeId) {
            fetchDocuments(employeeId);
        }
    }, [employeeId, documentType]);


    const columns = [
        {
            title: 'S.No.',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            width: '6%',
            render: (text: any, record: any, index: number) => index + 1,
        },
        {
            title: 'File Name',
            dataIndex: 'originalFileName',
            key: 'filename',
            width: '25%',
            editable: true,
        },
        {
            title: 'Document Type',
            dataIndex: 'documentType',
            key: 'documentType',
            editable: true,
        },
        {
            title: 'Document Number',
            dataIndex: 'documentNumber',
            key: 'documentNumber',
            editable: true,
        },
        {
            title: 'Size',
            dataIndex: 'fileSize',
            key: 'fileSize',
            width: '10%',
            editable: true,
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            editable: true,
        },

        {
            title: 'Action',
            key: 'action',
            width: '15%',
            render: (text: any, record: FileData) => (
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <Typography.Link onClick={() => handleDownload(record.fileName,record.documentType)} style={{ marginRight: "5px" }}>
                        <DownloadOutlined />
                    </Typography.Link>
                    <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(record.id, record.fileName)}>
                        <DeleteOutlined className="document-table delete-button" style={{ color: "red", cursor: "pointer" }} />
                    </Popconfirm>
                    <Typography.Link onClick={() => handleSave(record.id)} style={{ marginLeft: "5px", color: "green", cursor: "pointer" }}>
                        <SaveTwoTone />                    </Typography.Link>
                </div>
            ),
        },
    ];


    return (
        <Table
            dataSource={files.map((file, index) => ({
                ...file,
                serialNumber: index + 1,
            }))}
            columns={columns}
            pagination={false}
        />
    );
};

export default DocumentTable;
