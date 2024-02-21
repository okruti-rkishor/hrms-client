import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import rest from "../../services/http/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

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


const EmployeeSearchDataTable = ({ employeeResponse }: any) => {
  // const initialData = JSON.parse(JSON.stringify(employeeResponse));
  let newEmployeeResponse = employeeResponse;
  const [form] = Form.useForm();
  const [data, setData] = useState(employeeResponse);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;
  const navigate = useNavigate();

  const cancel = () => {
    setEditingKey("");
  };

  const deleteHandel = async (record: any) => {
    try {
      rest.employeeDelete(record.id);
      const newData = newEmployeeResponse.filter(
        (item: any) => item.id !== record.id
      );
      console.log(newData);
      setData(newData);
      newEmployeeResponse = newData;
      onFinishSuccessToast("Employee Deleted Successfully!");
    } catch (error) {
      console.log(error);
    }
  };


  const columns = [
    {
      title: "Employee Code",
      dataIndex: "employeeCode",
      width: "15%",
      key: "employeeCode",
      editable: true,
    },
    {
      title: "Name",
      dataIndex: "employeeName",
      key: "employeeName",
      editable: true,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      editable: true,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      editable: true,
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
      editable: true,
    },
    {
      title: "Actions",
      dataIndex: "operation",
      width: "15%",
      key: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => {
                navigate(`/employee/detail/${record.id}`);
              }}
            >
              <EyeOutlined />
              {" "}
            </Typography.Link>

            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => navigate(`/employee/create/${record.id}`)}
            >
              <EditOutlined />
            </Typography.Link>

            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => 
                deleteHandel(record)
              }
              onCancel={cancel}
            >
              {" "}
              <DeleteOutlined />
            </Popconfirm>
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

  useEffect(() => {
    setData(employeeResponse);
  }, [employeeResponse]);

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
