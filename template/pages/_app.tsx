import { getPageContext } from "@lib/page-context";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import JssProvider from "react-jss/lib/JssProvider";

class MyApp extends App {
    private readonly pageContext = getPageContext();

    componentDidMount() {
        const jssStyles = document.querySelector("#jss-server-side");

        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Head>
                    <title>Calorie tracker</title>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                    />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                </Head>
                <JssProvider
                    registry={this.pageContext.sheetsRegistry}
                    generateClassName={this.pageContext.generateClassName}
                >
                    <MuiThemeProvider
                        theme={this.pageContext.theme}
                        sheetsManager={this.pageContext.sheetsManager}
                    >
                        <CssBaseline />
                        <AppBar position="absolute" color="primary">
                            <Toolbar variant="dense">
                                <IconButton color="inherit">
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                >
                                    Calorie counter
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Component
                            pageContext={this.pageContext}
                            {...pageProps}
                        />
                    </MuiThemeProvider>
                </JssProvider>
            </Container>
        );
    }
}

export default MyApp;
