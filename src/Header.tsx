import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Add from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import PersonAdd from "@material-ui/icons/PersonAdd";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Login, Menu, Spacer } from "./components";
import { useTypedSelector } from "./store";
import useActions from "./store/useActions";
import { login } from "./store/user/actions";

interface HeaderProps {
    openedMenu: boolean;
    handleOpenMenu: () => void;
}

const AppHeader = ({ handleOpenMenu, openedMenu }: HeaderProps) => {
    const [loginDispatch] = useActions([login]);
    const history = useHistory();

    React.useEffect(() => {
        loginDispatch({ name: "Ivan", surname: "Petrov", id: 123 });
    }, []);

    const isAuthorized = useTypedSelector((store) => store.user.isAuthorized);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <CustomAppBar position="relative" openedmenu={openedMenu ? 1 : 0}>
            <Toolbar>
                <IconButton color="inherit" aria-label="open drawer" onClick={handleOpenMenu} edge="start">
                    <MenuIcon />
                </IconButton>
                <Spacer />
                <Button endIcon={<Add />} onClick={handleClick}>
                    Add new
                </Button>

                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>NEW BOARD</MenuItem>
                    <MenuItem onClick={handleClose}>NEW LIST</MenuItem>
                </Menu>

                <CustomAvatar alt="Name" src="../public/1.jpg" />
                {/* John Smith */}
                <Login type={isAuthorized ? "logout" : "login"} />
                {/* Registration button */}
                <Button endIcon={<PersonAdd />} onClick={() => history.push("./signup")}>
                    sign up
                </Button>
            </Toolbar>
        </CustomAppBar>
    );
};

const CustomAppBar = styled(AppBar)<{ openedmenu: number }>`
    margin-left: ${(props) => (props.openedmenu ? "300px" : 0)};
    top: 0;
    transition: margin 0.2s ease;
    width: ${(props) => (props.openedmenu ? "calc(100% - 300px) !important" : 0)};
`;

const CustomAvatar = styled(Avatar)`
    margin: 0 30px;
`;

export default AppHeader;
