import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import cloneDeep from "clone-deep";
import produce from "immer";
import throttle from "lodash.throttle";
import React from "react";
import styled from "styled-components";
import { ListPaper } from "../../components";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";

export interface Todo {id: number; value: string}

const Lists = () => {
    const [title, setTitle] = React.useState("Title");
    const [value, setValue] = React.useState<string>("");
    const [todos, setTodos] = React.useState<Todo[]>(
        [{id: 0, value: "помыться"}, {id: 1, value: "побриться"}, {id: 2, value: "почесать зв ухом"},
            {id: 3, value: "сесть на стул"}, {id: 4, value: "хохохо"}, {id:5, value: "весело"},
            {id: 6, value: "ничего не скажешь"}, {id: 7, value: "купить пива"}, {id:8, value: "купить 2 пива"},
            {id: 9, value: "купить 3 пива"}, {id: 10, value: "купить 4 пива"}, {id:11, value: "купить 5 пива"},
            {id: 12, value: "купить 6 пива"}, {id: 13, value: "купить 7 пива"}, {id:14, value: "купить 8 пива"},
        ]); 
    const [dragAbility, setDragAbility] = React.useState(true);
    
    const handleInput = (event: React.ChangeEvent  <HTMLInputElement | HTMLTextAreaElement>)=> {
        setValue(event.target.value);
    };
    
    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){

            setTodos(todos => [{id: todos.length, value}, ...todos, ]);
            setValue("");
        }
    };

    let counter = 1;

    const handleMouseDown = (event: React.MouseEvent, currentCardId: number)=> {
        if(event.button === 2 || !dragAbility) return;
        if(counter >= 2) {           
            return;
        }
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
        draggingCard.style.zIndex = "1000";
        draggingCard.style.width = card.offsetWidth + "px";
        draggingCard.style.transform = "scale(1.015)";
        draggingCard.style.cursor = "grabbing";
        
        draggingCard.addEventListener("mouseup", ()=> console.log("mouseup"));
        draggingCard.addEventListener("mousedown", ()=> console.log("mousedown"));
        document.body.append(draggingCard);

        // set temp vars
        let tempTodos = cloneDeep(todos);
        let cardBelow: HTMLDivElement | null | undefined = undefined;
        const throttledTodoAction = throttle((data: Todo[])=> setTodos(data), 100);
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
                throttledTodoAction(nextTodos);               
            }   
        };
    
        document.addEventListener("mousemove", onMouseMove);
    
        draggingCard.onmouseup = () =>  {
            counter += 1;

            setTimeout(() => {
                counter=1;
            }, 300);

            document.removeEventListener("mousemove", onMouseMove);

            
            draggingCard.style.left = positionX + "px";
            draggingCard.style.top = positionY + "px";
            
            draggingCard.remove();
            
            card.style.visibility = "";
            
            card.onmouseup = null;
        };
    };

    const handleTitleSave = (event: ContentEditableEvent) => {
        setTitle(event.target.value);        
    };

    return( 
        <ListsWrapper>
            <PageSubHeader maxWidth="xl">
                <Grid item xs={12}>
                    <Box>
                        <Title>
                            <ContentEditable html={title} onChange={handleTitleSave} />
                        </Title>
                    </Box> 
                </Grid>
            </PageSubHeader>
            
            <PageContent maxWidth="xl">
                <CustomCard>
                    <CustomCardContent>
                        <Box mb={2}>
                            <TextField label="Add to list" variant="outlined" fullWidth value={value} onKeyPress={handleEnter} onChange={handleInput}/>
                        </Box>
                        <ScrollingCardContent>
                            {todos.map((todo) => 
                                <ListPaper setDragAbility={setDragAbility} key={todo.id} todo={todo} className="card" handleMouseDown={handleMouseDown}/>
                            )}
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

const Title = styled(Button)`
    display: inline-block;
    width: auto;
    padding: 5px 10px;
    text-transform: none !important;
    font-size: 1.25rem !important;
    white-space: none;

    .MuiTouchRipple-root {
        display: none;
    }

`;

const ListsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const PageSubHeader = styled(Container)`
    background-color: #eee;
    z-index: 100;
`;

const PageContent = styled(Container)`
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    margin-bottom: 8px;
`;

export default Lists;