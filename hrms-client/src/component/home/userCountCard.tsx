import { Card, Col } from "antd";
import CountUp from "react-countup";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


function UserCountCard ({ title = "", count = 0, className = ""}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/user/detail?userTitle=${title.toUpperCase()}`);
    };

    return (
        <Col className="gutter-row" span={7}>
            <Card title={title}
                  className={`${className} user-card`}
                  onClick={handleClick}
            >
                <CountUp start={0}
                         end={count}
                         duration={2}
                         className="user-count"
                />
            </Card>
        </Col>
    );
}


function EventsCountCard ({ title = "", count = 0, className = "", ...props }) {
    const navigate = useNavigate();

    const handleBirthdayClick = () => {
        navigate(`/event/birthday`);

    };
    const handleAnniversaryClick = () => {
        navigate(`/event/anniversary`);

    };

    return (
        <Col className="gutter-row" span={7}>
            <Card title={title}
                  className={`${className} user-card`}
                  onClick={()=>{title==="Birthday"?handleBirthdayClick():handleAnniversaryClick()}}
            >
                <CountUp start={0}
                         end={count}
                         duration={2}
                         className="user-count"

                />

                {props.todayBirthday&&<p>props.todayBirthday</p>}

            </Card>
        </Col>
    );
}

export {UserCountCard, EventsCountCard};