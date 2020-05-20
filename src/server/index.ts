import mockLists, { TodoList } from "../mockdata/lists";

let listsFromServer: TodoList[] = mockLists;

export default {
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
        const listIndex = listsFromServer.findIndex((listFromServer) => listFromServer.id === list.id);

        listsFromServer[listIndex] = list;
        console.info("saveList", list);
    },
};
