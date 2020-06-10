import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { ContentEditable } from "components";
import React from "react";
import styled from "styled-components";
import { Board, BoardCard } from "../../mockdata/boards";

interface BardCardProps {
    index: number;
    card: BoardCard;
    board?: Board;
    updateBoard: any;
    handleCardDragAndDrop: any;
    handleCardItemDragAndDrop: any;
    onUpdateBoards: (board: any, itemId: number, itemBelowId: number) => any;
    handleDone: (listId: number, cardId: number) => void;
    onSaveBoards: (newBoards: any) => void;
    onUpdateListItem: (
        board: any,
        listItemId: number,
        listItemBelowId: number,
        inDraggingZone?: boolean, //if there is no data in card
    ) => any;
    onClickListItem: (listId: number, cardId: number) => void;
    onPressListItem: (id: number) => void;
    handleAddTodo: (
        event: React.KeyboardEvent<HTMLInputElement>,
        setValue: any,
        value: string,
        index: number,
    ) => void;
}

const BoardCardComponent = (props: BardCardProps) => {
    const [value, setValue] = React.useState("");

    const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
        props.handleAddTodo(event, setValue, value, props.index);
    };

    return (
        <BoardCard key={props.card.id} className="boardCard" data-ref={props.card.id}>
            <CardHeader
                title={props.card.title}
                onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                    props.handleCardDragAndDrop(
                        event,
                        event.currentTarget.parentNode,
                        props.card.id,
                        props.board,
                        props.onUpdateBoards,
                        props.onSaveBoards,
                    );
                }}
            />
            <CardContent>
                <TextField
                    label="Add to list"
                    variant="outlined"
                    fullWidth
                    value={value}
                    onKeyPress={handleAddTodo}
                    onChange={handleSetValue}
                />
                {props.card.data &&
                    props.card.data.map((cardList) => (
                        <BoardListItemCard
                            key={cardList.id}
                            className="boardListItemCard"
                            data-ref={cardList.id}
                            status={cardList.status}
                            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                                props.handleCardItemDragAndDrop(
                                    event,
                                    event.currentTarget,
                                    cardList.id,
                                    props.board,
                                    props.onUpdateListItem,
                                    props.onSaveBoards,
                                    () => props.onClickListItem(cardList.id, props.card.id),
                                    () => props.onPressListItem(cardList.id),
                                );
                            }}
                        >
                            <ContentEditable
                                text={cardList.value}
                                // onChange={handleListValueChange}
                                // onBlur={handleListItemBlur}
                                // propsRef={editable}
                            />
                        </BoardListItemCard>
                    ))}
                <DraggingZone
                    className="dragging-zone"
                    data-ref={props.card.id}
                    isNew={!props.card.data.length}
                />
            </CardContent>
        </BoardCard>
    );
};

const BoardListItemCard = styled(Paper)<{ status: "active" | "done" }>`
    color: ${(props) => (props.status === "done" ? "rgba(0,0,0,0.4) !important" : "inherit")};
    cursor: pointer;
    cursor: pointer;
    margin: 6px 0;
    padding: 6px;
    position: relative;
    text-decoration: ${(props) => (props.status === "done" ? "line-through" : "inherit")};
    user-select: none;
    width: 100%;
`;

const DraggingZone = styled.div<{ isNew: boolean }>`
    // border: 1px solid grey;
    min-height: ${(props) => (props.isNew ? "30px" : "20px")};
    width: 100%;
`;

const BoardCard = styled(Card)`
    min-width: 300px;
    padding: 8px;
    width: 300px;

    &:not(.last-child) {
        margin-right: 16px;
    }
`;
export default BoardCardComponent;
