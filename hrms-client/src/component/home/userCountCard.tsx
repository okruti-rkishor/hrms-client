import { Card, Col } from "antd";
import CountUp from "react-countup";
import {useNavigate} from "react-router-dom";

function UserCountCard ({ title = "", count = 0, className = "" }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/user/detail');
    };

  return (
    <Col className="gutter-row" span={6}>
      <Card title={title}
            className={className}
            onClick={handleClick}>
        <CountUp start={0} end={count} duration={2} className="user-count" />
      </Card>
    </Col>
  );
}
export default UserCountCard;
