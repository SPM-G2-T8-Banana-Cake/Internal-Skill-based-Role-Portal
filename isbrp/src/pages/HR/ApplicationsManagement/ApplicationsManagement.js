import React, { useEffect, useState } from "react";
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
import Loader from "../../../components/Standard/loader";
import IsbrpSnackbar from "../../../components/Standard/isbrpSnackBar";
import { styled } from "@mui/system";
import { TablePagination, tablePaginationClasses as classes } from "@mui/base/TablePagination";
import { FiSearch } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import ApplicantDetailsModal from "../../../components/HR/ApplicationsManagement/ApplicantDetailsModal";
import { hrReadRoleApplicants } from "../../../services/api";

function ApplicationsManagement() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [applicants, setApplicants] = useState([]);
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
    setRowsPerPage(parseInt(e.target.value));
    setPage(0);
  };

  const handleSearch = (value) => {
    if (value !== "") {
      setLoading(true);
      hrReadRoleApplicants()
        .then(function (response) {
          console.log("Read Applicants Endpoint Called");
          if (response.data.length > 0) {
            let filteredData = [];
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].Staff_Name.toLowerCase().includes(value)) {
                filteredData.push(response.data[i]);
              }
            }
            setApplicants(filteredData);
          } else {
            setApplicants([]);
          }
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          openSnackbar("searchError");
        });
    }
  };

  const handleSearchEnter = (value) => {
    if (value === "Enter") {
      handleSearch(search);
    }
  };

  const openSnackbar = (value) => {
    if (value === "modifyRoleSuccess") {
      setSeverity("success");
      setMessage("Role modified successfully.");
      setOpen(true);
    } else if (value === "modifyRoleError") {
      setSeverity("error");
      setMessage("Something went wrong while modifying role. Please try again.");
      setOpen(true);
    } else if (value === "getAllError") {
      setSeverity("error");
      setMessage("Something went wrong while getting all roles. Please try again.");
      setOpen(true);
    } else if (value === "searchError") {
      setSeverity("error");
      setMessage("Something went wrong while searching for the role listing. Please try again.");
      setOpen(true);
    } else if (value === "filterError") {
      setSeverity("error");
      setMessage("Something went wrong while filtering the role listings. Please try again.");
      setOpen(true);
    }
  };

  const reloadApplications = () => {
    setLoading(true);
    hrReadRoleApplicants()
      .then(function (response) {
        console.log("Read Applicants Endpoint Called");
        if (response.data.length > 0) {
          let data = [];
          for (let i = 0; i < response.data.length; i++) {
            data.push(response.data[i]);
          }
          setApplicants(data);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        openSnackbar("getAllError");
        setApplicants([]);
      });
  };

  useEffect(() => {
    document.title = "Applications Management";
    window.scrollTo(0, 0);
    setLoading(true);
    hrReadRoleApplicants()
      .then(function (response) {
        console.log("Read Applicants Endpoint Called");
        if (response.data.length > 0) {
          let data = [];
          for (let i = 0; i < response.data.length; i++) {
            data.push(response.data[i]);
          }
          setApplicants(data);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        openSnackbar("getAllError");
        setApplicants([]);
      });
  }, []);

  return (
    <div>
      <HrHeader />
      {loading ? (
        <Loader />
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
                    <Button variant="light" className="rounded-circle" onClick={reloadApplications}>
                      <TbReload />
                    </Button>
                  </OverlayTrigger>
                </ButtonGroup>
              </Col>
            </Row>
            <Container fluid>
              <Table responsive hover className="rounded-3 overflow-hidden align-middle" size="sm">
                <thead>
                  <tr>
                    <th className="bg-details text-dark ps-3">Applicant Name</th>
                    <th className="bg-details text-dark">Applicant Skills</th>
                    <th className="bg-details text-dark">Role Applied</th>
                    <th className="bg-details text-dark"></th>
                  </tr>
                </thead>
                <tbody>
                  {(rowsPerPage > 0 ? applicants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : applicants).map((applicant, applicantNo) => (
                    <tr className="border-details" key={applicantNo}>
                      <td className="bg-grey ps-3">{applicant.Staff_Name}</td>
                      <td className="bg-grey">{applicant.Staff_Skills}</td>
                      <td className="bg-grey">{applicant.Role_Name}</td>
                      <td className="bg-grey">
                        <ApplicantDetailsModal className="bg-grey" applicant={applicant} />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <CustomTablePagination
                      rowsPerPageOptions={[25, 50, 100]}
                      colSpan={7}
                      count={applicants.length}
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
      <IsbrpSnackbar open={open} setOpen={setOpen} severity={severity} message={message} />
    </div>
  );
}

export default ApplicationsManagement;
