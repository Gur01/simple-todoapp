import React from "react";
import {Button} from "@material-ui/core";
import Header from "./Header";
import MenuSidebar from "./MenuSidebar";
import styled from "styled-components";
import GlobalStyle from "./common/GlobalStyle";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./screens/Profile";
import Board from "./screens/Board";

const App = () => {

    const [openedMenu, setOpenedMenu] = React.useState<boolean>(false);
    
    const handleOpenMenu = () => {
        setOpenedMenu(!openedMenu);
    };

     
    return <AppWrapper>
        <GlobalStyle />
        <Header handleOpenMenu={handleOpenMenu} openedMenu={openedMenu}/>
        <Main>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Board}></Route>
                    <Route path="/profile" exact component={Profile}></Route>
                    <Route path="/" render={() => <div>Not found</div>} />
                </Switch>
                <MenuSidebar openedMenu={openedMenu} handleOpenMenu={handleOpenMenu}/>
            </BrowserRouter> 
            <Button>Push me</Button>
            <h1>hello</h1>
        </Main>
        
    </AppWrapper>;
};


const Main = styled.div`
    flex-grow: 1
`;

const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export default App;