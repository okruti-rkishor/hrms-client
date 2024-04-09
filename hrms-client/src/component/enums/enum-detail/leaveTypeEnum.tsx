import React from "react";
import {Flex, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";

function LeaveTypeEnum() {

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (<>
        <Flex>
            <Table dataSource={dataSource} columns={columns}/>;
            <ButtonGroup />
        </Flex>
    </>)
}

export default LeaveTypeEnum