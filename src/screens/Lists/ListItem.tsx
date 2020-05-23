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
    editableId?: number;
    handleDragAndDrop: (event: React.MouseEvent, currentCardId: number) => void;
    handleListItemChange: (value: string, id: number) => void;
    handleSaveListItem: (todoId: number, todoData: string) => void;
    handleDeleteListItem: (todoId: number) => void;
    handleDone: (todoId: number) => void;
}

const ListPaper = (props: CustomCardProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [value, setValue] = React.useState("no");
    const [editing, setEditing] = React.useState(false);

    const editable = React.useRef(null);

    const focusEditable = () => {
        (editable.current as any)?.focus();
    };

    React.useEffect(() => {
        if (props.editableId === props.todo.id && props.todo.status === "active") {
            (editable.current as any)?.focus();
            setEditing(true);
        }
    }, [props.editableId]);

    const handleSelectPriority = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleMenuClick = (event: React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
        setAnchorEl(event.currentTarget as HTMLDivElement);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleListValueChange = (value: string) => {
        props.handleListItemChange(value, props.todo.id);
    };

    const handleDragging = (event: React.MouseEvent) => {
        if (event.button === 2) {
            event.preventDefault();
            return;
        }
        if (editing) return;
        props.handleDragAndDrop(event, props.todo.id);
    };

    const handleListItemBlur = (target: string) => {
        setEditing(false);
        props.handleSaveListItem(props.todo.id, target);
    };

    const handleEditListItem = () => {
        handleCloseMenu();
        setEditing(true);
        focusEditable();
    };

    const handleDoneListItem = (todoId: number) => {
        handleCloseMenu();
        props.handleDone(todoId);
    };

    return (
        <>
            {/* <MenuIcon onClick={handleMenuClick} onMouseDown={stopPropagation} /> */}
            <ListItemCard
                status={props.todo.status}
                data-ref={props.todo.id}
                onMouseDown={handleDragging}
                className={props.className}
            >
                <div>
                    {/* <ContentEditable style={{padding: "10px"}} html={props.todo.value} onKeyPress={handleEsc} onBlur={()=> setCanDrag(true)} onClick={()=> setCanDrag(false)} onChange={(event: ContentEditableEvent) => {setCanDrag(false); handleValueChange(event);}} /> */}
                    {/* <ContentEditable style={{padding: "10px"}} html={props.todo.value} onKeyPress={handleEsc}  onChange={(event: ContentEditableEvent) => {handleValueChange(event);}} /> */}
                    {/* <div> {props.todo.value}</div> */}

                    <ContentEditable
                        text={props.todo.value}
                        onChange={handleListValueChange}
                        onBlur={handleListItemBlur}
                        propsRef={editable}
                        // onClick={() => setCanDrag(false)}
                    />
                    {/* {props.todo.status === "done" && <CheckIcon />} */}
                    <MenuIcon onClick={handleMenuClick} onMouseDown={stopPropagation} />
                </div>
            </ListItemCard>
            <Popover anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} disableEnforceFocus>
                <CustomList>
                    <ListItem>Created by: Me</ListItem>
                    <ListItem>Date: {props.todo.date}</ListItem>
                    <Divider />
                    <ListItem button onClick={handleEditListItem}>
                        Edit
                    </ListItem>
                    <ListItem button onClick={() => props.handleDeleteListItem(props.todo.id)}>
                        Delete
                    </ListItem>
                    <ListItem button onClick={() => handleDoneListItem(props.todo.id)}>
                        {props.todo.status === "done" ? "Mark as active" : "Mark as done"}
                    </ListItem>
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
