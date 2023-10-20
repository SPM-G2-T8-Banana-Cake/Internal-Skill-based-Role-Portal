import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container.js";
import HrHeader from "../../components/Header/HrHeader";
import Footer from "../../components/Footer/Footer";
import { hrReadRoleListings } from "../../services/api";
import Badge from "@mui/material/Badge";
import { FiUser, FiBook } from "react-icons/fi";
import bgIcon from "../../assets/staffHomeBg.png";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FiMoreVertical } from "react-icons/fi";


function HrHome() {
  const [roleListings, setRoleListings] = useState({});
  const [noRoleListings, setNoRoleListings] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const handleChange = (acc) => (event, isExpanded) => {
    setExpanded(isExpanded ? acc : false);
  };
  
  useEffect(() => {
    document.title = "Home";
    window.scrollTo(0, 0);

      hrReadRoleListings()
        .then(function (response) {
          console.log("Read Role Listings Endpoint Called");
          console.log(response);
          if (response.data.length > 0) {
            setNoRoleListings(response.data.length);
            let data = {};
            for (let i = 0; i < response.data.length; i++) {
              if (!Object.keys(data).includes(response.data[i].Dept)) {
                data[response.data[i].Dept] = [response.data[i].Role_Name];
              } else {
                data[response.data[i].Dept].push(response.data[i].Role_Name);
              }
            }
            setRoleListings(data);
          }
        })
        .catch(function (error) {
          console.log(error);
          setNoRoleListings(0);
          setRoleListings({});
        });
    }
  , []);
  
  console.log("Role Listing", roleListings);
  return (
    <>
      <HrHeader />

      <Container fluid className="contentBox p-4" style={{ backgroundImage: `url(${bgIcon})`, backgroundRepeat: "no-repeat", backgroundPosition: "right bottom" }}>
        <h1>Notifications</h1>
        <hr />
        <Row>
          <Col xs={6} sm={5} md={4}>
            <div className="bg-grey w-100 rounded p-3">
              <h4>
                Role Listings&nbsp;
                <Badge badgeContent={noRoleListings} color="primary">
                  <FiBook color="black" />
                </Badge>
              </h4>
              <p>Check out the role listings by {Object.keys(roleListings).length} departments below!</p>

          
              {Object.entries(roleListings).map((roleNames, dept) => {
                return (
                    
                        <Accordion className="bg-button mb-2" expanded={expanded === `acc${dept}`} onChange={handleChange(`acc${dept}`)}>
        <AccordionSummary
          expandIcon={<FiMoreVertical/>}
        >
       <p className="font-italic fw-bold">{Object.keys(roleListings)[dept]}        <Badge badgeContent={Object.values(roleListings)[dept].length} color="primary">
                  <FiBook color="black" />
                </Badge></p>
        </AccordionSummary>
        <AccordionDetails>
        <ul>
                      {roleListings[Object.keys(roleListings)[dept]].map((roleName, index) => {
                        return <li key={roleName}>{roleName}</li>;
                      })}
                    </ul>
        </AccordionDetails>
      </Accordion>

                );
              })}
            </div>
          </Col>
          <Col xs={4} md={4}>
            <div className="bg-grey w-100 mb-3 rounded p-3">
              <h4>
                Applications &nbsp;
                <Badge badgeContent={0} color="primary">
                  <FiUser color="black" />
                </Badge>
              </h4>
              <p>Check out the new applications!</p>
              <p className="text-error">- WIP -</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer type={"bg-secondary"} />
    </>
  );
}

export default HrHome;
