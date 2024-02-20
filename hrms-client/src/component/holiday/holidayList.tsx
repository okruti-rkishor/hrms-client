import {Divider, Layout} from "antd";
import {PageHeader} from "@ant-design/pro-layout";
import React from "react";


const HolidayList = () => {
    return (
        <Layout className="with-background">
            <div className="data-table">
                <Divider orientation="left">
                    <PageHeader
                        className=""
                        title="Holiday List"
                    />
                </Divider>
                <h1>This is HOLIDAY LIST section</h1>
            </div>
        </Layout>
    );
}

export default HolidayList;