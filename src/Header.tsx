import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import styled from "styled-components";
import {Spacer, Authorization} from "./components";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";

interface HeaderProps {
    openedMenu: boolean;
    handleOpenMenu: ()=> void; 
}

const AppHeader = ({handleOpenMenu, openedMenu}: HeaderProps) => {

    const [isAuthorized, setAuthorization] = React.useState(true);

    const handleLogin = ()=> {
        setAuthorization(!isAuthorized);
    };
    return (
        <CustomAppBar
            position="relative"
            openedmenu={openedMenu ? 1 : 0}

        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleOpenMenu}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <Spacer/>
                <Button endIcon={<Add />}>Add new</Button>
                <CustomAvatar alt='Name' src="../public/1.jpg" /> 
                {/* John Smith */}
                <Authorization type={isAuthorized ? "logout" : "login"} onClick={handleLogin}/>


            </Toolbar>
        </CustomAppBar>
    );
};

const CustomAppBar = styled(AppBar)<{openedmenu: number}>`
    margin-left: ${props => props.openedmenu ? "300px" : 0};
    top: 0;
    transition: margin .2s ease;
    width: ${props => props.openedmenu ? "calc(100% - 300px) !important" : 0};
`;

const CustomAvatar = styled(Avatar)`
    margin: 0 30px;
`;


export default AppHeader;
