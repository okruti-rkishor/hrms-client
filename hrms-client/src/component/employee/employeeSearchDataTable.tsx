import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { employeeInterface } from "./employeeSearch";
import { useNavigate } from "react-router-dom";
import rest from "../../services/http/api";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface Item {
  id: string;
  key: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Object;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const onFinishSuccessToast = (errorInfo: any) => {
  toast.success(`${errorInfo}!`, {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  console.log("Failed:", errorInfo);
};

const onFinishFailedToast = (errorInfo: any) => {
  toast.error(`${errorInfo}!`, {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  console.log("Failed:", errorInfo);
};

const EmployeeSearchDataTable = ({ employeeResponse }: any) => {
  // const initialData = JSON.parse(JSON.stringify(employeeResponse));
  let newEmployeeResponse = employeeResponse;
  const [form] = Form.useForm();
  const [data, setData] = useState(employeeResponse);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;
  const navigate = useNavigate();

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const deleteHandel = async (record: any) => {
    try {
      rest.employeeDelete(record.id);
      const newData = newEmployeeResponse.filter((item: any) => item.id !== record.id);
      console.log(newData);
      setData(newData);
      newEmployeeResponse = newData;
      onFinishSuccessToast("Employee Deleted Successfully!")
    } catch (error) {
      console.log(error)
    }
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Employee Code",
      dataIndex: "employeeCode",
      width: '15%',
      key: "employeeCode",
      editable: true,
    },
    {
      title: "Name",
      dataIndex: "employeeName",
      // width: '25%',
      key: "employeeName",
      editable: true,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      // width: '15%',
      key: "designation",
      editable: true,
    },
    {
      title: "Official Email",
      dataIndex: "officialEmail",
      // width: '40%',
      key: "officialEmail",
      editable: true,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      // width: '40%',
      key: "contact",
      editable: true,
    },
    {
      title: "Actions",
      dataIndex: "operation",
      width: '15%',
      key: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
          <Typography.Link disabled={editingKey !== ""} onClick={() => navigate(`/employee/create/${record.id}`)}>
            <EditOutlined />
          </Typography.Link>
          <Typography.Link disabled={editingKey !== ""} onClick={() => {deleteHandel(record)}}>
            <DeleteOutlined />
          </Typography.Link>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(()=>{
    setData(employeeResponse);
  },[employeeResponse])

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default EmployeeSearchDataTable;
