import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import Container from "react-bootstrap/esm/Container.js";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import InputGroup from 'react-bootstrap/InputGroup';
import HrHeader from "../../../components/Header/HrHeader";
import Footer from "../../../components/Footer/Footer";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown'

import { styled } from '@mui/system';
import {
    TablePagination,
    tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiFilter } from 'react-icons/fi';
import { TbReload } from 'react-icons/tb';
import { roleListings } from "../../../services/constants";

function RolesManagement() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false)
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
        setPage(newPage)
    }
    
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0)
    }


    const toCreateRoles = () => {
        navigate('/create-role-listing', {state: {id: location.state.id}})
    }

  useEffect(() => {
    document.title = "Roles Management";
  }, []);

  return (
        <div>
            <HrHeader />
            {loading ?
                // <Loader />
                <h1>Loading...</h1>
                :
                <>
                    <Container fluid className='contentBox pt-4'>
                        <Row className='mb-2 ms-1 me-4'>
                            <Col xs={12} md={6} lg={7}>
                                <h1>Roles Management</h1>
                            </Col>
                            {/* <Col xs={9} md={4} lg={3}>
                                <InputGroup>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip>
                                                Name: e.g. Chen Jie Yi
                                                <br />
                                                NRIC: e.g. SXXXX567A = 567A
                                                <br />
                                                Phone Number: e.g. 91234567
                                            </Tooltip>}
                                    >
                                        <Form.Control className='bg-secondary' placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => handleSearchEnter(e.key)} />
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Search</Tooltip>}>
                                        <Button variant="secondary" onClick={() => handleSearch(search)}><FiSearch /></Button>
                                    </OverlayTrigger>
                                    <Dropdown>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Filter</Tooltip>}>
                                            <Dropdown.Toggle variant='secondary' size="sm"><FiFilter /></Dropdown.Toggle>
                                        </OverlayTrigger>
                                        <Dropdown.Menu>
                                            <Dropdown.Header>Status</Dropdown.Header>
                                            {caseStatusList.map((status) => (
                                                <Dropdown.Item key={status} onClick={() => sortByStatus(status)}>{status}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </InputGroup>
                            </Col> */}
                            <Col xs={3} md={2} lg={2}>
                                <ButtonGroup>
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Create a role listing</Tooltip>}>
                                        <Button variant="secondary" className="rounded-pill px-4 me-2 my-auto text-end" onClick={toCreateRoles}>
                                        <FaPlus />&nbsp;Add Role
                                        </Button>
                                    </OverlayTrigger>
                                    {/* <OverlayTrigger placement="top" overlay={<Tooltip>Reload</Tooltip>}>
                                        <Button variant="light" className="rounded-circle" onClick={reloadProfiles}>
                                            <TbReload />
                                        </Button>
                                    </OverlayTrigger> */}
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <Container fluid>
                            <Table responsive hover className='rounded-3 overflow-hidden align-middle' size="sm">
                                <thead>
                                    <tr>
                                        <th className='bg-details text-dark ps-3'>ID</th>
                                        <th className='bg-details text-dark'>Role Name</th>
                                        <th className='bg-details text-dark'>Skill Name</th>
                                        <th className='bg-details text-dark'></th>
                                        {/* <th className='bg-details text-dark'>Phone Number</th>
                                        <th className='bg-details text-dark'>Status</th>
                                        <th className='bg-details text-dark'></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {(rowsPerPage > 0
                                        ? roleListings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : roleListings
                                    ).map((roles) => (
                                        <tr className="border-details" key={roles.id}>
                                            <td className='bg-grey ps-3'>{roles.id}</td>
                                            <td className='bg-grey'>{roles.roleName}</td>
                                            <td className='bg-grey'>{roles.skillName}</td>
                                            <td className='bg-grey'>
                                                {/* <RolesDetailsModal id={js.jsID} jsParticular={js.particulars} jsResumeInfo={js.resumeInfo} openSnackbar={openSnackbar} reloadProfiles={reloadProfiles} /> */}
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
            }
            <Footer type={'bg-secondary'} />
            {/* <JARSSnackbar open={open} setOpen={setOpen} severity={severity} message={message} /> */}
        </div>
    );
}

export default RolesManagement;
