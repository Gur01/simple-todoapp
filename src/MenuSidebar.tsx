import Drawer from "@material-ui/core/Drawer";
import React from "react";
import styled from "styled-components";

const MenuSidebar = ({openMenu}: {openMenu: boolean}) => {
    return <CustomDrawer
        variant="persistent"
        anchor="left"
        open={openMenu}
        PaperProps={{style: {width: "240px"}}}
    >
h1
    </CustomDrawer>;
};


const CustomDrawer = styled(Drawer)`
    width: 240px;
    flex-shrink: 0 !important;
`;
export default MenuSidebar;

