import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./common/GlobalStyle";
import Footer from "./Footer";
import Header from "./Header";
import MenuSidebar from "./MenuSidebar";
import Boards from "./screens/Boards";
import Calendar from "./screens/Calendar";
import Dashboard from "./screens/Dashboard";
import Lists from "./screens/Lists";
import Profile from "./screens/Profile";

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
                    <Route path="/" exact component={Dashboard}></Route>
                    <Route path="/profile" exact component={Profile}></Route>
                    <Route path="/calendar" exact component={Calendar}></Route>
                    <Route path="/boards" exact component={Boards}></Route>
                    <Route path="/lists" exact component={Lists}></Route>
                    
                    <Route path="/" render={() => <div>Not found</div>} />
                </Switch>
                <MenuSidebar openedMenu={openedMenu} handleOpenMenu={handleOpenMenu}/>
            </BrowserRouter> 
        </Main>
        <Footer />


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