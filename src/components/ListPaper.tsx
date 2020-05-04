import Paper from "@material-ui/core/Paper";
import MoreVert from "@material-ui/icons/MoreVert";
import React from "react";
import styled from "styled-components";
import { Todo } from "../screens/Lists/Lists";
import { stopPropagation } from "../utils";
import { Menu } from ".";
import MenuItem from "@material-ui/core/MenuItem";

interface CustomCardProps {
    todo: Todo; 
    handleMouseDown: (event: React.MouseEvent, currentCardId: number) => void; 
    className: string;
    setDragAbility: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListPaper = (props: CustomCardProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget);
        props.setDragAbility(false);
    };
    
    const handleCloseMenu = () => {
        setAnchorEl(null);
        props.setDragAbility(true);
    };

    return (
        <ListItem data-ref={props.todo.id} onMouseDown={(event: React.MouseEvent) => props.handleMouseDown(event, props.todo.id)} className={props.className}>   
            {props.todo.value}
            <MenuIcon onClick={handleMenuClick} onMouseDown={stopPropagation}/>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem >NEW BOARD</MenuItem>
                <MenuItem >NEW LIST</MenuItem>
            </Menu>
        </ListItem>);
};

const ListItem = styled(Paper)`
    min-height: 50px;
    margin: 15px 0;
    width: 100%;
    height: auto;
    padding: 8px 24px;
    padding-right: 50px;
    position: relative;
    user-select: none;
`;
    

const MenuIcon = styled(MoreVert)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`;

export default ListPaper;