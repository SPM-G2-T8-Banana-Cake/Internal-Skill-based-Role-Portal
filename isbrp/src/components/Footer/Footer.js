import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FaFacebook } from "react-icons/fa"
import { BsTelegram } from 'react-icons/bs'

function Footer(props) {
    return (
        <Navbar className={props.type + ' justify-content-center py-4 text-black footerText'}>
            <Row className="mx-5 px-5">
                <Col sm={12} md={6} lg={3}>
                    <p className="footerTitles">Contact Us</p>
                    <span>Pasir Ris Elias CC, #02-02, 93 Pasir Ris Drive 3, Singapore, Singapore</span>
                    <br /><br />
                    <span>+65 6388 1742</span>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <p className="footerTitles">Data Protection Officer</p>
                    <span>enquiry@allinone.com.sg</span>
                    <br /><br />
                    <span>+65 9171 3573</span>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <p className="footerTitles">Social</p>
                    <span>
                        <a className="text-black text-decoration-none" href="https://projectsuccess.com.sg/" target='_blank' rel="noreferrer">All-In-One Website</a>
                    </span>
                    <br /><br />
                    <span>
                        <a className="text-light" href="https://www.facebook.com/Projectsuccesssg/" target="_blank" rel="noreferrer"><FaFacebook className="me-2"/></a>
                        <a className="text-light" href="https://t.me/s/projectsuccesssg?before=2644" target="_blank" rel="noreferrer"><BsTelegram /></a>
                    </span>                 
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <span>© 2023 All-In-One, Inc. All rights reserved.</span>
                </Col>
            </Row>
        </Navbar>
    )
}

export default Footer;