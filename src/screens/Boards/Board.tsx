import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { PageSubheader } from "components";
import produce from "immer";
import React from "react";
import server from "server";
import styled from "styled-components";
import { dragAndDrop } from "utils";
import { Board } from "../../mockdata/boards";
import BoardCard from "./BoardCard";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

const links = [
    {
        href: "/",
        text: "Main",
    },
    {
        href: "/boards",
        text: "Boards",
    },
];

interface BoardProps {
    board?: Board;
    updateBoard: any;
}

const handleCardDragAndDrop = dragAndDrop("boardCard");
const handleCardItemDragAndDrop = dragAndDrop("boardListItemCard", "press");

const Boards = (props: BoardProps) => {
    console.log(props.board, "dsfsdfdf");

    const onUpdateBoards = (board: any, itemId: number, itemBelowId: number): any => {
        const nextBoards = produce(board.data, (draft: any) => {
            const currentCardIndex = draft.findIndex((board: any) => board.id === itemId);
            const cardBelowIndex = draft.findIndex((board: any) => board.id === itemBelowId);
            const moovingItem = draft.splice(currentCardIndex, 1);
            draft.splice(cardBelowIndex, 0, ...moovingItem);
        });

        //must be ...props.boards or title will lost
        const newBoard = { ...props.board, data: nextBoards };
        props.updateBoard(newBoard);
        return newBoard;
    };

    const handleDone = (listId: number, cardId: number) => {
        if (props.board) {
            const nextTodos = produce(props.board, (draft) => {
                console.log(props.board);

                const currentCardIndex = draft.data.findIndex((card) => card.id === cardId);

                const currentListIndex = draft.data[currentCardIndex].data.findIndex(
                    (list) => list.id === listId,
                );

                draft.data[currentCardIndex].data[currentListIndex].status =
                    draft.data[currentCardIndex].data[currentListIndex].status === "active"
                        ? "done"
                        : "active";
            });

            props.updateBoard(nextTodos);
            server.saveBoard(nextTodos);
        }
    };

    const onSaveBoards = (newBoards: any) => {
        server.saveBoard(newBoards as any);
    };

    const onUpdateListItem = (
        board: any,
        listItemId: number,
        listItemBelowId: number,
        inDraggingZone?: boolean, //if there is no data in card
    ) => {
        const [currentItemIndex, currentCardIndex] = getCurrentParams();
        const [targetItemIndex, targetCardIndex] = inDraggingZone
            ? getNewTargetParams()
            : getTargetParams();

        const nextCards = produce(board.data, (draft: any) => {
            const moovingItem = draft[currentCardIndex].data.splice(currentItemIndex, 1);

            console.log("produce");

            draft[targetCardIndex].data.splice(
                inDraggingZone ? draft[currentCardIndex].data.length : targetItemIndex,
                0,
                ...moovingItem,
            );
        });

        const newBoard = { ...board, data: nextCards };

        props.updateBoard(newBoard);

        if (currentCardIndex !== targetCardIndex) {
            const card = document.querySelector(`[data-ref='${listItemId}']`) as HTMLDivElement;
            card.style.visibility = "hidden";
        }

        return newBoard;

        function getCurrentParams() {
            for (const card of board.data) {
                const currentItemIndex = card.data.findIndex((item: any) => item.id === listItemId);

                if (currentItemIndex === -1) continue;

                const currentCardIndex = board.data.findIndex(
                    (boardCard: any) => boardCard.id === card.id,
                );
                return [currentItemIndex, currentCardIndex];
            }
        }

        function getTargetParams() {
            for (const card of board.data) {
                const targetItemIndex = card.data.findIndex(
                    (item: any) => item.id === listItemBelowId,
                );

                if (targetItemIndex === -1) continue;

                const targetCardIndex = board.data.findIndex(
                    (boardCard: any) => boardCard.id === card.id,
                );
                return [targetItemIndex, targetCardIndex];
            }
        }

        function getNewTargetParams() {
            const targetCardIndex = board.data.findIndex(
                (boardCard: any) => boardCard.id === listItemBelowId, // listItemBelowId === card.id
            );
            return [undefined, targetCardIndex];
        }
    };

    const onClickListItem = (listId: number, cardId: number) => {
        handleDone(listId, cardId);
    };

    const onPressListItem = (id: number) => {
        console.log(id, "press");
    };

    const handleAddTodo = (
        event: React.KeyboardEvent<HTMLInputElement>,
        setValue: any,
        value: string,
        index: number,
    ) => {
        if (!value) return;
        if (event.key === "Enter") {
            const newBoards = produce(props.board, (draft) => {
                if (draft) {
                    const card = draft.data[index].data;
                    card.unshift({
                        id: card.length + 100,
                        value: value,
                        date: Date.now(),
                        updateDate: Date.now(),
                        status: "active",
                    });
                }
            });
            props.updateBoard(newBoards);

            if (newBoards) {
                server.saveBoard(newBoards);
            }
            setValue("");
        }
    };

    const handleAddCard = () => {
        const newBoard = server.addBoardCard(props.board?.id);
        console.log(newBoard);

        props.updateBoard({ ...newBoard });
    };

    return (
        <BoardsWrapper>
            <PageSubheader links={links} titleText={props.board?.title} titleDisabled={true} />
            <PageContent>
                <>
                    {props.board &&
                        props.board.data.map((card, index) => (
                            <BoardCard
                                index={index}
                                card={card}
                                board={props.board}
                                updateBoard={props.updateBoard}
                                key={card.id}
                                handleCardDragAndDrop={handleCardDragAndDrop}
                                handleCardItemDragAndDrop={handleCardItemDragAndDrop}
                                onUpdateBoards={onUpdateBoards}
                                handleDone={handleDone}
                                onSaveBoards={onSaveBoards}
                                onUpdateListItem={onUpdateListItem}
                                onClickListItem={onClickListItem}
                                onPressListItem={onPressListItem}
                                handleAddTodo={handleAddTodo}
                            />
                        ))}
                    <Button variant="outlined" onClick={handleAddCard}>
                        Add card +
                    </Button>
                </>
            </PageContent>
        </BoardsWrapper>
    );
};

const BoardsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const PageContent = styled(Container)`
    flex-grow: 1;
    display: flex !important;
    flex-wrap: nowrap;
    height: 100%;
    align-items: flex-start;
`;

const BoardAddCard = styled(Card)`
    min-width: 300px;
    padding: 8px;
    width: 300px;

    &:not(.last-child) {
        margin-right: 16px;
    }
`;

export default Boards;
