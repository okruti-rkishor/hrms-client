import React from "react";
import {Link} from "react-router-dom";


const LinkIconSVG = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className="h-6 w-6 hrms-link__icon"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
             stroke-width="4"
        >
            <path stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3">
            </path>
        </svg>
    );
}


function HrmsLink({linkTarget="Link Target", linkText="HRMS Link"}) {

    return (
        <Link className='hrms-link' to={linkTarget}>
            <p className='hrms-link__text'>{linkText}</p>
            <LinkIconSVG/>
        </Link>
    );
}

export default HrmsLink;




