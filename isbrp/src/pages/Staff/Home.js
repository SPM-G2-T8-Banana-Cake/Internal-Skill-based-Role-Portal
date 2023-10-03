import React, { useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container.js';
import StaffHeader from "../../components/Header/StaffHeader";
import Footer from "../../components/Footer/Footer";

function StaffHome () {
    useEffect(() => {
        document.title = 'Home'
        window.scrollTo(0,0);
    }, [])

    return (
        <>
            <StaffHeader />
            <Container fluid className='contentBox p-4'>
                <h1>Roles Applied to</h1>
                <hr />
                <div className='bg-grey rounded p-3'>
                    <h4>You have a new application status.</h4>
                    <p>Something was updated by someone at dd/mm/yy, hh:mm am.</p>
                </div>
            </Container>
            <Footer type={'bg-secondary'}  />
        </>
    );
}

export default StaffHome;