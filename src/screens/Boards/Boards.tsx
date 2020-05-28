import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import cloneDeep from "clone-deep";
import produce from "immer";
import React from "react";
import { useHistory } from "react-router-dom";
import server from "server";
import styled from "styled-components";
import { Board } from "../../mockdata/boards";
import Container from "@material-ui/core/Container";
import { PageSubheader } from "components";

const Boards = () => {
    const history = useHistory();
    let drag = false;

    const [boards, setBards] = React.useState<Board[]>([]);

    React.useEffect(() => {
        const boards = server.loadBoards();
        setBards(boards);
    }, []);

    const handleDragAndDrop = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
        if (event.button === 2) return;

        drag = false;
        const currentCard = event.currentTarget;

        if (!currentCard) return;

        const currentCardCopy = currentCard.cloneNode(true) as HTMLDivElement;

        const shiftX = event.pageX - currentCard.offsetLeft + 16;
        const shiftY = event.pageY - currentCard.offsetTop + 16;

        const positionX = event.pageX - shiftX;
        const positionY = event.pageY - shiftY;

        currentCard.style.visibility = "hidden";

        currentCardCopy.style.position = "absolute";
        currentCardCopy.style.left = positionX + "px";
        currentCardCopy.style.top = positionY + "px";
        currentCardCopy.style.zIndex = "100";
        currentCardCopy.style.userSelect = "none";
        currentCardCopy.style.display = "";

        // currentCardCopy.style.transform = "scale(1.05)";
        document.body.appendChild(currentCardCopy);

        let cardBelow: HTMLDivElement | null | undefined = undefined;

        let tempLists = cloneDeep(boards);

        const handleMouseMove = (event: globalThis.MouseEvent) => {
            drag = true;

            if (currentCardCopy.style.cursor !== "grabbing") {
                currentCardCopy.style.cursor = "grabbing";
            }

            currentCardCopy.style.left = event.pageX - shiftX + "px";
            currentCardCopy.style.top = event.pageY - shiftY + "px";

            currentCardCopy.hidden = true;
            cardBelow = document
                .elementFromPoint(event.clientX, event.clientY)
                ?.closest(".card") as HTMLDivElement;
            currentCardCopy.hidden = false;

            if (cardBelow && String(id) !== cardBelow?.dataset.ref) {
                const cardBelowId = Number(cardBelow.dataset.ref);

                const nextLists = produce(tempLists, (draft) => {
                    const currentCardIndex = draft.findIndex((todo) => todo.id === id);
                    const cardBelowIndex = draft.findIndex((todo) => todo.id === cardBelowId);
                    const moovingItem = draft.splice(currentCardIndex, 1);
                    draft.splice(cardBelowIndex, 0, ...moovingItem);
                });
                tempLists = nextLists;
                setBards(nextLists);
                server.saveBoards(nextLists);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);

        currentCardCopy.onmouseup = () => {
            if (!drag) {
                history.push(`board/${id}`);
            }

            document.removeEventListener("mousemove", handleMouseMove);

            currentCardCopy.style.left = positionX + "px";
            currentCardCopy.style.top = positionY + "px";

            currentCardCopy.remove();

            currentCard.style.visibility = "";

            currentCardCopy.onmouseup = null;
        };
    };

    const links = [
        {
            href: "/",
            text: "Main",
        },
    ];

    return (
        <CardsWrapper>
            <PageSubheader titleText="Boards" titleDisabled links={links} />
            <PageContent maxWidth="lg">
                <CustomAddCard>
                    <CardContent onClick={() => history.push("board/0")}>Add +</CardContent>
                </CustomAddCard>
                {boards.map((list) => {
                    return (
                        <CustomCard
                            className="card"
                            data-ref={list.id}
                            key={list.id}
                            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) =>
                                handleDragAndDrop(event, list.id)
                            }
                        >
                            <CardContent>{list.title}</CardContent>
                        </CustomCard>
                    );
                })}
            </PageContent>
        </CardsWrapper>
    );
};

const CardsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const CustomCard = styled(Card)`
    width: 250px;
    height: 150px;
    margin: 16px;
    cursor: pointer;
    box-sizing: content-box;
`;

const CustomAddCard = styled(CustomCard)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PageContent = styled(Container)`
    flex-grow: 1;
    display: flex !important;
    flex-wrap: wrap;
`;

export default Boards;
