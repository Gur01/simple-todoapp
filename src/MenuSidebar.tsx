import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dashboard from "@material-ui/icons/Dashboard";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import InsertInvitation from "@material-ui/icons/InsertInvitation";
import ViewList from "@material-ui/icons/ViewList";
import React from "react";
import styled from "styled-components";

interface MenuSidebarProps {
    openedMenu: boolean
}

const menuItems = [
    {text: "Profile", icon: InsertEmoticon }, 
    {text: "Calendar", icon: InsertInvitation}, 
    {text:"Boards", icon: Dashboard}, 
    {text: "Lists", icon: ViewList}
];

const MenuSidebar = ({openedMenu}: MenuSidebarProps) => {
    return <CustomDrawer
        variant="persistent"
        anchor="left"
        open={openedMenu}
        PaperProps={{style: {width: "300px"}}}
    >
        <UserInfo>
            <CustomAvatar alt='Name' src="../public/1.jpg" />
            <UserName>John Smith</UserName>
            <CustomList>
                {menuItems.map(item =>{
                    const Icon = item.icon;
                    return (<ListItem button key={item.text}>
                        <ListItemIcon>
                            <Icon />
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>);})}
                
            </CustomList>
        </UserInfo>
        
    </CustomDrawer>;
};

const CustomDrawer = styled(Drawer)`
    flex-shrink: 0 !important;
    width: 300px;
    backgrounf-color: #ccc;
`;

const CustomAvatar = styled(Avatar)`
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

const CustomList = styled(List)`
    width: 100%;
`;



export default MenuSidebar;

