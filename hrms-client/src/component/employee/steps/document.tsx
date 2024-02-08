import {Button, Collapse, CollapseProps, Form, Input, message, theme, Upload, UploadProps} from "antd";
import restApi from "../../../services/http/api";
import {Documents} from "../../../constant/constant";
import React, {CSSProperties, useState} from "react";
import {UploadOutlined} from '@ant-design/icons';
import {CaretRightOutlined} from "@ant-design/icons/lib";

const Document = ({employeeData, setEmployeeData, isEditing}: any): JSX.Element => {
    const [state, setState] = useState<any>({
        AADHAAR_CARD_NUMBER: employeeData.documents["AADHAAR_CARD"]?.documentNumber ?? "",
        PAN_CARD_NUMBER: employeeData.documents["PAN_CARD"]?.documentNumber ?? ""
    });

    const fileProps: UploadProps = {
        onChange(info) {
            //console.log(info);
            if (info.file.status !== 'uploading') {
                //console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }

        },

    };

    const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
        {
            key: '1',
            label: 'Fill Your Personal Documents',
            children: <>{(Object.keys(Documents) as Array<keyof typeof Documents>).map((key, index) => {
                    if (key === "AADHAAR_CARD" || key === "PAN_CARD") {
                        let tempFileProp = {...fileProps};
                        if (isEditing === true && employeeData.documents[key]) {

                            tempFileProp.defaultFileList = [
                                {
                                    uid: employeeData.documents[key].id,
                                    name: employeeData.documents[key].file,
                                    status: 'done',
                                },
                            ];
                        }

                        return <div style={{display: "flex", gap: '40px'}}>
                            <Form.Item name={key} label={Documents[key]}>
                                <Upload {...tempFileProp} customRequest={(e) => uploadFile(e, key,)}
                                        onRemove={() => onRemoveFile(key)} maxCount={1}>
                                    <Button icon={<UploadOutlined/>}
                                            disabled={!!(employeeData.documents[key])}>Upload</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item name={key + "_NUMBER"}
                                       initialValue={employeeData.documents[key]?.documentNumber ?? ""} key={key}
                                       rules={[() => ({
                                               validator(_, value) {
                                                   if (isNaN(value)) {
                                                       return Promise.reject("number has to be a number.");
                                                   }
                                                   if (value < 0) {
                                                       return Promise.reject("number cannot be negative.");
                                                   }

                                                   if (value.length > 12) {
                                                       return Promise.reject("number cannot be greater than 12.");
                                                   }

                                                   if (value.length === 12) {
                                                       return Promise.resolve();
                                                   } else if (value.length < 12) {
                                                       return Promise.reject("number cannot be less than 12.");

                                                   }
                                                   return Promise.resolve();
                                               },
                                           }
                                       ),]}>
                                <Input style={{height: "32px", maxWidth: "150px"}}
                                       disabled={!!(employeeData.documents[key])}
                                       value={employeeData.documents[key]?.documentNumber ?? ""} key={index}
                                       onChange={(e) => setDocumentNumber(e.target.value, key)}/>
                            </Form.Item>

                        </div>

                    } else {
                        <></>
                    }
                }
            )}</>,
            style: panelStyle,
        },
        {
            key: '2',
            label: 'Fill Your Qualification Documents',
            children: <>{(Object.keys(Documents) as Array<keyof typeof Documents>).map((key, index) => {
                    if (key === "SSC" || key === "HSC") {
                        let tempFileProp = {...fileProps};
                        if (isEditing === true && employeeData.documents[key]) {
                            tempFileProp.defaultFileList = [
                                {
                                    uid: employeeData.documents[key].id,
                                    name: employeeData.documents[key].file,
                                    status: 'done',
                                },
                            ];
                        }
                        return <Form.Item name={key} label={Documents[key]}>
                            <Upload {...tempFileProp} customRequest={(e) => uploadFile(e, key,)}
                                    onRemove={(e) => onRemoveFile(key)} maxCount={1}>
                                <Button icon={<UploadOutlined/>}
                                        disabled={!!(employeeData.documents[key])}>Upload</Button>
                            </Upload>
                        </Form.Item>
                    } else {
                        <></>
                    }
                }
            )}</>,
            style: panelStyle,
        },
        {
            key: '3',
            label: 'Fill Your Proffessional Documents',
            children: <>{(Object.keys(Documents) as Array<keyof typeof Documents>).map((key, index) => {
                    if (key !== "SSC" && key !== "HSC" && key !== "AADHAAR_CARD" && key !== "PAN_CARD") {
                        let tempFileProp = {...fileProps};
                        if (isEditing === true && employeeData.documents[key]) {
                            tempFileProp.defaultFileList = [
                                {
                                    uid: employeeData.documents[key].id,
                                    name: employeeData.documents[key].file,
                                    status: 'done',
                                },
                            ];
                        }
                        return <Form.Item name={key} label={Documents[key]}>
                            <Upload {...tempFileProp} customRequest={(e) => uploadFile(e, key,)}
                                    onRemove={(e) => onRemoveFile(key)} maxCount={1}>
                                <Button icon={<UploadOutlined/>}
                                        disabled={!!(employeeData.documents[key])}>Upload</Button>
                            </Upload>
                        </Form.Item>
                    } else {
                        <></>
                    }
                }
            )}</>,
            style: panelStyle,
        },
    ];


    const uploadFile = async ({file, onSuccess, onError}: any, customKey: any) => {
        let documentPayload: any = {"document-type": customKey, "file": file};
        if (customKey === "AADHAAR_CARD") {
            if (state.AADHAAR_CARD_Number === null || state.AADHAAR_CARD_NUMBER.length<12) {
                message.error(`please fill ${customKey} number`);
                return;
            } else {
                console.log("1", state);
                documentPayload["document-number"] = state.AADHAAR_CARD_NUMBER;
            }
        }
        if (customKey === "PAN_CARD") {
            if (state.PAN_CARD_NUMBER === null || state.AADHAAR_CARD_NUMBER.length<12) {
                message.error(`please fill ${customKey} number`);
                return;
            } else {
                console.log("1", state);
                documentPayload["document-number"] = state.PAN_CARD_NUMBER;
            }
        }

        const response = await restApi.documentUpload(documentPayload).then((info) => {
            onSuccess("done");
            console.log(info);
            const newDocument = {
                customKey,
                file: file,
                id: info.id,
            }
            setEmployeeData({
                ...employeeData,
                documents: {
                    ...employeeData.documents
                    , [customKey]: newDocument
                }
            })
        }).catch((info) => {
            onError("error")
        });
    }

    const onRemoveFile = async (customKey: any) => {
        let id = "";
        if (customKey === "AADHAAR_CARD") {
            if (state.AADHAAR_CARD_NUMBER.length < 12) {
                message.error(`please fill ${customKey} number`);
                return;
            }
        }
        if (customKey === "PAN_CARD") {
            if (state.PAN_CARD_NUMBER.length < 12) {
                message.error(`please fill ${customKey} number`);
                return;
            }
        }
        Object.keys(employeeData.documents).forEach(key => {
            if (employeeData.documents[key].customKey === customKey) {
                id = employeeData.documents[key].id;
            }
        });
        console.log(id);

        await restApi.documentDelete(`${id}`).then((info) => {
            const newValue = {...employeeData};
            delete newValue.documents[customKey];

            setEmployeeData(newValue);

        }).catch((info) => {
            console.log(info);
        });

    };
    const setDocumentNumber = (value: any, customKey: any) => {
        if (`${customKey}` + "_NUMBER" === "AADHAAR_CARD_NUMBER") {
            setState({...state, AADHAAR_CARD_NUMBER: value})
        } else {
            setState({...state, PAN_CARD_NUMBER: value})
        }

    }

    const { token } = theme.useToken();

    const panelStyle: React.CSSProperties = {
        marginBottom: 25,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    }


    return (
        <>

            <div style={{display: "flex", flexDirection: "column", marginTop: "35px", gap: "30px"}}
                 className={"employee-create-inputs"}>
                <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{ background: token.colorBgContainer }}
                    items={getItems(panelStyle)}
                />





            </div>
        </>
    )

}
export default Document;

