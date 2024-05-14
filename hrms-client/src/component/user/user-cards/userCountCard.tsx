import { Card, Col } from "antd";
import { useEffect } from "react";
import CountUp from "react-countup";
import {useNavigate} from "react-router-dom";
import rest from '../../../services/http/api'


function UserCountCard ({ title = "", count = 0, className = ""}) {
    const navigate = useNavigate();
    const handleUserDetailClick = () => {
        navigate(`/user/list?userTitle=${title.toUpperCase()}`);
    };

    return (
        <Col className="gutter-row" span={className!=="small-user-card"?7:0} style={{display:"flex",gap: 10}}>
            <Card title={title}
                  className={`${className} user-card`}
                  onClick={className!=="small-user-card"?()=>handleUserDetailClick():()=>{}}
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

    const handleInternalEventsClick = () => {
        navigate(`/`);
    };

    return (
        <Col className="gutter-row" span={7}>
            <Card title={title}
                  className={`${className} user-card`}
                  onClick={() => {
                      if(title==="Birthday"){
                          handleBirthdayClick();
                      } else if(title==="Work Anniversary") {
                          handleAnniversaryClick();
                      } else if (title==="Internal Events") {
                          handleInternalEventsClick();
                      }
                  }}
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