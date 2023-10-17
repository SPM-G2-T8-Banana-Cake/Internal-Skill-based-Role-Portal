import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container.js';
import StaffHeader from "../../components/Header/StaffHeader";
import Footer from "../../components/Footer/Footer";
import { hrReadRoleApplicants } from '../../services/api';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/esm/Image';
import bgHero from "../../assets/viewingIconTransparent.png"

function StaffHome () {
    const id = localStorage.getItem("id");
    const [applicants, setApplicants] = useState([]);
    
    useEffect(() => {
        document.title = 'Home'
        window.scrollTo(0,0);

        hrReadRoleApplicants()
        .then(function (response) {
          console.log("Read Applicants Endpoint Called");
          console.log(response);
          if (response.data.length > 0) {
           
            let data = [];
            for (let i = 0; i < response.data.length; i++) {
                if(response.data[i].Staff_ID === id) {
              data.push(response.data[i]);
            }
            setApplicants(data);
        }
          }
        })
        .catch(function (error) {
          console.log(error);
          setApplicants([]);
        });
     
    }, [id])

    localStorage.setItem("appliedRoles", applicants);
    return (
        <>
            <StaffHeader />
            <Container fluid className='contentBox p-4'>
                <h1>Roles Applied to</h1>
                <hr />
                <div className='p-2'>
                    {applicants.map((application, index) => {
                        return (
                        <div className='bg-grey rounded-2 p-3 mb-3' key={index}>
                            <Row>
                                <Col xs={4} sm={3} md={2}>
                                    <Image src={bgHero} alt="Application Icon" fluid/>
                                </Col>
                                <Col>
                                <span className='fs-5 bg-details rounded p-1'><b className='pb-2'>Application #{index+1}</b></span>
                                <br /><br />
                                    <span className='fw-bold'>Role Name</span>
                                    <br />
                                    <span>{application.Role_Name}</span>
                                    <br /><br />
                                    <span className='fw-bold'>Role Description</span>
                                    <br />
                                    <span>{application.Role_Desc}</span>
                                    <br /><br />
                                    <span className='fw-bold'>Role Skills Required</span>
                                    <br />
                                    <span>{application.Role_Skills}</span>
                                </Col>
                            </Row>
                        </div>
                        )
                    })}
                </div>
            </Container>
            <Footer type={'bg-secondary'}  />
        </>
    );
}

export default StaffHome;