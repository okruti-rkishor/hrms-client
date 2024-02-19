import React from "react";
import './featureSections.scss'
import {Button} from "antd";
import {Link} from "react-router-dom";
import HrmsLink from "../../../utilities/links/hrmslink";



function FeatureSection() {

    const hrmsFeatureProps = [
        {
            heading: "Empower employees with information they want",
            subheading: "Employee self service portal",
            content: "Give your employees the ownership of personal details by providing a employee self service platform to update their own profiles, apply leaves, track attendance, raise requests, etc. together at one place. With the beautiful employee profiles, your workforce will be engaged the right way!",
            linkText: "Learn about Digital Documents",
            linkTextTarget: "www.google.com",
            imgAltText: "Remove paperwork hassle and go Digital",
            imgLink: "https://d2w2i7rp1a0wob.cloudfront.net/static/images/features/hr-software/profile-showcase.svg",
        },
        {
            heading: "Digitize all your HR and employee documents",
            subheading: "Digital Documents",
            content: "Keka cloud based HRMS lets you digitize every process in your organization and helps you transform into a paperless organization. Your first step to digital transformation.",
            linkText: "Learn about Digital Documents",
            linkTextTarget: "www.google.com",
            imgAltText: "Remove paperwork hassle and go Digital",
            imgLink: "https://d2w2i7rp1a0wob.cloudfront.net/static/images/features/hr-software/docs-track-alldocs.svg",
        },
        {
            heading: "Digitize all your HR and employee documents",
            subheading: "Digital Documents",
            content: "Keka cloud based HRMS lets you digitize every process in your organization and helps you transform into a paperless organization. Your first step to digital transformation.",
            linkText: "Learn more",
            linkTextTarget: "www.google.com",
            imgAltText: "Remove paperwork hassle and go Digital",
            imgLink: "https://d2w2i7rp1a0wob.cloudfront.net/static/images/features/hr-software/profile-showcase.svg",
        },
    ];

    return (
        <div className="feature-section hrms-container">
            {hrmsFeatureProps.map((feature: any) => (
                <section className="feature-container">
                    <div className="content-container">
                        <h3 className="feature-container__subheading">{feature.subheading}</h3>
                        <h2 className="feature-container__heading">{feature.heading}</h2>
                        <summary className="feature-container__summary">{feature.content}</summary>
                        <Button className='feature-container__link hrms-button' href={feature.linkTextTarget}>
                            {feature.linkText}
                        </Button>
                        <br/>
                        <HrmsLink linkTarget={feature.linkTextTarget} linkText={feature.linkText}/>
                    </div>
                    <div className="image-container">
                        <img src={feature.imgLink}
                             alt={feature.imgAltText}
                             className="feature-container__image max-h-400"
                        />
                    </div>
                </section>
            ))}
        </div>
    );
}
export default FeatureSection;




