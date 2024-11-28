import React, { useState } from "react";
import {Modal, Button, Divider} from "antd";
import UserCreate from "../user/user-create/userCreate";
import UserDataTable from "../user/user-list/userDataTable";
import "react-toastify/dist/ReactToastify.css";
import {
    FileTextOutlined,
    PlusCircleOutlined,
    PrinterOutlined,
    ToTopOutlined,
    UploadOutlined
} from "@ant-design/icons/lib";
import { useNavigate } from "react-router-dom";
import "../../styles/component/user/userNew.scss"

const UserNew = (props: any) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ padding: "20px" }}>


            <div  style={{
                display: "flex",
                justifyContent: "flex-end",
                gap:"7px"

            }}>
                <Button type={"primary"} >
                    <ToTopOutlined  style={{padding:"1px",fontSize:"16px"}} />EXPORT
                </Button>
                <Button type={"primary"} >
                    <UploadOutlined  style={{padding:"1px",fontSize:"16px"}} />EXPORT ALL
                </Button>
                <Button type={"primary"} >
                    <PrinterOutlined   style={{padding:"1px",fontSize:"16px"}} />PRINT
                </Button>
                <Button type={"primary"} onClick={showModal}>
                    <PlusCircleOutlined style={{padding:"1px",fontSize:"16px"}} />ADD
                </Button>

            </div>


            <Modal
                open={isModalVisible}
                title={"ADD USER"}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <UserCreate
                    {...props}
                    mode="create"
                    onModalClose={handleModalClose}
                />
            </Modal>



            <div>
                <UserDataTable {...props} onModalClose={handleModalClose} />
            </div>
        </div>
    );
};

export default UserNew;
