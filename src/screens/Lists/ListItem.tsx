import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import MoreVert from "@material-ui/icons/MoreVert";
import { ContentEditable } from "components";
import React from "react";
import styled from "styled-components";
import { Popover } from "../../components";
import { TodoListItem } from "../../mockdata/lists";
import { stopPropagation } from "../../utils";

interface CustomCardProps {
    todo: TodoListItem;
    className: string;
    handleDragAndDrop: (event: React.MouseEvent, currentCardId: number) => void;
    handleListItemChange: (value: string, id: number) => void;
    handleSaveListItem: (todoId: number, todoData: string) => void;
}

const ListPaper = (props: CustomCardProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [value, setValue] = React.useState("no");

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

    const handleListValueChange = (value: string) => {
        props.handleListItemChange(value, props.todo.id);
    };

    const handleDragging = (event: React.MouseEvent) => {
        props.handleDragAndDrop(event, props.todo.id);
    };

    const handleListItemBlur = (target: string) => {
        console.log("blur");

        props.handleSaveListItem(props.todo.id, target);
    };

    // TODO prevent rightclick
    // handle esc

    return (
        <>
            <ListItemCard
                status={props.todo.status}
                data-ref={props.todo.id}
                onMouseDown={handleDragging}
                className={props.className}
            >
                {/* <ContentEditable style={{padding: "10px"}} html={props.todo.value} onKeyPress={handleEsc} onBlur={()=> setCanDrag(true)} onClick={()=> setCanDrag(false)} onChange={(event: ContentEditableEvent) => {setCanDrag(false); handleValueChange(event);}} /> */}
                {/* <ContentEditable style={{padding: "10px"}} html={props.todo.value} onKeyPress={handleEsc}  onChange={(event: ContentEditableEvent) => {handleValueChange(event);}} /> */}
                {/* <div> {props.todo.value}</div> */}

                <ContentEditable
                    text={props.todo.value}
                    onChange={handleListValueChange}
                    onBlur={handleListItemBlur}
                    // onClick={() => setCanDrag(false)}
                />
                {props.todo.status === "done" && <CheckIcon />}
                <MenuIcon onClick={handleMenuClick} onMouseDown={stopPropagation} />
                <Popover anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                    <CustomList>
                        <ListItem>Created by: Me</ListItem>
                        <ListItem>Date: 2002.11.25</ListItem>
                        <Divider />
                        <ListItem button>Edit</ListItem>
                        <ListItem button>Delete</ListItem>
                        <ListItem button>Mark as done</ListItem>
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
            </ListItemCard>
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

const ListItemCard = styled(Paper)<{ status: "active" | "done" }>`
    color: ${(props) => (props.status === "done" ? "rgba(0,0,0,0.4) !important" : "inherit")};
    cursor: pointer;
    margin: 15px 0;
    position: relative;
    text-decoration: ${(props) => (props.status === "done" ? "line-through" : "inherit")};
    user-select: none;
    width: 100%;
`;

const MenuIcon = styled(MoreVert)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`;

const CheckIcon = styled(CheckCircleOutline)`
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`;

export default ListPaper;
