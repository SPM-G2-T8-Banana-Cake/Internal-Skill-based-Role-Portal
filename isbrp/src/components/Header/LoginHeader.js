import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'

function LoginHeader(props) {
    return (
        <Navbar fixed='top' className='bg-header px-2'>
            <Navbar.Brand>
                <Image src={require('../../assets/logo.png')} alt='Logo' width='60' />
            </Navbar.Brand>
        </Navbar>
    );
}

export default LoginHeader;