import React from "react";
import { RouteComponentProps } from "react-router-dom";
import server from "server";
import { Board as BoardInterface } from "../../mockdata/boards";
import Board from "./Board";

export interface Todo {
    id: number;
    board: any;
}

interface Params {
    id: string;
}

const BoardViewer = (props: RouteComponentProps<Params>) => {
    const id = parseInt(props.match.params.id, 10);
    const [board, updateBoard] = React.useState<BoardInterface>();

    React.useEffect(() => {
        console.info("update boards"); // TODO remove
    }, [board]);
    React.useEffect(() => {
        let board;
        if (id === 0) {
            board = server.createBoard();
        } else {
            board = server.loadBoard(id);
        }

        if (board) {
            updateBoard(board);
        }
    }, [id]);

    return <Board board={board} updateBoard={updateBoard} />;
};

export default BoardViewer;
