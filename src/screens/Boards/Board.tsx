import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { PageSubheader } from "components";
import { Board } from "../../mockdata/boards";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import cloneDeep from "clone-deep";
import produce from "immer";

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
    let drag = true; //!!!
    let editTimer: number; //!!!

    const handleDragAndDrop = (event: React.MouseEvent, id: number) => {
        if (event.button === 2) return;
        if (!props.board) return; //!!!!

        drag = false;
        const currentCard = event.currentTarget.parentNode as HTMLDivElement; //!!!!

        if (!currentCard) return;

        const currentCardCopy = currentCard.cloneNode(true) as HTMLDivElement;

        const shiftX = event.clientX - currentCard.getBoundingClientRect().left;
        const shiftY = event.clientY - currentCard.getBoundingClientRect().top + 15; // margins TODO remove

        const positionX = event.pageX - shiftX;
        const positionY = event.pageY - shiftY;

        currentCard.style.border = "1px solid grey";
        const currentCardContent = currentCard as HTMLDivElement; // !!!!

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
        let tempBoards = cloneDeep(props.board.data); //!!!!

        let cardBelow: HTMLDivElement | null | undefined = undefined;
        let newBoard: Board; //!!!
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
                ?.closest(".boardCard") as HTMLDivElement;
            currentCardCopy.hidden = false;

            if (cardBelow && String(id) !== cardBelow?.dataset.ref) {
                const cardBelowId = Number(cardBelow?.dataset.ref);

                const nextBoards = produce(tempBoards, (draft) => {
                    const currentCardIndex = draft.findIndex((todo) => todo.id === id);
                    const cardBelowIndex = draft.findIndex((todo) => todo.id === cardBelowId);
                    const moovingItem = draft.splice(currentCardIndex, 1);
                    draft.splice(cardBelowIndex, 0, ...moovingItem);
                });

                tempBoards = nextBoards;

                if (props.board) {
                    newBoard = { ...props.board, data: nextBoards };
                    props.updateBoard(newBoard);
                }
            }
        };

        document.addEventListener("mousemove", onMouseMove);

        currentCardCopy.onmouseup = () => {
            // mouse click
            if (!drag) {
                // handleDone(id);
            }

            document.removeEventListener("mousemove", onMouseMove);

            currentCardCopy.style.left = positionX + "px";
            currentCardCopy.style.top = positionY + "px";

            currentCardCopy.remove();

            currentCardContent.style.visibility = "";
            currentCard.style.border = "";

            currentCard.onmouseup = null;

            if (newBoard) {
                // server.save(newBoard);
            }
        };
    };

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
                                    onMouseDown={(event: React.MouseEvent) =>
                                        handleDragAndDrop(event, card.id)
                                    }
                                />
                                <CardContent>
                                    {card.data &&
                                        card.data.map((cardList) => (
                                            <BoardListItemCard
                                                key={cardList.id}
                                                className="boardListItemCard"
                                            >
                                                {cardList.value}
                                            </BoardListItemCard>
                                        ))}
                                </CardContent>
                            </BoardCard>
                        ))}
                </>
            </PageContent>
        </BoardsWrapper>
    );
};

const BoardListItemCard = styled(Paper)`
    cursor: pointer;
    margin: 6px 0;
    position: relative;
    user-select: none;
    width: 100%;
    padding: 6px;
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
