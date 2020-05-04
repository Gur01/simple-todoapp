import Popover, { PopoverProps } from "@material-ui/core/Popover";
import React from "react";

const CustomPopover = (props: PopoverProps) => ( <Popover 
    anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
    }}
    transformOrigin={{
        vertical: "top",
        horizontal: "right",
    }}
    {...props}
>
    {props.children}
</Popover>);




export default CustomPopover;