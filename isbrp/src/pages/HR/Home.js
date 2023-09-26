import React, { useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container.js';
import HrHeader from "../../components/Header/HrHeader";
import Footer from "../../components/Footer/Footer";

function HrHome () {
    useEffect(() => {
        document.title = 'Home'
        window.scrollTo(0,0);
    }, [])

    return (
        <>
            <HrHeader />

            <Container fluid className='contentBox p-4'>
                <h1>Notifications</h1>
                <hr />
                <div className='bg-grey rounded p-3'>
                    <h4>Roles was updated.</h4>
                    <p>Something was updated by someone at dd/mm/yy, hh:mm am.</p>
                </div>
            </Container>
            <Footer type={'bg-secondary'}  />
        </>
    );
}

export default HrHome;