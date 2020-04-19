import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import styled from "styled-components";

interface HeaderProps {
    openedMenu: boolean;
    handleOpenMenu: ()=> void; 
}

const Header = ({handleOpenMenu, openedMenu}: HeaderProps) => {

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
            </Toolbar>
        </CustomAppBar>
    );
};

const CustomAppBar = styled(AppBar)<{openedmenu: number}>`
    top: 0;
    width: ${props => props.openedmenu ? "calc(100% - 300px) !important" : 0};
    margin-left: ${props => props.openedmenu ? "300px" : 0};
`;

export default Header;
