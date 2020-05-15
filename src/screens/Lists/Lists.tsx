import React, { MouseEvent } from "react";
import mockLists, {TodoList} from "../../mockdata/lists";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import produce from "immer";
import cloneDeep from "clone-deep";

const List = () => {
    const history = useHistory();
    let drag= false;

    const [lists, setLists] = React.useState<TodoList[]>([]);

    React.useEffect(()=> {
        setLists(mockLists);
    }, []);

    const handleDragAndDrop = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
        if(event.button === 2) return;

        drag = false;
        const currentCard = event.currentTarget;
        
        if(!currentCard) return;
     
        const currentCardCopy = currentCard.cloneNode(true) as HTMLDivElement;
    
        const shiftX = event.pageX - currentCard.offsetLeft + 24;
        const shiftY = event.pageY - currentCard.offsetTop + 24;
    
        const positionX = event.pageX  - shiftX;
        const positionY = event.pageY  - shiftY;
    
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
            
            if(currentCardCopy.style.cursor !== "grabbing") {
                currentCardCopy.style.cursor = "grabbing";
            }

            currentCardCopy.style.left = event.pageX - shiftX + "px";
            currentCardCopy.style.top = event.pageY - shiftY + "px";
            
            currentCardCopy.hidden = true;
            cardBelow = document.elementFromPoint(event.clientX, event.clientY)?.closest(".card") as HTMLDivElement;
            currentCardCopy.hidden = false;

            if(cardBelow && String(id) !== cardBelow?.dataset.ref) {               
                const cardBelowId = Number(cardBelow.dataset.ref);

                const nextLists = produce(tempLists, draft => {

                    const currentCardIndex = draft.findIndex(todo => todo.id === id);
                    const cardBelowIndex = draft.findIndex(todo => todo.id === cardBelowId);
                    
                    [draft[currentCardIndex], draft[cardBelowIndex]] = [draft[cardBelowIndex], draft[currentCardIndex]];
                });
                tempLists = nextLists;
                setLists(nextLists);               
            }  

    
        };
    
        document.addEventListener("mousemove", handleMouseMove);
            
        currentCardCopy.onmouseup = () => {
            if(!drag) {
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
        <>
            {lists.map(list=> {
                return (
                    <CustomCard style={{display: "inline-block"}} className="card" data-ref={list.id} key={list.id} onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => handleDragAndDrop(event, list.id)}>
                        <CardContent>
                            {list.title}
                        </CardContent>
                    </CustomCard>);
            })}
        </>
    ); 
};

const CustomCard = styled(Card)`
    max-width: 300px;
    // display: inline-block;
    margin: 24px;
    padding: 100px;
    cursor: pointer;
    box-sizing: content-box;
`;

export default List;