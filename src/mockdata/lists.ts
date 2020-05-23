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
        id: 200,
        title: "1",
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
        title: "2",
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
    {
        id: 2,
        title: "3",
        date: 123455,
        updateDate: 2345566,
        data: [
            {
                id: 6,
                value: "Матрица",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 7,
                value: "Бегущий по лезвию",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 8,
                value: "Не грози южному централу",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
        ],
    },
    {
        id: 3,
        title: "4",
        date: 123455,
        updateDate: 2345566,
        data: [
            {
                id: 9,
                value: "Матрица",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 10,
                value: "Бегущий по лезвию",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 11,
                value: "Не грози южному централу",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
        ],
    },
    {
        id: 4,
        title: "5",
        date: 123455,
        updateDate: 2345566,
        data: [
            {
                id: 12,
                value: "Матрица",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 13,
                value: "Бегущий по лезвию",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 14,
                value: "Не грози южному централу",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
        ],
    },
    {
        id: 5,
        title: "6",
        date: 123455,
        updateDate: 2345566,
        data: [
            {
                id: 15,
                value: "Матрица",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 16,
                value: "Бегущий по лезвию",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 17,
                value: "Не грози южному централу",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
        ],
    },
    {
        id: 6,
        title: "7",
        date: 123455,
        updateDate: 2345566,
        data: [
            {
                id: 18,
                value: "Матрица",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 19,
                value: "Бегущий по лезвию",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
            {
                id: 20,
                value: "Не грози южному централу",
                date: 2454234,
                updateDate: 564564,
                status: "active",
            },
        ],
    },
];

export default todoList;
