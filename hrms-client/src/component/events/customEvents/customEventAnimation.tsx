import React, {useEffect, useState} from "react";
import ReactConfetti from 'react-confetti'
const CustomEventAnimation=()=>{
    const [dimension,setDimension]=useState({width:window.innerWidth,height:window.innerWidth});
    const size=()=>{
        setDimension({width: window.innerWidth,height: window.innerHeight})
    }
    useEffect(()=>{
        window.addEventListener('resize',size);
        return ()=>{
            window.removeEventListener('resize',size)
        }

    },[dimension])
    return(
        <div>
<ReactConfetti
    width={dimension.width}
    height={dimension.height}/>

        </div>
    )
};
export default CustomEventAnimation;