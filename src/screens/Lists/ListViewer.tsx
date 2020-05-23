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
    const id = parseInt(props.match.params.id, 10);
    const [list, updateList] = React.useState<TodoList>();

    React.useEffect(() => {
        let list;
        if (id === 0) {
            list = server.createList();
        } else {
            list = server.loadList(id);
        }

        if (list) {
            updateList(list);
        }
    }, [id]);

    return <List list={list} updateList={updateList} />;
};

export default ListViewer;
