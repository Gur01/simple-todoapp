import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import styled from "styled-components";

const AppFooter = () =>  
    <Footer>            
        <Toolbar>
            <h1>Simple TODO app</h1>
        </Toolbar>
    </Footer>;


const Footer  = styled.footer`
    background-color: #eee;
    z-index: 100
`;

export default AppFooter;
