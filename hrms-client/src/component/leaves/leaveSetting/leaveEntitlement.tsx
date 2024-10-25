import { Button, Form, Input, Layout, Select, TableColumnsType, Tooltip } from "antd";
import rest from "../../../services/http/api";
import CommonTableComponent from "../../setting/CommonTableComponent";
import React, { useState, useMemo, useCallback } from "react";
import { Leave_Type } from "../../../constant/constant";
import { PlusCircleOutlined } from "@ant-design/icons/lib";

interface DataType {
    key: React.Key;
    name: string;
    leaveType: string;
    unit: number;
    employee: string;
}

const LeaveEntitlement = ({ leaveTypeData }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeList, setEmployeeList] = useState<any[]>([]);
    const [filterValues, setFilterValues] = useState<object>({ });

    const filterChangeHandle = (filteredValues: string) => {
        setFilterValues({ type: filteredValues });
    };

    const getEntitlementData = useCallback(async (params?: any) => {
        try {
            const allEmployees = await rest.getAllEmployee();
            const tempAllEmp = allEmployees.map((employee: any) => ({
                name: `${employee.name.firstName} ${employee.name.lastName}`,
                id: employee.id
            }));
            setEmployeeList(tempAllEmp);

            const tempLeaveEntitlement = params
                ? await rest.getAllLeaveEntitlement(params)
                : await rest.getAllLeaveEntitlement();

            console.log("Leave Entitlement Data:", tempLeaveEntitlement);

            const newTempLeaveEntitlement = tempLeaveEntitlement.map((item: any, index: number) => {
                const employee: any = allEmployees.find((emp: any) => emp.id === item.employeeId);
                return {
                    ...item,
                    name: employee ? `${employee.name.firstName} ${employee.name.lastName}` : 'Unknown',
                    key: index + 1
                };
            });
            return newTempLeaveEntitlement;
        } catch (e) {
            console.log(e);
            return [];
        }
    }, []);

    const columns: TableColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'Sr. No',
                dataIndex: 'key',
                align: "center",
                width: '7%',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                align: "center",
            },
            {
                title: 'Type',
                dataIndex: 'leaveType',
                align: "center",
            },
            {
                title: 'Unit',
                dataIndex: 'unit',
                align: "center",
            },
        ],
        []
    );

    const propsData = useMemo(
        () => ({
            title: "Leave Entitlement",
            create: rest.leaveEntitlementCreate,
            getAll: getEntitlementData,
            delete: rest.deleteLeaveEntitlement,
            isModalOpen: isModalOpen,
            setIsModalOpen: setIsModalOpen,
            columns: columns,
            deleteById: rest.deleteLeaveEntitlement,
            formFields: [
                <Form.Item
                    label="Leave Type"
                    name="leaveType"
                    initialValue={"-Select-"}
                    rules={[{ required: true, message: 'Please input Leave Type!' }]}>
                    <Select style={{ height: 40, width: 272 }}>
                        {(Object.keys(Leave_Type) as Array<keyof typeof Leave_Type>).map((key) =>
                            <Select.Option value={key} key={key}>
                                {Leave_Type[key]}
                            </Select.Option>
                        )}
                    </Select>
                </Form.Item>,
                <Form.Item
                    label="Unit"
                    name={"unit"}
                    rules={[{ required: true, message: 'Please input Unit!' }]}>
                    <Input name={"unit"} />
                </Form.Item>,
                <Form.Item
                    label="Employee"
                    name={"employeeId"}
                    rules={[{ required: true, message: 'Please input Employee Id!' }]}
                    initialValue={"-Select-"}
                >
                    <Select style={{ height: 40, width: 272 }}>
                        {employeeList.map((employee: any) =>
                            <Select.Option value={employee.id} key={employee.id}>
                                {employee.name}
                            </Select.Option>)}
                    </Select>
                </Form.Item>,
            ],
            formFieldsType: [
                { name: "leaveType", type: "code" },
                { name: "unit", type: "number" },
                { name: "employeeId", type: "string" }
            ],
            tableFieldsType: [
                { name: "name", type: "null", value: employeeList, field: "employeeId" },
                { name: "unit", type: "number" },
                { name: "leaveType", type: "string" },
            ],
            filterValues: {}
        }),
        [isModalOpen, setIsModalOpen, employeeList, columns, getEntitlementData]
    );

    return (
        <div className={"leave-list_table_data"}>
            <Select
                placeholder="Select Leave Type"
                onChange={filterChangeHandle}
                style={{width: 170, marginLeft: 567, bottom:61}}
                value={(filterValues as any).type}
            >
                {(Object.keys(Leave_Type) as Array<keyof typeof Leave_Type>).map((key) => (
                    <Select.Option value={key} key={key}>
                        {Leave_Type[key]}
                    </Select.Option>
                ))}
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
                <CommonTableComponent propsData={{ ...propsData, filterValues: filterValues }} />
            </Layout>
        </div>
    );
};

export default LeaveEntitlement;
