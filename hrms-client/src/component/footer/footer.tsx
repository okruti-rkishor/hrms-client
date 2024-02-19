import React from 'react';
import { Footer } from "antd/es/layout/layout";
import './footer.scss';
import {Link} from "react-router-dom";
import {FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined, TwitterOutlined} from "@ant-design/icons/lib";


const LinkIconSVG = () => {
    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="4"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
        </svg>
    )
}

const SocialLinks = () => {
    return(
        <div className="wrapper">
            <Link className="icon facebook" to='www.facebook.com'>
                <span className="tooltip">Facebook</span>
                <FacebookOutlined />
            </Link>
            <Link className="icon twitter" to='www.twitter.com'>
                <span className="tooltip">Twitter</span>
                <TwitterOutlined />
            </Link>
            <Link className="icon instagram" to='www.instagram.com'>
                <span className="tooltip">Instagram</span>
                <InstagramOutlined />
            </Link>
        </div>
    )
}


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
                        <div className='links-section company'>
                            <h3 className='links-section__title'>Company</h3>
                            <Link to='/about-us'>
                                <p>About Us</p>
                                <LinkIconSVG/>
                            </Link>
                            <Link to='/careers'>
                                <p>Careers</p>
                                <LinkIconSVG/>
                            </Link>
                            <Link to='/news'>
                                <p>News & Media</p>
                                <LinkIconSVG/>
                            </Link>
                            <Link to='/privacy-policy'>
                                <p>Privacy Policy</p>
                                <LinkIconSVG/>
                            </Link>
                            <Link to='/terms-condition'>
                                <p>Terms & Condition</p>
                                <LinkIconSVG/>
                            </Link>
                        </div>
                        <div className='links-section support'>
                            <h3 className='links-section__title'>Support</h3>
                            <Link to='/contact-us'>
                                <p>Contact Us</p>
                                <LinkIconSVG/>
                            </Link>
                            <Link to='/faqs'>
                                <p>FAQ's</p>
                                <LinkIconSVG/>
                            </Link>
                        </div>
                        <div className='links-section contact'>
                            <h3 className='links-section__title'>Contact</h3>
                            <div className='mail-support'>
                                <MailOutlined />
                                <a>support@okruti.com</a>
                            </div>
                            <div className='contact-support'>
                                <PhoneOutlined />
                                <a>+91 987654321</a>
                            </div>
                            <p className='address'>
                                A-29 Silver Heights, Sunder Singh Bhandari Nagar, New Sanganer Road, Sodala, Jaipur, Rajasthan 302019, INDIA
                            </p>
                            <p className='credits'>Creafted with ❤️ by Frontend team.</p>
                        </div>
                    </div>

                </section>
                <section className='footer-container__bottom'>
                    <aside className='follow-us'>
                        <h5>FOLLOW US</h5>
                        <SocialLinks/>
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