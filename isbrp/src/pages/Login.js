import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../components/Header/LoginHeader.js'
import Footer from '../components/Footer/Footer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import Image from 'react-bootstrap/esm/Image.js';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import logo from '../assets/logo.png'

import { BsPersonFillGear, BsFillBuildingsFill } from 'react-icons/bs'
import { FiArrowLeft } from 'react-icons/fi'

function Login() {
    const navigate = useNavigate()
    const [hrLogin, setHrLogin] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const handleEnter = (value) => {
        if (value === 'Enter') {
            handleLogin()
        }
    }

    const handleLogin = () => {
        if (username === 'hr10001' && password === 'password') {
            navigate('/home', {state: {id: 'hr10001'}})
            setError(false)
        } else {
            setError(true)
        }
    }

    useEffect(() => {
        document.title = "Login";
    }, [])

    return (
        <div className='bg-background' style={{height: 'fit-content'}}>
            <LoginHeader type={'bg-secondary'} />
            <Container fluid className='loginBox'>
            <Row className='mx-auto'>
                        <Image className='mx-auto' src={logo} style={{height: '580px', width:'630px'}} fluid />
        </Row>
                <Row className='mx-auto'>
                    <Col className='d-flex align-items-center justify-content-center'>
                        <div style={{ width: '50vw', height: '40vh'}} className='bg-light rounded m-5 mt-sm-0 mt-md-0 mt-lg-0 p-5'>
                            <h1>
                                {hrLogin ?
                                <OverlayTrigger placement="top" overlay={<Tooltip>Back to Roles</Tooltip>}>
                                    <Button variant='light' className='rounded-circle me-1' onClick={() => setHrLogin(false)}><FiArrowLeft /></Button>
                                </OverlayTrigger>
                                : null}
                                Login
                            </h1>
                            <hr />
                            {hrLogin ?
                                <>
                                    <Form.Group className='mb-3'>
                                        <Form.Label className='fw-bold'>Username</Form.Label>
                                        <Form.Control className='bg-grey' defaultValue={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => handleEnter(e.key)} />
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label className='fw-bold'>Password</Form.Label>
                                        <Form.Control className='bg-grey' defaultValue={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => handleEnter(e.key)} type='password' />
                                    </Form.Group>
                                    {error ?
                                        <Alert variant="danger">Username or password is incorrect.</Alert>
                                    :null}
                                    <div className='text-end'>
                                        <Button variant='button' onClick={handleLogin}>Login</Button>
                                    </div>
                                </>
                            :
                            <>
                                <p className='fw-bold t'>I am a...</p>
                                <InputGroup className='mb-3'>
                                    <InputGroup.Text style={{width: '10%'}} className='bg-grey justify-content-center'><BsPersonFillGear /></InputGroup.Text>
                                    <Button style={{width: '90%'}} variant='white' onClick={() => setHrLogin(true)}>Human Resource Executive</Button>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text style={{width: '10%'}} className='bg-grey justify-content-center'><BsFillBuildingsFill /></InputGroup.Text>
                                    <Button style={{width: '90%'}} variant='white' onClick={() => navigate('pc-login')}>Company Staff</Button>
                                </InputGroup>
                            </>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer type={'bg-secondary'}/>
        </div>
    );
}

export default Login;