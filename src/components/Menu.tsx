import Menu, { MenuProps } from "@material-ui/core/Menu";
import React from "react";

const CustomMenu = (props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
);

export default CustomMenu;
