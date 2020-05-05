import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import MoreVert from "@material-ui/icons/MoreVert";
import React from "react";
import styled from "styled-components";
import { Popover } from ".";
import { Todo } from "../screens/Lists/Lists";
import { stopPropagation } from "../utils";

interface CustomCardProps {
    todo: Todo; 
    handleMouseDown: (event: React.MouseEvent, currentCardId: number) => void; 
    className: string;
    setDragAbility: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListPaper = (props: CustomCardProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [value, setValue] = React.useState("no");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleMenuClick = (event: React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget);
        props.setDragAbility(false);
    };
    
    const handleCloseMenu = () => {
        setAnchorEl(null);
        props.setDragAbility(true);
    };

    const setEndOfContenteditable = (contentEditableElement: Element) =>
    {
        let range = undefined;
        let selection = undefined;
        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection?.removeAllRanges();//remove any selections already made
            selection?.addRange(range);//make the range you have just created the visible selection
        }
    };

    const editListItem = (event: any, id: number) => {
        event.persist();
        const currentItem = event.currentTarget;
        currentItem.setAttribute("contentEditable", "true");
        setEndOfContenteditable(currentItem);
    };
    
    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        const currentItem = event.currentTarget;
        currentItem.removeAttribute("contentEditable");
        props.setDragAbility(true);
    };


    return (
        <ListItemCard data-ref={props.todo.id} onMouseDown={(event: React.MouseEvent) => props.handleMouseDown(event, props.todo.id)} className={props.className}>   
            <div style={{display: "inline-block"}} >{props.todo.value}</div>
            <MenuIcon onClick={handleMenuClick} onMouseDown={stopPropagation}/>
            <Popover
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <CustomList>
                    <ListItem>Created by: Me</ListItem>
                    <ListItem>Date: 2002.11.25</ListItem>
                    <Divider />
                    <ListItem button>Edit</ListItem>
                    <ListItem button>Delete</ListItem>
                    <Divider />
                    <CustomFormControl component="fieldset">
                        {/* <FormLabel>Priority</FormLabel> */}

                        <RadioGroup value={value} onChange={handleChange}>
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                            <FormControlLabel value="important" control={<Radio />} label="Important" />
                            <FormControlLabel value="urgent" control={<Radio />} label="Urgent" />
                        </RadioGroup>
                    </CustomFormControl>
                </CustomList>
            </Popover>
        </ListItemCard>);
};

const CustomList = styled(List)`
    min-width: 200px;
`;

const CustomFormControl = styled(FormControl)<any>`
    padding-left: 16px !important;
    padding-right: 16px !important;
    margin-top: 10px !important;
    width: 100%;
`;

const ListItemCard = styled(Paper)`
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