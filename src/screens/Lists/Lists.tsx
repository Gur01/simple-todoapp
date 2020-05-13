import React, { MouseEvent } from "react";
import lists from "../../mockdata/lists";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const List = () => {
    const history = useHistory();
    let drag= false;

    const handleDragAndDrop = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
        drag = false;
        const currentCard = event.currentTarget;
        event.persist();

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
        currentCardCopy.style.top = positionY + "px";
        currentCardCopy.style.userSelect = "none";
        // currentCardCopy.style.transform = "scale(1.05)";
    
        document.body.appendChild(currentCardCopy);
    
        const handleMouseMove = (event: any) => {
            drag = true;
            currentCardCopy.style.left = event.pageX - shiftX + "px";
            currentCardCopy.style.top = event.pageY - shiftY + "px";
    
        };
    
        document.addEventListener("mousemove", handleMouseMove);
            
        currentCardCopy.onmouseup = () => {

            if(!drag) {
                history.push(`list/${id}`);
                // return;
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
            {lists.map((list, index)=> {
                return (
                    <CustomCard key={index} onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => handleDragAndDrop(event, list.id)}>
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
    display: inline-block;
    margin: 24px;
    padding: 100px;
    cursor: pointer;
    box-sizing: content-box;
`;

export default List;