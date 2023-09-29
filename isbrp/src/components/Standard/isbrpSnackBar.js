import React from "react";
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert';

function isbrpSnackbar(props) {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} {...props} />;
    });

    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={() => props.setOpen(false)}>
            <Alert onClose={() => props.setOpen(false)} severity={props.severity} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default isbrpSnackbar;