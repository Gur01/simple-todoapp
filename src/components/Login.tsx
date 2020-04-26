import Button from "@material-ui/core/Button";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Person from "@material-ui/icons/Person";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";


interface AuthorizationProps {
    type: "login" | "logout";
}

const Authorization = ({type}: AuthorizationProps)=> {
    const history = useHistory();

    return (<Auth>
        {type === "login" ? 
            <Button endIcon={<ExitToApp />} onClick={()=> history.push("./signin")}>sign in</Button> 
            : <Button endIcon={<Person />} onClick={()=> history.push("./signin")}>sign out</Button>}
    </Auth>);};

const Auth = styled.div`
    display: flex;
    align-items: center;
    text-transform: uppercase;
`;

export default Authorization;
