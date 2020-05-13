import React from "react";
import lists, { TodoList } from "../../mockdata/lists";
import List from "./List";
import { RouteComponentProps } from "react-router-dom";


export interface Todo {id: number; value: string}

interface Params {
    id: string;
}

const ListViewer = (props: RouteComponentProps<Params>) => {
    const id = props.match.params.id;
    const [list, updateList] = React.useState<TodoList>();


    React.useEffect(()=> {
        const list = lists.find(list => list.id == parseInt(id, 10));
        if(list) {
            updateList(list);
        }
    }, [id]);

    return <List list={list} updateList={updateList}/>;
};

export default ListViewer;