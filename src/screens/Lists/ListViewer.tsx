import React from "react";
import { RouteComponentProps } from "react-router-dom";
import server from "server";
import { TodoList } from "../../mockdata/lists";
import List from "./List";

export interface Todo {
    id: number;
    value: string;
}

interface Params {
    id: string;
}

const ListViewer = (props: RouteComponentProps<Params>) => {
    const id = props.match.params.id;
    const [list, updateList] = React.useState<TodoList>();

    React.useEffect(() => {
        const list = server.loadList(id);

        if (list) {
            updateList(list);
        }
    }, [id]);

    return <List list={list} updateList={updateList} />;
};

export default ListViewer;
