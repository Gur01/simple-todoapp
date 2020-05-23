import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import cloneDeep from "clone-deep";
import produce from "immer";
import React from "react";
import { useHistory } from "react-router-dom";
import server from "server";
import styled from "styled-components";
import { TodoList } from "../../mockdata/lists";
import CardActions from "@material-ui/core/CardActions";

const List = () => {
    const history = useHistory();
    let drag = false;

    const [lists, setLists] = React.useState<TodoList[]>([]);

    React.useEffect(() => {
        const lists = server.loadLists();
        setLists(lists);
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

        let tempLists = cloneDeep(lists);

        const handleMouseMove = (event: globalThis.MouseEvent) => {
            drag = true;

            if (currentCardCopy.style.cursor !== "grabbing") {
                currentCardCopy.style.cursor = "grabbing";
            }

            currentCardCopy.style.left = event.pageX - shiftX + "px";
            currentCardCopy.style.top = event.pageY - shiftY + "px";

            currentCardCopy.hidden = true;
            cardBelow = document.elementFromPoint(event.clientX, event.clientY)?.closest(".card") as HTMLDivElement;
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
                setLists(nextLists);
                server.saveLists(nextLists);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);

        currentCardCopy.onmouseup = () => {
            if (!drag) {
                history.push(`list/${id}`);
            }

            document.removeEventListener("mousemove", handleMouseMove);

            currentCardCopy.style.left = positionX + "px";
            currentCardCopy.style.top = positionY + "px";

            currentCardCopy.remove();

            currentCard.style.visibility = "";

            currentCardCopy.onmouseup = null;
        };
    };

    return (
        <CardsWrapper>
            <CustomAddCard>
                <CardContent>Add +</CardContent>
            </CustomAddCard>
            {lists.map((list) => {
                return (
                    <CustomCard
                        style={{ display: "inline-block" }}
                        className="card"
                        data-ref={list.id}
                        key={list.id}
                        onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => handleDragAndDrop(event, list.id)}
                    >
                        <CardContent>{list.title}</CardContent>
                        <CardActions>hello</CardActions>
                    </CustomCard>
                );
            })}
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

export default List;
