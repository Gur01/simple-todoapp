import Drawer from "@material-ui/core/Drawer";
import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";

interface MenuSidebarProps {
    openedMenu: boolean
}

const MenuSidebar = ({openedMenu}: MenuSidebarProps) => {
    return <CustomDrawer
        variant="persistent"
        anchor="left"
        open={openedMenu}
        PaperProps={{style: {width: "240px"}}}
    >
        <Avatar alt='Ava' src='' />
    </CustomDrawer>;
};


const CustomDrawer = styled(Drawer)`
    width: 240px;
    flex-shrink: 0 !important;
`;
export default MenuSidebar;

