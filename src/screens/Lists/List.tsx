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
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import styled from "styled-components";
import ListItem from "./ListItem";
import lists, {TodoList}  from "../../mockdata/lists";

export interface Todo {id: number; value: string}


const List = (props: {list: TodoList | undefined; updateList: any} ) => {

    const [value, setValue] = React.useState<string>("");

    // const [todos, setTodos] = React.useState<Todo[]>(
    //     [{id: 0, value: "помыться0"}, {id: 1, value: "побриться1"}, {id: 2, value: "почесать зв ухом2"},
    //         {id: 3, value: "сесть на стул3"}, {id: 4, value: "хохохо4"}, {id:5, value: "весело5"},
    //         {id: 6, value: "ничего не скажешь6"}, {id: 7, value: "купить пива7"}, {id:8, value: "купить 2 пива8"},
    //         {id: 9, value: "купить 3 пива"}, {id: 10, value: "купить 4 пива"}, {id:11, value: "купить 5 пива"},
    //         {id: 12, value: "купить 6 пива"}, {id: 13, value: "купить 7 пива"}, {id:14, value: "купить 8 пива"},
    //     ]); 

    // const [dragAbility, setDragAbility] = React.useState(true);
    
    const handleInput = (event: React.ChangeEvent  <HTMLInputElement | HTMLTextAreaElement>)=> {
        setValue(event.target.value);
    };
    
    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){

            const newList = produce(props.list, draft => {
                draft?.data.unshift({id: draft.data.length + 100, value, date: Date.now(), updateDate: Date.now()});
            });

            props.updateList(newList);
            setValue("");
        }
    };


    const handleTitleChange = (event: ContentEditableEvent) => {
        props.updateList({...props.list, title: event.target.value});        
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

    const handleListItemChange = (value: string, id: number) => {
        console.log(value);
        const nextTodos = produce(todos, draft => {
            const index = draft.findIndex(todo => todo.id === id);
            if(typeof index !== undefined) {
                draft[index].value = value;
            }
        });
        setTodos(nextTodos);
    };

    return( 
        <ListsWrapper>
            <PageSubHeader maxWidth="xl">
                <Grid item xs={12}>
                    <Box>
                        <Title>
                            <ContentEditable html={props.list ? props.list.title : "New title"} onChange={handleTitleChange} />
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
                            {props.list && props.list.data.map((todo) => 
                                <ListItem key={todo.id} todo={todo} className="card"/>
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

export default List;