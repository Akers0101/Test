import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        // position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    main: {
        margin: "1rem"
    }
}))

export default function Popup(props) {

    const { title, children, openPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 , color: '#cf2338'}}>
                        {title}
                    </Typography>
                    
                </div>
            </DialogTitle>
            <DialogContent dividers className={classes.main}>
                {children}
            </DialogContent>
        </Dialog>
    )
}