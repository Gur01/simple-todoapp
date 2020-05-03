import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import cloneDeep from "clone-deep";
import produce from "immer";
import React from "react";
import styled from "styled-components";

interface Todo {id: number; value: string}

const Lists = () => {
    const [title, setTitle] = React.useState("Title");
    const [value, setValue] = React.useState<string>("");
    const [todos, setTodos] = React.useState<Todo[]>(
        [{id: 0, value: "0"}, {id: 1, value: "1"}, {id: 2, value: "2"},
            {id: 3, value: "3"}, {id: 4, value: "4"}, {id:5, value: "5"},
            {id: 6, value: "6"}, {id: 7, value: "7"}, {id:8, value: "8"},
            {id: 9, value: "9"}, {id: 10, value: "10"}, {id:11, value: "11"},
            {id: 12, value: "12"}, {id: 13, value: "13"}, {id:14, value: "14"},
        ]); 
    
    const handleInput = (event: React.ChangeEvent  <HTMLInputElement | HTMLTextAreaElement>)=> {
        setValue(event.target.value);
    };
    
    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){
            setTodos(todos => [...todos, {id: todos.length, value}]);
            setValue("");
        }
    };

    const handleMouseDown = (event: React.MouseEvent, currentCardId: number)=> {
        if(event.button === 2) return;

        const card = document.querySelector(`[data-ref="${currentCardId}"]`) as HTMLDivElement;
        
        if(!card) return;     
        
        // creating dragging card - copy
        const draggingCard = card.cloneNode(true) as HTMLDivElement;
        card.style.visibility = "hidden";
        
        const shiftX = event.clientX - card.getBoundingClientRect().left;
        const shiftY = event.clientY - card.getBoundingClientRect().top + 15; // margins TODO remove
        
        const positionX = event.pageX - shiftX;
        const positionY = event.pageY - shiftY;
        
        draggingCard.style.left = positionX + "px";
        draggingCard.style.top = positionY + "px";
        draggingCard.style.position = "absolute";
        
        
        document.body.append(draggingCard);

        // set temp vars
        let tempTodos = cloneDeep(todos);
        let cardBelow: HTMLDivElement | null | undefined = undefined;

        const onMouseMove = (event: MouseEvent) =>  { 
            // mooving dragging card            
            draggingCard.style.left = event.clientX - shiftX + "px";
            draggingCard.style.top = event.clientY - shiftY + "px";
            
            // search for underliying element
            draggingCard.hidden = true;
            cardBelow = document.elementFromPoint(event.clientX, event.clientY)?.closest(".card") as HTMLDivElement;
            draggingCard.hidden = false;
            
            if(cardBelow && card?.dataset.ref !== cardBelow?.dataset.ref) {
                
                const cardBelowId = Number(cardBelow?.dataset.ref);

                const nextTodos = produce(tempTodos, draft => {

                    const currentCardIndex = draft.findIndex(todo => todo.id === currentCardId);
                    const cardBelowIndex = draft.findIndex(todo => todo.id === cardBelowId);
                    
                    [draft[currentCardIndex], draft[cardBelowIndex]] = [draft[cardBelowIndex], draft[currentCardIndex]];
                });
                tempTodos = nextTodos;
                setTodos(() => nextTodos);               
            }   
        };
    
        document.addEventListener("mousemove", onMouseMove);
    
        draggingCard.onmouseup = () =>  {
            document.removeEventListener("mousemove", onMouseMove);
            
            draggingCard.style.left = positionX + "px";
            draggingCard.style.top = positionY + "px";

            draggingCard.remove();
            
            if(!cardBelow) {
                card.style.visibility = "";
            }

            card.onmouseup = null;
        };


    };

    return( 
        <Container maxWidth="xl">
            <Grid item xs={12}>
                <Box mt={2}>
                    <TextField label="Title" variant="outlined" fullWidth value={title} onKeyPress={handleEnter} onChange={handleInput}/>
                </Box> 
                <Box mt={2}>
                    <TextField label="Add..." variant="outlined" fullWidth value={value} onKeyPress={handleEnter} onChange={handleInput}/>
                </Box>
            </Grid>
            
            {todos.map((todo) => 
                <Grid item xs={12} key={todo.id} >
                    <CustomCard  todo={todo} className="card" handleMouseDown={handleMouseDown}/>
                </Grid>)}
            
        </Container>

    );};

    interface CustomCardProps {
        todo: Todo; 
        handleMouseDown: (event: React.MouseEvent, currentCardId: number) => void; 
        className: string;
    }

const CustomCard = (props: CustomCardProps) => {
    return (
        <Card data-ref={props.todo.id} onMouseDown={(event: React.MouseEvent) => props.handleMouseDown(event, props.todo.id)} className={props.className}>   
            <Container maxWidth="xl">
                <Grid item> {props.todo.value}</Grid>
            </Container>
        </Card>);
};

const Card = styled(Paper)`
        min-height: 50px;
        margin: 15px 0;
        width: 100%;
        transition: all 1s ease;
`;

export default Lists;