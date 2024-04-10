import React from "react";
import '../../../styles/component/featureSections.scss';



const HomeMainSection = () => {

    return (
        <>
            <section className="main-section__homepage hrms-container">
                <div className='main-section__content'>
                    <h1 >
                        Okruti HRMS to make your workdays simpler and offer time to focus on your people
                    </h1>
                    <p>
                        For customised automation, simplified interactions and actionable insights- all power packed in one!
                    </p>
                </div>
                <div className='main-section__image'>
                    {/*<img src='../../../../public/hrms-assets/images/hrms-main-page-bg.jpg' />*/}
                </div>
            </section>
            <section className="hrms-container">
                <h1 >
                    Everything you need to create a high performance culture
                </h1>
            </section>
        </>
    );
}

export default HomeMainSection;