import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import cloneDeep from "clone-deep";
import produce from "immer";
import React from "react";
import { ContentEditable } from "components";
import server from "server";
import styled from "styled-components";
import { TodoList } from "../../mockdata/lists";
import ListItem from "./ListItem";

export interface Todo {
    id: number;
    value: string;
}

interface ListProps {
    list?: TodoList;
    updateList: any;
}

const List = (props: ListProps) => {
    const [newTodo, setNewTodo] = React.useState<string>("");
    const [editableId, setEditableId] = React.useState<number>();

    const handleSetTodo = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTodo(event.target.value);
    };

    const handleAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const newList = produce(props.list, (draft) => {
                draft?.data.unshift({
                    id: draft.data.length + 100,
                    value: newTodo,
                    date: Date.now(),
                    updateDate: Date.now(),
                });
            });

            props.updateList(newList);
            setNewTodo("");
        }
    };

    const handleTitleChange = (value: string) => {
        props.updateList({ ...props.list, title: value });
    };

    const handleTitleBlur = (value: string) => {
        const newList = { ...props.list, title: value } as TodoList;

        // props.updateList(newList);
        server.saveList(newList);
    };

    const handleSaveListItem = (todoId: number, todoValue: string) => {
        if (props.list) {
            const newList = {
                ...props.list,
                data: props.list.data.map((todo) => {
                    if (todo.id === todoId) {
                        return {
                            ...todo,
                            updateDate: Date.now(),
                            value: todoValue,
                        };
                    } else {
                        return todo;
                    }
                }),
            } as TodoList;

            // props.updateList(newList);
            server.saveList(newList);
        }
    };

    const handleListItemChange = (value: string, id: number) => {
        if (props.list) {
            const nextTodos = produce(props.list.data, (draft) => {
                const index = draft.findIndex((todo) => todo.id === id);
                if (typeof index !== undefined) {
                    draft[index].value = value;
                }
            });
            const newList = { ...props.list, data: nextTodos };
            props.updateList(newList);
        }
    };

    let drag = false;

    const handleDragAndDrop = (event: React.MouseEvent, id: number) => {
        if (event.button === 2) return;
        if (!props.list) return;

        setTimeout(() => {
            setEditableId(undefined);
        }, 400);

        drag = false;
        const currentCard = event.currentTarget as HTMLDivElement;

        if (!currentCard) return;

        const currentCardCopy = currentCard.cloneNode(true) as HTMLDivElement;

        const shiftX = event.clientX - currentCard.getBoundingClientRect().left;
        const shiftY = event.clientY - currentCard.getBoundingClientRect().top + 15; // margins TODO remove

        const positionX = event.pageX - shiftX;
        const positionY = event.pageY - shiftY;

        currentCard.style.visibility = "hidden";

        currentCardCopy.style.position = "absolute";
        currentCardCopy.style.left = positionX + "px";
        currentCardCopy.style.top = positionY + "px";
        currentCardCopy.style.zIndex = "100";
        currentCardCopy.style.userSelect = "none";

        // currentCardCopy.style.transform = "scale(1.015)";
        currentCardCopy.style.width = currentCard.offsetWidth + "px";

        document.body.append(currentCardCopy);

        // set temp vars
        let tempTodos = cloneDeep(props.list.data);

        let cardBelow: HTMLDivElement | null | undefined = undefined;
        let newList: TodoList;
        // const throttledTodoAction = throttle((data: Todo[])=> setTodos(data), 100);
        const onMouseMove = (event: MouseEvent) => {
            drag = true;

            if (currentCardCopy.style.cursor !== "grabbing") {
                currentCardCopy.style.cursor = "grabbing";
            }

            currentCardCopy.style.left = event.clientX - shiftX + "px";
            currentCardCopy.style.top = event.clientY - shiftY + "px";

            currentCardCopy.hidden = true;
            cardBelow = document.elementFromPoint(event.clientX, event.clientY)?.closest(".card") as HTMLDivElement;
            currentCardCopy.hidden = false;

            if (cardBelow && String(id) !== cardBelow?.dataset.ref) {
                const cardBelowId = Number(cardBelow?.dataset.ref);

                const nextTodos = produce(tempTodos, (draft) => {
                    const currentCardIndex = draft.findIndex((todo) => todo.id === id);
                    const cardBelowIndex = draft.findIndex((todo) => todo.id === cardBelowId);

                    [draft[currentCardIndex], draft[cardBelowIndex]] = [draft[cardBelowIndex], draft[currentCardIndex]];
                });

                tempTodos = nextTodos;

                if (props.list) {
                    newList = { ...props.list, data: nextTodos };
                    props.updateList(newList);
                }
            }
        };

        document.addEventListener("mousemove", onMouseMove);

        currentCardCopy.onmouseup = () => {
            if (!drag) {
                setEditableId(id);
            }

            document.removeEventListener("mousemove", onMouseMove);

            currentCardCopy.style.left = positionX + "px";
            currentCardCopy.style.top = positionY + "px";

            currentCardCopy.remove();

            currentCard.style.visibility = "";

            currentCard.onmouseup = null;

            if (newList) {
                server.saveList(newList);
            }
        };
    };

    return (
        <ListsWrapper>
            <PageSubHeader maxWidth="xl">
                <Grid item xs={12}>
                    <Box>
                        {props.list && (
                            <Title>
                                <ContentEditable
                                    text={props.list?.title ?? "New title"}
                                    onChange={handleTitleChange}
                                    onBlur={handleTitleBlur}
                                />
                            </Title>
                        )}
                    </Box>
                </Grid>
            </PageSubHeader>

            <PageContent maxWidth="xl">
                <CustomCard>
                    <CustomCardContent>
                        <Box mb={2}>
                            <TextField
                                label="Add to list"
                                variant="outlined"
                                fullWidth
                                value={newTodo}
                                onKeyPress={handleAddTodo}
                                onChange={handleSetTodo}
                            />
                        </Box>
                        <ScrollingCardContent>
                            {props.list &&
                                props.list.data.map((todo) => (
                                    <ListItem
                                        key={todo.id}
                                        editableId={editableId}
                                        todo={todo}
                                        className="card"
                                        handleDragAndDrop={handleDragAndDrop}
                                        handleListItemChange={handleListItemChange}
                                        handleSaveListItem={handleSaveListItem}
                                    />
                                ))}
                        </ScrollingCardContent>
                    </CustomCardContent>
                </CustomCard>
            </PageContent>
        </ListsWrapper>
    );
};

const ScrollingCardContent = styled(CardContent)`
    flex-grow: 1;
    overflow-y: auto;
`;

const CustomCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
`;

const CustomCard = styled(Card)`
    margin-top: 8px;
    overflow: hidden;
    height: 100%;
`;

const Title = styled(Button)`
    display: inline-block;
    width: auto;
    padding: 5px 10px;
    text-transform: none !important;
    font-size: 1.25rem !important;
    white-space: none;

    .MuiTouchRipple-root {
        display: none;
    }
`;

const ListsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const PageSubHeader = styled(Container)`
    background-color: #eee;
    z-index: 100;
`;

const PageContent = styled(Container)`
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    margin-bottom: 8px;
`;

export default List;
