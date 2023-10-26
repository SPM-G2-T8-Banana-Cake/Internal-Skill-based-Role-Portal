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
import IsbrpSnackbar from "../../../components/Standard/isbrpSnackBar";
import { departments } from "../../../utils/constants";
import Dropdown from "react-bootstrap/Dropdown";
import { FiFilter } from "react-icons/fi";
import { hrReadRoleListings } from "../../../services/api";
import { styled } from "@mui/system";
import { TablePagination, tablePaginationClasses as classes } from "@mui/base/TablePagination";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import Loader from "../../../components/Standard/loader";

function RolesManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [roleListings, setRoleListings] = useState([]);

  const openSnackbar = (value) => {
    if (value === "modifyRoleSuccess") {
      setSeverity("success");
      setMessage("Role modified successfully.");
      setOpen(true);
    } else if (value === "modifyRoleError") {
      setSeverity("error");
      setMessage("Something went wrong while modifying role. Please try again.");
      setOpen(true);
    } else if (value === "deleteRoleSuccess") {
      setSeverity("error");
      setMessage("Role deleted successfully.");
      setOpen(true);
    } else if (value === "deleteRoleError") {
      setSeverity("error");
      setMessage("Something went wrong while deleting the role. Please try again.");
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
      hrReadRoleListings()
        .then(function (response) {
          console.log("Read Role Listings Endpoint Called");
          if (response.data.length > 0) {
            let filteredData = [];
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].Role_Name.toLowerCase().includes(value)) {
                filteredData.push(response.data[i]);
              }
            }
            setRoleListings(filteredData);
          } else {
            setRoleListings([]);
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

  const reloadRoleListings = () => {
    setLoading(true);
    hrReadRoleListings()
      .then(function (response) {
        console.log("Read Role Listings Endpoint Called");
        if (response.data.length > 0) {
          let data = [];
          for (let i = 0; i < response.data.length; i++) {
            data.push(response.data[i]);
          }
          setRoleListings(data);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        openSnackbar("getAllError");
      });
  };

  const sortByDepartment = (department) => {
    setLoading(true);
    hrReadRoleListings()
      .then(function (response) {
        console.log("Read Role Listings Endpoint Called");
        if (response.data.length > 0) {
          let filteredData = [];
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].Dept === department) {
              filteredData.push(response.data[i]);
            }
          }
          setRoleListings(filteredData);
        } else {
          setRoleListings([]);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        openSnackbar("filterError");
      });
  };

  const toCreateRoles = () => {
    navigate("/create-role-listing", { state: { id: location.state.id } });
  };

  useEffect(() => {
    document.title = "Roles Management";
    window.scrollTo(0, 0);
    setLoading(true);
    hrReadRoleListings()
      .then(function (response) {
        console.log("Read Role Listings Endpoint Called");
        if (response.data.length > 0) {
          let data = [];
          for (let i = 0; i < response.data.length; i++) {
            data.push(response.data[i]);
          }
          setRoleListings(data);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        openSnackbar("getAllError");
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
                <h1>Roles Management</h1>
              </Col>
              <Col xs={9} md={4} lg={3}>
                <InputGroup>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Role Name: e.g. Data Analyst</Tooltip>}>
                    <Form.Control className="bg-background" placeholder="Search by Role Name..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => handleSearchEnter(e.key)} />
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={<Tooltip>Search</Tooltip>}>
                    <Button variant="background" onClick={() => handleSearch(search)}>
                      <FiSearch />
                    </Button>
                  </OverlayTrigger>
                  <Dropdown>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Filter</Tooltip>}>
                      <Dropdown.Toggle variant="background" size="sm">
                        <FiFilter />
                      </Dropdown.Toggle>
                    </OverlayTrigger>
                    <Dropdown.Menu>
                      <Dropdown.Header>Department</Dropdown.Header>
                      {departments.map((department) => (
                        <Dropdown.Item key={department} onClick={() => sortByDepartment(department)} className="fs-6">
                          {department}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </InputGroup>
              </Col>
              <Col xs={3} md={2} lg={2}>
                <ButtonGroup>
                  <OverlayTrigger placement="top" overlay={<Tooltip>Create a role listing</Tooltip>}>
                    <Button variant="details" className="rounded-pill px-4 me-2 my-auto text-end" onClick={toCreateRoles}>
                      <FaPlus />
                      &nbsp;Add Role
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={<Tooltip>Reload</Tooltip>}>
                    <Button variant="light" className="rounded-circle" onClick={reloadRoleListings}>
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
                    <th className="bg-details text-dark ps-3">ID</th>
                    <th className="bg-details text-dark">Name</th>
                    <th className="bg-details text-dark">Description</th>
                    <th className="bg-details text-dark"></th>
                  </tr>
                </thead>
                <tbody>
                  {(rowsPerPage > 0 ? roleListings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : roleListings).map((roles) => (
                    <tr className="border-details" key={roles.Role_ID}>
                      <td className="bg-background ps-3">{roles.Role_ID}</td>
                      <td className="bg-background ps-3">{roles.Role_Name}</td>
                      <td className="bg-background">{roles.Role_Desc}</td>
                      <td className="bg-background">
                        <RolesDetailsModal className="bg-grey" role={roles} reloadRoleListings={reloadRoleListings} openSnackbar={openSnackbar} />
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
      <IsbrpSnackbar open={open} setOpen={setOpen} severity={severity} message={message} />
    </div>
  );
}

export default RolesManagement;
