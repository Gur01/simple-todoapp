import Menu, { MenuProps } from "@material-ui/core/Menu";
import React from "react";

const CustomMenu = (props: MenuProps) => (<Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
    }}
    transformOrigin={{
        vertical: "top",
        horizontal: "center",
    }}
    {...props}
/>);

export default CustomMenu;