import {Button} from "antd";
import {LeftCircleTwoTone, RightCircleTwoTone} from "@ant-design/icons/lib";
import React from "react";

const PrevNext= ({onChange,current}:any) =>{
    return (
        <div className={"prev_next"}>
        <Button onClick={() => onChange(current - 1)} disabled={current === 0}>
            <LeftCircleTwoTone className={"icon"}/>
        </Button>
        <Button onClick={() => onChange(current + 1)}>
            <RightCircleTwoTone className={"icon"}/>
        </Button>
    </div>
    )
}
export default PrevNext;