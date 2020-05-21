export interface TodoListItem {
    id: number;
    value: string;
    date: number;
    updateDate: number;
    status: "active" | "done";
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
        title: "Список покупок",
        date: 123455,
        updateDate: 2345566,
        data: [
            {
                id: 0,
                value: "яблоки",
                date: 2454234,
                updateDate: 564564,
                status: "done",
            },
            {
                id: 1,
                value: "картошка",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 2,
                value: "шпроты",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
        ],
    },
    {
        id: 1,
        title: "Посмотреть фильмы",
        date: 123455,
        updateDate: 2345566,
        data: [
            {
                id: 3,
                value: "Матрица",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 4,
                value: "Бегущий по лезвию",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 5,
                value: "Не грози южному централу",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
        ],
    },
];

export default todoList;
