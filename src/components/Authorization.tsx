import React from "react";
import styled from "styled-components";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Person from "@material-ui/icons/Person";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Button from "@material-ui/core/Button";


interface AuthorizationProps {
    type: "login" | "logout";
    onClick: () => void;
}

const Authorization = ({type, onClick}:AuthorizationProps)=> (
    <Auth onClick={onClick}>
        {type === "login" ? 
            <Button endIcon={<ExitToApp />}>login</Button> 
            : <Button endIcon={<Person />}>logout</Button>}
        <Button endIcon={<PersonAdd />}>Register</Button>
    </Auth>);

const Auth = styled.div`
    display: flex;
    align-items: center;
    text-transform: uppercase;
`;

export default Authorization;
