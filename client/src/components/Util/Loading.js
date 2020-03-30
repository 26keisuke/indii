import React from "react"
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        left: "50%",
        top: "40%",
        zIndex: 100,
        transform: "translate(-50%, 0)",
    },
}));
  
  
const Loading = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress color="primary"/>
        </div>
    )
}

export default Loading