import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dashboard from "@material-ui/icons/Dashboard";
import DesktopWindows from "@material-ui/icons/DesktopWindows";
import InsertInvitation from "@material-ui/icons/InsertInvitation";
import Person from "@material-ui/icons/Person";
import ViewList from "@material-ui/icons/ViewList";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

interface MenuSidebarProps {
    openedMenu: boolean;
    handleOpenMenu: ()=> void;
}

const menuItems = [
    {text: "Dashboard", icon: DesktopWindows, link: "/" }, 
    {text: "Profile", icon: Person, link: "/profile" }, 
    {text: "Calendar", icon: InsertInvitation, link: "/calendar"}, 
    {text:"Boards", icon: Dashboard, link: "/boards"}, 
    {text: "Lists", icon: ViewList, link: "/lists"}
];

const MenuSidebar = ({openedMenu, handleOpenMenu}: MenuSidebarProps) => {
    const history = useHistory();
    
    const openLink = (link: string) => {
        history.push(link);
        handleOpenMenu();
    };

    return <CustomDrawer
        variant="persistent"
        anchor="left"
        open={openedMenu}
        PaperProps={{style: {width: "300px"}}}
    >
        <UserInfo>
            <CustomAvatar alt='Name' src="../public/1.jpg" />
            <UserName>John Smith</UserName>


            {menuItems.map(item => {
                const Icon = item.icon;
                return (
                    <List style={{width: "100%"}} component="nav" key={item.text}>
                        <ListItem button onClick={()=> openLink(item.link)}>
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    </List>);
            }          
            )}
        </UserInfo>
        
    </CustomDrawer>;
};

const CustomDrawer = styled(Drawer)`
    flex-shrink: 0 !important;
    width: 300px;
    .MuiPaper-root {
        background-color: #eee;
    }
`;

const CustomAvatar = styled(Avatar)`
    margin-top: 20px;
    height: 200px !important;
    width: 200px !important;
`;

const UserInfo = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const UserName = styled.h3`
    marfin-top: 20px;
`;



export default MenuSidebar;

