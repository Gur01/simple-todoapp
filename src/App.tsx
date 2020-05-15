import CssBaseline from "@material-ui/core/CssBaseline";
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
import ListViewer from "./screens/Lists/ListViewer";
import Lists from "./screens/Lists/Lists";
import Profile from "./screens/Profile";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

const App = () => {
  const [openedMenu, setOpenedMenu] = React.useState<boolean>(false);

  const handleOpenMenu = () => {
    setOpenedMenu(!openedMenu);
  };

  return (
    <AppWrapper>
      <CssBaseline />
      <GlobalStyle />
      <BrowserRouter>
        <Header handleOpenMenu={handleOpenMenu} openedMenu={openedMenu} />
        <Main>
          {/* <MainScrollingInner> */}
          <Switch>
            <Route path="/" exact component={Dashboard}></Route>
            <Route path="/profile" exact component={Profile}></Route>
            <Route path="/calendar" exact component={Calendar}></Route>
            <Route path="/boards" exact component={Boards}></Route>
            <Route path="/lists" exact component={Lists}></Route>
            <Route path="/list/:id" exact component={ListViewer}></Route>
            <Route path="/signin" exact component={SignIn}></Route>
            <Route path="/signup" exact component={SignUp}></Route>

            <Route path="/" render={() => <div>Not found</div>} />
          </Switch>
          <MenuSidebar
            openedMenu={openedMenu}
            handleOpenMenu={handleOpenMenu}
          />
          {/* </MainScrollingInner> */}
        </Main>
      </BrowserRouter>
      <Footer />
    </AppWrapper>
  );
};

const Main = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export default App;
