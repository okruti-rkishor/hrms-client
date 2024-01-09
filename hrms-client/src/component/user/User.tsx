import React, {memo, useEffect} from 'react';
import "./User.scss";
import axios from "axios";


const User = (({data,onLogout}:any) => {

    return (
        <div className='card'>
            <div className='avt'>
                <img alt='141' src={data?.picture??""}/>
            </div>
            <div className='content'>
                <div className='data'>
                    {Object.entries(data).map(([key, value]) => (
                        <div className='field' key={key}>
                            <div className='label'>{key}:</div>
                            <div className='value'>{JSON.stringify(value)}</div>
                        </div>
                    ))}
                </div>
                <button className='btnLogout' onClick={onLogout}>
                    Logout
                </button>
            </div>
        </div>

    )









})

export default User;