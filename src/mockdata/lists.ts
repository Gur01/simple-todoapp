export interface TodoListItem {
    id: number;
    value: string;
    date: number;
    updateDate: number;
}

export interface TodoList {
    id: number;
    title: string;
    date: number;
    updateDate: number;
    data: TodoListItem[];
}

const todoList: TodoList[] = [
    //list
    {
        id: 0,
        title: "list title1",
        date: 123455,
        updateDate: 2345566,
        data: [
            {
                id: 0,
                value: "0помыться",
                date: 2454234,
                updateDate: 564564,
            },
            {
                id: 1,
                value: "1побриться",
                date: 2454234,
                updateDate: 564564,
            },
            {
                id: 2,
                value: "2gjxtcfnmcz",
                date: 2454234,
                updateDate: 564564,
            },
        ],
    },
    {
        id: 1,
        title: "list title2",
        date: 123455,
        updateDate: 2345566,
        data: [
            {
                id: 3,
                value: "0почесать что что",
                date: 2454234,
                updateDate: 564564,
            },
            {
                id: 4,
                value: "1туда",
                date: 2454234,
                updateDate: 564564,
            },
            {
                id: 5,
                value: "2сюда как то так",
                date: 2454234,
                updateDate: 564564,
            },
        ],
    },
];

export default todoList;
