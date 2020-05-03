import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import cloneDeep from "clone-deep";
import produce from "immer";
import React from "react";
import styled from "styled-components";
import TestCard from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MoreVert from "@material-ui/icons/MoreVert";


interface Todo {id: number; value: string}

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
    
    const handleInput = (event: React.ChangeEvent  <HTMLInputElement | HTMLTextAreaElement>)=> {
        setValue(event.target.value);
    };
    
    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){

            setTodos(todos => [{id: todos.length, value}, ...todos, ]);
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
        draggingCard.style.zIndex = "1";
        draggingCard.style.width = card.offsetWidth + "px";
        draggingCard.style.transform = "scale(1.015)";
        draggingCard.style.cursor = "grabbing";
        
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
        <ListsWrapper>
            <PageSubHeader maxWidth="xl">
                <Grid item xs={12}>
                    <Box>
                        <Title suppressContentEditableWarning={true} contentEditable="true" size="large">Title</Title>
                    </Box> 
                </Grid>
            </PageSubHeader>
            
            <PageContent maxWidth="xl">
                <CustomTestCard>
                    <CardContent>
                        <Box mt={2}>
                            <TextField label="Add to list" variant="outlined" fullWidth value={value} onKeyPress={handleEnter} onChange={handleInput}/>
                        </Box>
                        {todos.map((todo) => 
                            <CustomCard  key={todo.id} todo={todo} className="card" handleMouseDown={handleMouseDown}/>
                        )}
                    </CardContent>
                </CustomTestCard>
            </PageContent>
        </ListsWrapper>

    );
};

interface CustomCardProps {
    todo: Todo; 
    handleMouseDown: (event: React.MouseEvent, currentCardId: number) => void; 
    className: string;
}

const CustomTestCard = styled(TestCard)`
    margin-top: 20px;
`;
const CustomCard = (props: CustomCardProps) => {
    return (
        <Card data-ref={props.todo.id} onMouseDown={(event: React.MouseEvent) => props.handleMouseDown(event, props.todo.id)} className={props.className}>   
            {props.todo.value}
            <MenuIcon />
        </Card>);
};


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
    overflow-y: auto;
    overflow-x: hidden;
`;

const Card = styled(Paper)`
        min-height: 50px;
        margin: 15px 0;
        width: 100%;
        height: auto;
        padding: 8px 24px;
        padding-right: 50px;
        position: relative;
    `;
    

const MenuIcon = styled(MoreVert)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`;

export default Lists;