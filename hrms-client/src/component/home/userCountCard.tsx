import { Card, Col } from "antd";
import CountUp from "react-countup";

function UserCountCard ({ title = "", count = 0, className = "" }) {
  return (
    <Col className="gutter-row" span={6}>
      <Card title={title} className={className}>
        <CountUp start={0} end={count} duration={2} className="user-count" />
      </Card>
    </Col>
  );
}
export default UserCountCard;
