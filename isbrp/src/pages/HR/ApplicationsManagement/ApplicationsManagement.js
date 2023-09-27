import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container.js";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import InputGroup from "react-bootstrap/InputGroup";
import HrHeader from "../../../components/Header/HrHeader";
import Footer from "../../../components/Footer/Footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import RolesDetailsModal from "../../../components/HR/RolesManagement/RoleDetailsModal";
import { styled } from "@mui/system";
import { TablePagination, tablePaginationClasses as classes } from "@mui/base/TablePagination";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
// import staffSkill from "../../../utils/DummyData/dummyStaffSkills.json";
// import staffData from "../../../utils/DummyData/dummyStaffData.json";
import roleListings  from "../../../utils/DummyData/dummyRoleData.json";

function ApplicationsManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const CustomTablePagination = styled(TablePagination)`
    & .${classes.toolbar} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }

    & .${classes.selectLabel} {
      margin: 0;
    }

    & .${classes.select} {
      border-radius: 20px;
      background-color: #eff1f3;
    }

    & .${classes.displayedRows} {
      margin: 0;

      @media (min-width: 768px) {
        margin-left: auto;
      }
    }

    & .${classes.spacer} {
      display: none;
    }

    & .${classes.actions} {
      display: flex;
      gap: 0.25rem;
    }

    & .${classes.actions} > button {
      border: transparent;
      background-color: transparent;
      color: #eff1f3;
      border-radius: 20px;

      &:hover:enabled {
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
      }

      &:disabled {
        opacity: 0.3;
      }
    }
  `;

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSearch = (value) => {
    if (value !== "") {
      setLoading(true);
      let input = value;
      if (input.includes(" ")) {
        input = input.replace(/\s+/g, "-");
      }
      // searchProfile(input)
      // .then(function(response) {
      //     console.log(response.data)
      //     if (response.data.length > 0) {
      //         setJSInfo(response.data)
      //     } else {
      //         setJSInfo([])
      //     }
      //     setLoading(false)
      // })
      // .catch(function(error) {
      //     console.log(error)
      //     openSnackbar('searchError')
      //     setLoading(false)
      // })
    }
  };

  const handleSearchEnter = (value) => {
    if (value === "Enter") {
      handleSearch(search);
    }
  };

  const toCreateRoles = () => {
    navigate("/create-role-listing", { state: { id: location.state.id } });
  };

  useEffect(() => {
    document.title = "Applications Management";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HrHeader />
      {loading ? (
        // <Loader />
        <h1>Loading...</h1>
      ) : (
        <>
          <Container fluid className="contentBox pt-4">
            <Row className="mb-2 ms-1 me-4">
              <Col xs={12} md={6} lg={7}>
                <h1>Applications Management</h1>
              </Col>
              <Col xs={9} md={4} lg={3}>
                <InputGroup>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Applicant Name: e.g. John Doe</Tooltip>}>
                    <Form.Control className="bg-grey" placeholder="Search by Applicant Name..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => handleSearchEnter(e.key)} />
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={<Tooltip>Search</Tooltip>}>
                    <Button variant="grey" onClick={() => handleSearch(search)}>
                      <FiSearch />
                    </Button>
                  </OverlayTrigger>
                </InputGroup>
              </Col>
              <Col xs={3} md={2} lg={2}>
                <ButtonGroup>
                  <OverlayTrigger placement="top" overlay={<Tooltip>Reload</Tooltip>}>
                    <Button variant="light" className="rounded-circle">
                      <TbReload />
                    </Button>
                  </OverlayTrigger>
                </ButtonGroup>
              </Col>
            </Row>
            <hr />
            <Container fluid>
              <Table responsive hover className="rounded-3 overflow-hidden align-middle" size="sm">
                <thead>
                  <tr>
                    <th className="bg-details text-dark ps-3">Applicant Name</th>
                    <th className="bg-details text-dark">Applicant Skills</th>
                    <th className="bg-details text-dark"></th>
                  </tr>
                </thead>
                <tbody>
                  {roleListings ? console.log(roleListings) : null}
                  {(rowsPerPage > 0 ? roleListings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : roleListings).map((roles) => (
                    <tr className="border-details" key={roles.Role.id}>
                      <td className="bg-grey ps-3">{roles.Role.Role_Name}</td>
                      <td className="bg-grey">{roles.Role.Role_Desc}</td>
                      <td className="bg-grey">
                        <RolesDetailsModal className="bg-grey" role={roles.Role} />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <CustomTablePagination
                      rowsPerPageOptions={[25, 50, 100]}
                      colSpan={7}
                      count={roleListings.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        actions: {
                          showFirstButton: true,
                          showLastButton: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      className="bg-details px-3 py-2 text-dark footerText"
                    />
                  </tr>
                </tfoot>
              </Table>
            </Container>
          </Container>
        </>
      )}
      <Footer type={"bg-secondary"} />
      {/* <JARSSnackbar open={open} setOpen={setOpen} severity={severity} message={message} /> */}
    </div>
  );
}

export default ApplicationsManagement;
