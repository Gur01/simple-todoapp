import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Add from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import styled from "styled-components";
import { Authorization, Menu, Spacer } from "./components";
import { useTypedSelector } from "./store";

interface HeaderProps {
    openedMenu: boolean;
    handleOpenMenu: ()=> void; 
}

const AppHeader = ({handleOpenMenu, openedMenu}: HeaderProps) => {
    const user = useTypedSelector(store => store.user);

    React.useEffect(()=> {
        
    }, []);

    console.log(user);
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isAuthorized, setAuthorization] = React.useState(true);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <Button endIcon={<Add />} onClick={handleClick}>Add new</Button>

                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>NEW BOARD</MenuItem>
                    <MenuItem onClick={handleClose}>NEW LIST</MenuItem>
                </Menu>


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
