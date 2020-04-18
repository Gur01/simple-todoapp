import React from "react";
import {Button} from "@material-ui/core";
import Header from "./Header";
import MenuSidebar from "./MenuSidebar";

const App = () => {

    const [openMenu, setOpenMenu] = React.useState<boolean>(false);
    
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

     
    return <>
        <Header handleOpenMenu={handleOpenMenu} openMenu={openMenu}/>
        <MenuSidebar openMenu={openMenu}/>
        <Button>Push me</Button>
        <h1>hello</h1>
        <Footer>
    </>;
};

export default App;