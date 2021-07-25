import React from "react";
import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginContainer from "../Login/LoginContainer";
import HomeContainer from "../Home/HomeContainer";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        height: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url(../../images/bg.jpg)",
        backgroundPosition: "center",
    },
}));

const AppContainer = () => {
    const styles = useStyles();

    return (<>
        <CssBaseline />
        <Container maxWidth="xl" className={styles.root}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LoginContainer} />
                    <Route exact path="/home" component={HomeContainer} />
                </Switch>
            </BrowserRouter>
        </Container>
    </>);
};

export default AppContainer;
