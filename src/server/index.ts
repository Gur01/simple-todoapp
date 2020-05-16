import mockLists, { TodoList, TodoListItem } from "../mockdata/lists";

let listsFromServer: TodoList[] = mockLists;

export default {
    saveLists: (lists: TodoList[]): void => {
        listsFromServer = lists;
    },

    loadLists: (): TodoList[] => {
        return listsFromServer;
    },

    saveList: (id: number, data: TodoListItem[]): void => {
        const listIndex = listsFromServer.findIndex((list) => list.id === id);
        console.log(data);

        listsFromServer[listIndex].data = data;
    },
};
