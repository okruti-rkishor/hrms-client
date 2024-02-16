import React from 'react';
import { Footer } from "antd/es/layout/layout";
import './footer.scss';


function FooterComponent() {
    return (
        <Footer className='hrms-footer'>
            <div className='footer-container hrms-container'>
                <section className='footer-container__upper'>
                    <aside className='footer-container__logo'>
                        <h1>HRMS</h1>
                        <p>Our vision is to provide convenience and help increase your business.</p>
                    </aside>
                    <div className='footer-container__links'>
                        <div className='company'>

                        </div>
                        <div className='support'>

                        </div>
                        <div className='contact'>

                        </div>
                    </div>

                </section>
                <section className='footer-container__bottom'>
                    <aside className='follow-us'>
                        FOLLOW US
                    </aside>
                    <aside className='copyright'>
                        © OKRUTI IT CONSULTING {new Date().getFullYear()}
                    </aside>
                </section>
            </div>
        </Footer>
    );
}

export default FooterComponent;