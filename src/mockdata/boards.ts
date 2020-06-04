export interface Board {
    id: number;
    title: string;
    date: number;
    updateDate: number;
    data: BoardCard[];
}

export interface BoardCard {
    id: number;
    title: string;
    date: number;
    updateDate: number;
    data: BoardCardItem[];
}

export interface BoardCardItem {
    id: number;
    value: string;
    date: number;
    updateDate: number;
    status: "active" | "done";
}

const BoardList: Board[] = [
    //board
    {
        id: 1,
        title: "1",
        date: 123455,
        updateDate: 123455,
        // cards
        data: [
            {
                id: 2,
                title: "1",
                date: 123455,
                updateDate: 2345566,
                // cardList
                data: [
                    {
                        id: 3,
                        value: "яблоки",
                        date: 2454234,
                        updateDate: 564564,
                        status: "done",
                    },
                    {
                        id: 4,
                        value: "картошка",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 5,
                        value: "шпроты",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 6,
                        value: "что то еще",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 7,
                        value: "хелло",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 9,
                        value: "яблоки",
                        date: 2454234,
                        updateDate: 564564,
                        status: "done",
                    },
                    {
                        id: 10,
                        value: "картошка",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 11,
                        value: "шпроты",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                ],
            },
            {
                id: 8,
                title: "2",
                date: 123455,
                updateDate: 2345566,
                // cardList
                data: [],
            },
            {
                id: 12,
                title: "3",
                date: 123455,
                updateDate: 2345566,
                // cardList
                data: [
                    {
                        id: 13,
                        value: "яблоки",
                        date: 2454234,
                        updateDate: 564564,
                        status: "done",
                    },
                    {
                        id: 14,
                        value: "картошка",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 15,
                        value: "шпроты",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                ],
            },
        ],
    },

    {
        id: 16,
        title: "2",
        date: 123455,
        updateDate: 123455,
        // cards
        data: [
            {
                id: 17,
                title: "4",
                date: 123455,
                updateDate: 2345566,
                // cardList
                data: [
                    {
                        id: 18,
                        value: "яблоки",
                        date: 2454234,
                        updateDate: 564564,
                        status: "done",
                    },
                    {
                        id: 19,
                        value: "картошка",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 20,
                        value: "шпроты",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 21,
                        value: "что то еще",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 22,
                        value: "хелло",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                ],
            },
            {
                id: 23,
                title: "5",
                date: 123455,
                updateDate: 2345566,
                // cardList
                data: [
                    {
                        id: 24,
                        value: "яблоки",
                        date: 2454234,
                        updateDate: 564564,
                        status: "done",
                    },
                    {
                        id: 25,
                        value: "картошка",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 26,
                        value: "шпроты",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                ],
            },
            {
                id: 27,
                title: "6",
                date: 123455,
                updateDate: 2345566,
                // cardList
                data: [
                    {
                        id: 28,
                        value: "яблоки",
                        date: 2454234,
                        updateDate: 564564,
                        status: "done",
                    },
                    {
                        id: 29,
                        value: "картошка",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 30,
                        value: "шпроты",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                ],
            },
        ],
    },
];

export default BoardList;
