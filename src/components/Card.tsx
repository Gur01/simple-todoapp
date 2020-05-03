import Paper from "@material-ui/core/Paper";
import MoreVert from "@material-ui/icons/MoreVert";
import React from "react";
import styled from "styled-components";
import {Todo} from "../screens/Lists/Lists";

interface CustomCardProps {
    todo: Todo; 
    handleMouseDown: (event: React.MouseEvent, currentCardId: number) => void; 
    className: string;
}

const CustomCard = (props: CustomCardProps) => {
    return (
        <Card data-ref={props.todo.id} onMouseDown={(event: React.MouseEvent) => props.handleMouseDown(event, props.todo.id)} className={props.className}>   
            {props.todo.value}
            <MenuIcon />
        </Card>);
};

const Card = styled(Paper)`
    min-height: 50px;
    margin: 15px 0;
    width: 100%;
    height: auto;
    padding: 8px 24px;
    padding-right: 50px;
    position: relative;
    `;
    

const MenuIcon = styled(MoreVert)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`;

export default CustomCard;