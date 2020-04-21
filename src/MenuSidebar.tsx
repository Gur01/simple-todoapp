import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Dashboard from "@material-ui/icons/Dashboard";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import InsertInvitation from "@material-ui/icons/InsertInvitation";
import ViewList from "@material-ui/icons/ViewList";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

interface MenuSidebarProps {
    openedMenu: boolean;
    handleOpenMenu: ()=> void;
}

const menuItems = [
    {text: "Board", icon: InsertEmoticon, link: "/" }, 
    {text: "Profile", icon: InsertEmoticon, link: "/profile" }, 
    {text: "Calendar", icon: InsertInvitation, link: "/profile"}, 
    {text:"Boards", icon: Dashboard, link: "/profile"}, 
    {text: "Lists", icon: ViewList, link: "/profile"}
];

const MenuSidebar = ({openedMenu, handleOpenMenu}: MenuSidebarProps) => {
    const history = useHistory();
    console.log(history);
    
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


            {menuItems.map(item =><Button fullWidth key={item.text}  startIcon={<item.icon />} onClick={()=> {
                openLink(item.link);
            }}>{item.text}</Button>)}
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

