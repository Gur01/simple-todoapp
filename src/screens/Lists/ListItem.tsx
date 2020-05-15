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
import { Popover } from "../../components";
import { Todo } from "./List";
import { stopPropagation } from "../../utils";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface CustomCardProps {
    todo: Todo;
    className: string;
    editableId?: number;
    handleDragAndDrop: (event: React.MouseEvent, currentCardId: number) => void;
    handleListItemChange: (value: string, id: number) => void;
}

const ListPaper = (props: CustomCardProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [value, setValue] = React.useState("no");
    const [canDrag, setCanDrag] = React.useState(true);

    const handleSelectPriority = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleMenuClick = (event: React.MouseEvent<any>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleValueChange = (event: ContentEditableEvent) => {
        props.handleListItemChange(event.target.value, props.todo.id);
    };

    const handleDragging = (event: React.MouseEvent) => {
        if (props.editableId !== props.todo.id && canDrag) {
            props.handleDragAndDrop(event, props.todo.id);
        }
    };

    // TODO prevent rightclick
    // handle esc

    return (
        <>
            <ListItemCard data-ref={props.todo.id} onMouseDown={handleDragging} className={props.className}>
                {/* <ContentEditable style={{padding: "10px"}} html={props.todo.value} onKeyPress={handleEsc} onBlur={()=> setCanDrag(true)} onClick={()=> setCanDrag(false)} onChange={(event: ContentEditableEvent) => {setCanDrag(false); handleValueChange(event);}} /> */}
                {/* <ContentEditable style={{padding: "10px"}} html={props.todo.value} onKeyPress={handleEsc}  onChange={(event: ContentEditableEvent) => {handleValueChange(event);}} /> */}
                {/* <div> {props.todo.value}</div> */}
                <ContentEditable
                    style={{ padding: "10px" }}
                    onClick={() => setCanDrag(false)}
                    onBlur={() => setCanDrag(true)}
                    html={props.todo.value}
                    onChange={handleValueChange}
                />
                <MenuIcon onClick={handleMenuClick} onMouseDown={stopPropagation} />
            </ListItemCard>
            <Popover anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <CustomList>
                    <ListItem>Created by: Me</ListItem>
                    <ListItem>Date: 2002.11.25</ListItem>
                    <Divider />
                    <ListItem button>Edit</ListItem>
                    <ListItem button>Delete</ListItem>
                    <Divider />
                    <CustomFormControl component="fieldset">
                        {/* <FormLabel>Priority</FormLabel> */}

                        <RadioGroup value={value} onChange={handleSelectPriority}>
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                            <FormControlLabel value="important" control={<Radio />} label="Important" />
                            <FormControlLabel value="urgent" control={<Radio />} label="Urgent" />
                        </RadioGroup>
                    </CustomFormControl>
                </CustomList>
            </Popover>
        </>
    );
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
    padding: 8px 50px 8px 24px;
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
