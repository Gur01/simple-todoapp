import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import styled from "styled-components";

const Header = ({handleOpenMenu, openMenu}: {handleOpenMenu: ()=> void, openMenu: boolean}) => {

    return (
        <CustomAppBar
            position="absolute"
            openedMenu={openMenu}

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

const CustomAppBar = styled(AppBar)<{openedMenu: boolean}>`
    width: ${props => props.openedMenu ? "calc(100% - 240px) !important" : 0};
    margin-left: ${props => props.openedMenu ? "240px" : 0};
`;

export default Header;
