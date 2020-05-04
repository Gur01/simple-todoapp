import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const AppFooter = () =>  
    <Footer>            
        <CustomToolbar >
            <Typography variant="h6" component="h1">
                Simple TODO app
            </Typography>

        </CustomToolbar>
    </Footer>;


const CustomToolbar = styled(Toolbar)`
    min-height: auto !important;
    h1 {
        padding-top: 10px;
        padding-bottom: 10px;
    }
`;

const Footer  = styled.footer`
    background-color: #eee;
    z-index: 100
`;

export default AppFooter;
