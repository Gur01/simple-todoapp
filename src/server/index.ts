import mockLists, { TodoList } from "../mockdata/lists";
import mockBoards, { Board } from "../mockdata/boards";
import cloneDeep from "clone-deep";

let listsFromServer: TodoList[] = mockLists;
let boardsFromServer: Board[] = mockBoards;

export default {
    // lists
    loadLists: (): TodoList[] => {
        console.info("loadLists", listsFromServer);
        return listsFromServer;
    },

    loadList: (id: number | string): TodoList | undefined => {
        if (typeof id === "string") id = parseInt(id, 10);

        const list = listsFromServer.find((list) => list.id == id);

        if (list) {
            console.info("loadList ", id, list);
        } else {
            console.error("no list with id ", id);
        }

        return list;
    },

    //save all lists
    saveLists: (lists: TodoList[]): void => {
        listsFromServer = lists;
        console.info("saveLists", lists);
    },

    //save list (data, title, everything));
    saveList: (list: TodoList): void => {
        const listIndex = listsFromServer.findIndex(
            (listFromServer) => listFromServer.id === list.id,
        );

        listsFromServer[listIndex] = list;
        console.info("saveList", list);
    },

    deleteList: (listId: number, todoId: number): void => {
        const listIndex = listsFromServer.findIndex(
            (listFromServer) => listFromServer.id === listId,
        );

        listsFromServer[listIndex] = {
            ...listsFromServer[listIndex],
            data: listsFromServer[listIndex].data.filter((todo) => todo.id !== todoId),
        };

        console.info("deleteListItem: ", listId);
    },

    createList: (): TodoList => {
        const newList = cloneDeep(listsFromServer);

        newList.unshift({
            id: Date.now(),
            title: "New list",
            date: Date.now(),
            updateDate: Date.now(),
            data: [],
        });
        listsFromServer = newList;

        return listsFromServer[0];
    },

    // boards
    loadBoards: (): Board[] => {
        console.info("loadLists", boardsFromServer);
        return boardsFromServer;
    },

    loadBoard: (id: number): Board | undefined => {
        const boardById = boardsFromServer.find((board) => board.id === id);

        if (boardById) {
            console.info("loadBoard ", id, boardById);
        } else {
            console.error("no board with id ", id);
        }

        return boardById;
    },

    saveBoards: (boards: Board[]): void => {
        boardsFromServer = boards;
        console.info("saveBoards", boards);
    },

    saveBoard: (board: Board): void => {
        const listIndex = boardsFromServer.findIndex(
            (boardFromServer) => boardFromServer.id === board.id,
        );

        boardsFromServer[listIndex] = board;
        console.info("saveBoard", board);
    },

    createBoard: (): Board => {
        const newBoards = cloneDeep(boardsFromServer);

        newBoards.unshift({
            id: Date.now(),
            title: "New board",
            date: Date.now(),
            updateDate: Date.now(),
            data: [],
        });
        boardsFromServer = newBoards;

        return boardsFromServer[0];
    },
};
