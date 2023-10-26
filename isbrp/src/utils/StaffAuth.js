import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SessionExpired from "./SessionExpired";

const StaffAuth = (props) => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('userType') === 'staff') {
            setIsLoggedIn(true);
        }
        }, [navigate]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : <SessionExpired type='success' />
            }
        </React.Fragment>
    );
}
export default StaffAuth;