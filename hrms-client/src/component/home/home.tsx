// import {Outlet} from "react-router-dom";
import React from "react";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div style={{width: '100%'}}>
            <h1>Hello World</h1>
            <Link to="/login">Login Us</Link>
        </div>
    );
}
export default Home;