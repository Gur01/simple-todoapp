import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { PageSubheader } from "components";
import produce from "immer";
import React from "react";
import server from "server";
import styled from "styled-components";
import { dragAndDrop } from "utils";
import { Board } from "../../mockdata/boards";
import { ContentEditable } from "components";

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

const Boards = (props: BoardProps) => {
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

    const onUpdateListItem = (board: any, listItemId: number, listItemBelowId: number) => {
        const [currentItemIndex, currentCardIndex] = getCurrentParams();
        const [targetItemIndex, targetCardIndex] = getTargetParams();

        const nextCards = produce(board.data, (draft: any) => {
            const moovingItem = draft[currentCardIndex].data.splice(currentItemIndex, 1);
            draft[targetCardIndex].data.splice(targetItemIndex, 0, ...moovingItem);
        });

        const newBoard = { ...board, data: nextCards };

        props.updateBoard(newBoard);

        if (currentCardIndex !== targetCardIndex) {
            const card = document.querySelector(`[data-ref='${listItemId}']`) as HTMLDivElement;
            card.style.visibility = "hidden";

            // if (!newBoard.data[targetCardIndex].data.length) {
            //     console.log("empty");
            // } add dragging zone at the bottom
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

                const targetCardIndex = board.data.findIndex((c: any) => c.id === card.id);
                return [targetItemIndex, targetCardIndex];
            }
        }
    };

    const onClickListItem = (listId: number, cardId: number) => {
        handleDone(listId, cardId);
    };

    const onPressListItem = (id: number) => {
        console.log(id, "press");
    };

    const handleCardDragAndDrop = dragAndDrop("boardCard");

    const handleCardItemDragAndDrop = dragAndDrop("boardListItemCard", "press");

    return (
        <BoardsWrapper>
            <PageSubheader links={links} titleText={props.board?.title} titleDisabled={true} />
            <PageContent>
                <>
                    {props.board &&
                        props.board.data.map((card) => (
                            <BoardCard key={card.id} className="boardCard" data-ref={card.id}>
                                <CardHeader
                                    title={card.title}
                                    onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                                        handleCardDragAndDrop(
                                            event,
                                            event.currentTarget.parentNode,
                                            card.id,
                                            props.board,
                                            onUpdateBoards,
                                            onSaveBoards,
                                        );
                                    }}
                                />
                                <CardContent>
                                    {card.data &&
                                        card.data.map((cardList) => (
                                            <BoardListItemCard
                                                key={cardList.id}
                                                className="boardListItemCard"
                                                data-ref={cardList.id}
                                                status={cardList.status}
                                                onMouseDown={(
                                                    event: React.MouseEvent<HTMLDivElement>,
                                                ) => {
                                                    handleCardItemDragAndDrop(
                                                        event,
                                                        event.currentTarget,
                                                        cardList.id,
                                                        props.board,
                                                        (
                                                            board: any,
                                                            itemId: number,
                                                            itemBelowId: number,
                                                        ) =>
                                                            onUpdateListItem(
                                                                board,
                                                                itemId,
                                                                itemBelowId,
                                                            ),
                                                        onSaveBoards,
                                                        () => onClickListItem(cardList.id, card.id),
                                                        () => onPressListItem(cardList.id),
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
                                    <DraggingZone className="dragging-zone" data-ref={card.id} />
                                </CardContent>
                            </BoardCard>
                        ))}
                </>
            </PageContent>
        </BoardsWrapper>
    );
};

const DraggingZone = styled.div`
    min-height: 30px;
    width: 100%;
    border: 1px solid grey;
`;

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

const BoardCard = styled(Card)`
    width: 300px;
    min-width: 300px;
    padding: 8px;
    &:not(.last-child) {
        margin-right: 16px;
    }
`;

export default Boards;
