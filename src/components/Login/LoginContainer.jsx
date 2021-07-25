import React, { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import FaceIcon from '@material-ui/icons/Face';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Typography, Paper, TextField, IconButton, Button } from "@material-ui/core";
import { login } from "../../api/api.login";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    white: {
        color: theme.palette.text.secondary
    },
    marginBottom: {
        marginBottom: theme.spacing(2)
    },
    noPadding: {
        padding: theme.spacing(0)
    },
    error: {
        color: theme.palette.error.main
    },
    forgotPWD: {
        color: theme.palette.info.main
    }
}));

const LoginContainer = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { error, user } = useSelector(store => store);

    const [type, setType] = useState("password");
    const checkType = type === "password";
    const showPassword = () => setType(checkType ? "" : "password");

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disableLogin, setDisableLogin] = useState(true);

    useEffect(() => {
        setDisableLogin(userEmail.trim() === "" || password.trim() === "");
    });

    const loginHandler = async () => {
        login(dispatch, { userEmail, password });
    };

    return (
        <>
            {
                user && <Redirect to="/home" />
            }
            <Grid className={classes.root} container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6} lg={4}>
                    <Typography variant="h4" align="center" className={classes.white}>
                        Welcome to Todo App
                    </Typography>
                    <Paper className={classes.paper}>
                        <Grid container className={classes.marginBottom} alignItems="flex-end">
                            <TextField autoComplete="true" fullWidth id="username" label="User Name"
                                InputProps={{
                                    endAdornment: <FaceIcon />
                                }}
                                onChange={({ target: { value } }) => setUserEmail(value)}
                                value={userEmail}
                                required
                            />
                        </Grid>
                        <Grid container className={classes.marginBottom} alignItems="flex-end">
                            <TextField autoComplete="true" fullWidth id="password" label="Password" type={type}
                                InputProps={{
                                    endAdornment: <IconButton className={classes.noPadding} onClick={showPassword}>
                                        {checkType ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                }}
                                onChange={({ target: { value } }) => setPassword(value)}
                                value={password}
                                required
                            />
                        </Grid>
                        {error && <Typography align="left" className={`${classes.error} ${classes.marginBottom}`}>
                            {error}
                        </Typography>}
                        <Grid container justifyContent="flex-end">
                            <Button className={`${classes.forgotPWD} ${classes.marginBottom}`}>
                                Forgot username/password
                            </Button>
                        </Grid>
                        <Button fullWidth disabled={disableLogin} variant="contained" color="primary" onClick={loginHandler}>
                            login
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default LoginContainer;
