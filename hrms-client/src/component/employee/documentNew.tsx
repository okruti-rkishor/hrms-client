import React, { CSSProperties, useContext, useEffect, useState } from "react";
import {Button, Card, Divider, Form, Input, message, Modal, Select, Upload, UploadProps} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import restApi from "../../services/http/api/index";
import { Documents } from "../../constant/constant";
import UserLoginContext from "../../context/userLoginContext";
import DocumentTable from "./documentTable";
import { UploadFile } from "antd/lib/upload/interface";
import {PlusCircleOutlined} from "@ant-design/icons/lib";

interface FileData {
    contentType: string;
    documentType: string;
    documentNumber: string;
    size: string;
    fileName: string;
    originalFileName: string;
    baseLocation: string;
    id?: string;
}

interface DocumentUploadState {
    documentType: string;
    documentNumber: string;
    files: FileData[];
}

const DocumentUpload = (): JSX.Element => {
    const [state, setState] = useState<DocumentUploadState>({
        documentType: "",
        documentNumber: "",
        files: [],
    });
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [employeeId, setEmployeeId] = useState<string | null>(null);
    const { newUser } = useContext(UserLoginContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchEmployeeId = async () => {
        const allEmployees = await restApi.getAllEmployee();
        const employee = allEmployees.find((item: any) => item?.officialEmail === newUser?.email);
        const id = employee?.id;

       if(id)
       {setEmployeeId(id);}
        return id;
    };

    const fileProps: UploadProps = {
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

    };
    const handleChange = (info: { fileList: UploadFile[] }) => {
        setFileList(info.fileList);
    };
    const documentTypeChange = (value: string) => {
        setState({ ...state, documentType: value, documentNumber: "" });
    };
    const handleOK = () => {
        setIsModalOpen(false);
    };




    const uploadFile = async ({ file, onSuccess, onError }: any, customKey: string) => {
        let documentPayload: any = { "document-type": customKey, "file": file };

        if (state.documentType === "AADHAAR_CARD") {
            if (!state.documentNumber || state.documentNumber.length < 12) {
                message.error(`Please fill the Aadhaar Card number.`);
                return;
            } else {
                documentPayload["document-number"] = state.documentNumber;
            }
        }

        if (state.documentType === "PAN_CARD") {
            if (!state.documentNumber || state.documentNumber.length < 10) {
                message.error(`Please fill the PAN Card number.`);
                return;
            } else {
                documentPayload["document-number"] = state.documentNumber;
            }
        }

        try {
            if (employeeId) {

                const response = await restApi.documentUpload(documentPayload, employeeId);

                console.log(response);
                onSuccess("done");

                const tempUploadedFile: FileData = {
                    fileName: response.fileName || file.name,
                    originalFileName: file.name,
                    baseLocation: response.location,
                    contentType: file.type,
                    documentType: state.documentType,
                    size: response.size,
                    documentNumber: state.documentNumber,

                };

                setState((prevState) => ({
                    ...prevState,
                    files: [...prevState.files, tempUploadedFile],
                }));


            message.success("File uploaded successfully.");}
        } catch (error) {

            onError("error");
            message.error("Error uploading file.");
            console.error("Upload error:", error);
        }
    };



    const onRemoveFile = async (file: any) => {
        const fileToRemove = state.files.find((f) => f.originalFileName === file.name);

        if (!fileToRemove) {
            message.error("File not found.");
            return;
        }
        const fileName = fileToRemove.fileName;
        console.log(fileToRemove);
        try {
           // await restApi.documentDeleteS3(fileName);
            if (fileToRemove.id)
            await restApi.documentDelete(fileToRemove.id);

            setState((prevState) => ({
                ...prevState,
                files: prevState.files.filter((f) => f.fileName !== fileName),
            }));

            message.success(`File ${fileName} deleted successfully.`);
        } catch (error) {
            message.error(`Error deleting file: ${fileName}`);
        }
    };

    const sectionStyle: CSSProperties = {
       // margin: "20px",
        background: "#ffffff",
        padding: "15px",
        fontSize:"12px",
    };

    useEffect(() => {
        const setEmployeeId = async () => {
            await fetchEmployeeId();
        };
        setEmployeeId();
    }, [newUser]);

    return (
        <>
            <div style={sectionStyle}>
                <div style={{display: "flex", justifyContent: "space-around",width:1140, gap: 15}}>
                    <Divider orientation="left">Add Documents</Divider>
                    <Button type={"primary"} onClick={() => setIsModalOpen(true)}>
                        <PlusCircleOutlined/> Add
                    </Button>

                </div>

                <Modal
                    title={`Add New Document`}
                    open={isModalOpen}
                    onOk={handleOK}
                    onCancel={handleOK}
                   // footer={null}
                    className="leave-modal"
                >
                    <Card>
                    <Form layout="vertical">
                        <Form.Item label="Document Type" name="documentType">
                            <Select
                                onChange={documentTypeChange}
                                value={state.documentType}
                                style={{ height: "40px", textAlign: "center", width: "50%" }}
                            >
                                {Object.keys(Documents).map((key, index) => (
                                    <Select.Option value={key} key={index}>
                                        {key}
                                    </Select.Option>
                                ))}

                            </Select>
                        </Form.Item>

                        {(state.documentType === "AADHAAR_CARD" || state.documentType === "PAN_CARD") && (
                            <Form.Item label={`${Documents[state.documentType]} Number`} required>
                                <Input
                                    value={state.documentNumber}
                                    maxLength={state.documentType === "AADHAAR_CARD" ? 12 : 10}
                                    onChange={(e) =>
                                        setState({ ...state, documentNumber: e.target.value })
                                    }
                                    style={{ height: "40px", textAlign: "center", width: "50%" }}
                                />
                            </Form.Item>
                        )}

                        <Form.Item label="Upload Document" required>
                            <Upload
                                {...fileProps}
                                customRequest={(e) => uploadFile(e, state.documentType)}
                                onRemove={onRemoveFile}
                               // showRemoveIcon={false}
                                fileList={fileList}
                                onChange={handleChange}
                                //maxCount={1}
                            >
                                <Button icon={<UploadOutlined/>}>Upload</Button>
                            </Upload>
                        </Form.Item>

                        {/*<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>*/}
                        {/*    <Button type="primary" onClick={handleSave} style={{ marginLeft: "auto" }}>*/}
                        {/*        Save*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </Form>
                    </Card>
                </Modal>

                <DocumentTable documentType={state.documentType} />
            </div>
        </>
    );
};

export default DocumentUpload;
