import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import cloneDeep from "clone-deep";
import { PageSubheader } from "components";
import produce from "immer";
import React from "react";
import server from "server";
import styled from "styled-components";
import { TodoList } from "../../mockdata/lists";
import ListItem from "./ListItem";

interface ListProps {
    list?: TodoList;
    updateList: any;
}

const List = (props: ListProps) => {
    const [newTodo, setNewTodo] = React.useState<string>("");
    const [editableId, setEditableId] = React.useState<number>();

    const isDone = React.useMemo(() => {
        if (!props.list) return false;
        if (!props.list.data.length) return false;

        for (const todo of props.list.data) {
            if (todo.status === "active") {
                return false;
            }
        }
        return true;
    }, [props.list]);

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
                    status: "active",
                });
            });

            props.updateList(newList);

            if (newList) {
                server.saveList(newList);
            }
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

    const handleDeleteListItem = (todoId: number) => {
        const newList = produce(props.list, (draft) => ({
            ...draft,
            data: draft?.data.filter((todo) => todo.id !== todoId),
        }));

        props.updateList(newList);
        if (props.list) {
            server.deleteList(props.list.id, todoId);
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

    const handleDone = (todoId: number) => {
        if (props.list) {
            const nextTodos = produce(props.list, (draft) => {
                const data = draft.data;
                const currentCardIndex = data.findIndex((todo) => todo.id === todoId);
                data[currentCardIndex].status =
                    data[currentCardIndex].status === "active" ? "done" : "active";
            });

            // TODO wrong actions by click away todolist
            // TODO selection of list
            props.updateList(nextTodos);
            server.saveList(nextTodos);
        }
    };

    let drag = false;
    let editTimer: number;

    const handleDragAndDrop = (event: React.MouseEvent, id: number) => {
        if (event.button === 2) return;
        if (!props.list) return;

        drag = false;
        const currentCard = event.currentTarget as HTMLDivElement;

        if (!currentCard) return;

        const currentCardCopy = currentCard.cloneNode(true) as HTMLDivElement;

        const shiftX = event.clientX - currentCard.getBoundingClientRect().left;
        const shiftY = event.clientY - currentCard.getBoundingClientRect().top + 15; // margins TODO remove

        const positionX = event.pageX - shiftX;
        const positionY = event.pageY - shiftY;

        currentCard.style.border = "1px solid grey";
        const currentCardContent = currentCard.children[0] as HTMLDivElement;
        console.log(currentCardContent);

        currentCardContent.style.visibility = "hidden";

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
            if (editTimer) {
                clearInterval(editTimer);
            }
            drag = true;

            if (currentCardCopy.style.cursor !== "grabbing") {
                currentCardCopy.style.cursor = "grabbing";
            }

            currentCardCopy.style.left = event.clientX - shiftX + "px";
            currentCardCopy.style.top = event.clientY - shiftY + "px";

            currentCardCopy.hidden = true;
            cardBelow = document
                .elementFromPoint(event.clientX, event.clientY)
                ?.closest(".card") as HTMLDivElement;
            currentCardCopy.hidden = false;

            if (cardBelow && String(id) !== cardBelow?.dataset.ref) {
                const cardBelowId = Number(cardBelow?.dataset.ref);

                const nextTodos = produce(tempTodos, (draft) => {
                    const currentCardIndex = draft.findIndex((todo) => todo.id === id);
                    const cardBelowIndex = draft.findIndex((todo) => todo.id === cardBelowId);
                    const moovingItem = draft.splice(currentCardIndex, 1);
                    draft.splice(cardBelowIndex, 0, ...moovingItem);
                });

                tempTodos = nextTodos;

                if (props.list) {
                    newList = { ...props.list, data: nextTodos };
                    props.updateList(newList);
                }
            }
        };

        //TODO add statuses to commot types
        editTimer = setTimeout(() => {
            setEditableId(id);

            currentCardCopy.remove();

            currentCardContent.style.visibility = "";
            currentCard.style.border = "";
            currentCard.onmouseup = null;
            document.removeEventListener("mousemove", onMouseMove);
        }, 300);

        setTimeout(() => {
            setEditableId(undefined);
        }, 400);

        document.addEventListener("mousemove", onMouseMove);

        currentCardCopy.onmouseup = () => {
            if (editTimer) {
                clearInterval(editTimer);
            }
            // mouse click
            if (!drag) {
                handleDone(id);
            }

            document.removeEventListener("mousemove", onMouseMove);

            currentCardCopy.style.left = positionX + "px";
            currentCardCopy.style.top = positionY + "px";

            currentCardCopy.remove();

            currentCardContent.style.visibility = "";
            currentCard.style.border = "";

            currentCard.onmouseup = null;

            if (newList) {
                server.saveList(newList);
            }
        };
    };

    const links = [
        {
            href: "/",
            text: "Main",
        },
        {
            href: "/lists",
            text: "Lists",
        },
    ];

    return (
        <ListsWrapper>
            <PageSubheader
                links={links}
                titleText={props.list?.title}
                isDoneListItem={isDone}
                onTitleBlur={handleTitleBlur}
                onTileChange={handleTitleChange}
                titleDisabled={isDone}
            />

            <PageContent maxWidth="lg">
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
                                        todo={todo}
                                        className="card"
                                        editableId={editableId}
                                        handleDragAndDrop={handleDragAndDrop}
                                        handleListItemChange={handleListItemChange}
                                        handleSaveListItem={handleSaveListItem}
                                        handleDeleteListItem={handleDeleteListItem}
                                        handleDone={handleDone}
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

const ListsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const PageContent = styled(Container)`
    position: relative;
    flex-grow: 1;
    overflow: hidden;
`;

export default List;
