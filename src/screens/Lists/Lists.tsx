import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import styled from "styled-components";

const Lists = () => {

    const [value, setValue] = React.useState<string>("");
    const [todos, setTodos] = React.useState<{id: number; value: string}[]>([]);

    const handleInput = (event: React.ChangeEvent  <HTMLInputElement | HTMLTextAreaElement>)=> {
        setValue(event.target.value);
    };

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        
        if(event.key === "Enter"){
            setTodos(todos => [...todos, {id: todos.length, value}]);
            setValue("");
        }
    };

    return( 
        <Container maxWidth="xl">
            <Grid item xs={12}>
                <Box mt={2}>
                    <TextField label="Add..." variant="outlined" fullWidth value={value} onKeyPress={handleEnter} onChange={handleInput}/>
                </Box>
            </Grid>
            {todos.map((todo, index) => 
                <Grid item xs={12} key={index}>
                    <Card>   
                        <Container maxWidth="xl">
                            <Grid item> {todo.value}</Grid>
                        </Container>
                    </Card>
                </Grid>)}
            
        </Container>

    );};

const Card = styled(Paper)`
        min-height: 50px;
        margin: 15px 0;
`;

export default Lists;