import React from "react";

const Footer = () => {
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>{/* содержимое */}</Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </React.Fragment>
    );
};

export default Footer;