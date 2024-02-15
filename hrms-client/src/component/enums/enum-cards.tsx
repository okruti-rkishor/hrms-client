import {Card, Col, Divider, Layout, Row} from "antd";
import CountUp from "react-countup";
import {useNavigate} from "react-router-dom";
import {PageHeader} from "@ant-design/pro-layout";
import './enums.scss'


const enumCardProps = [
    {
        title: "User Type",
        count: 12,
        content: "User types goes here",
        className: "user-type",
    },
    {
        title: "Designation",
        count: 10,
        content: "Types of Designation goes here",
        className: "designation",
    },
    {
        title: "Qualification",
        count: 0,
        content: "Types of Qualifications goes here",
        className: "qualification",
    },
];



const EnumCards = () => {
    const navigate = useNavigate();

    const handleEnumCreate = () => {
        navigate(`/event/birthday`);
    };

    return (
        <Layout className="with-background">
            <section className="data-table enum-create-section">
                <div className="enum-create-card">
                    <Divider orientation="left">
                        <PageHeader className="" title="Enum Create" />
                    </Divider>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
                        {enumCardProps.map((item) => (
                            <Col className="gutter-row" span={7}>
                                <Card title={item.title}
                                    className={`${item.className} enum-card`}
                                    onClick={handleEnumCreate}
                                >
                                    <CountUp start={0}
                                        end={item.count}
                                        duration={2}
                                        className="user-count"
                                    />
                                    {item.content}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>
        </Layout>
    );
}

export default EnumCards;