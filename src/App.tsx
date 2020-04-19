import React from "react";
import {Button} from "@material-ui/core";
import Header from "./Header";
import MenuSidebar from "./MenuSidebar";
import styled from "styled-components";
import GlobalStyle from "./common/GlobalStyle";
const App = () => {

    const [openedMenu, setOpenedMenu] = React.useState<boolean>(true);
    
    const handleOpenMenu = () => {
        setOpenedMenu(!openedMenu);
    };

     
    return <AppWrapper>
        <GlobalStyle />
        <Header handleOpenMenu={handleOpenMenu} openedMenu={openedMenu}/>
        <Main>        
            <MenuSidebar openedMenu={openedMenu}/>
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