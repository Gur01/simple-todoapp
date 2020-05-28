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
                id: 1,
                title: "1",
                date: 123455,
                updateDate: 2345566,
                // cardList
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
                    {
                        id: 3,
                        value: "что то еще",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 4,
                        value: "хелло",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                ],
            },
            {
                id: 2,
                title: "2",
                date: 123455,
                updateDate: 2345566,
                // cardList
                data: [
                    {
                        id: 5,
                        value: "яблоки",
                        date: 2454234,
                        updateDate: 564564,
                        status: "done",
                    },
                    {
                        id: 6,
                        value: "картошка",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 7,
                        value: "шпроты",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                ],
            },
            {
                id: 3,
                title: "3",
                date: 123455,
                updateDate: 2345566,
                // cardList
                data: [
                    {
                        id: 8,
                        value: "яблоки",
                        date: 2454234,
                        updateDate: 564564,
                        status: "done",
                    },
                    {
                        id: 9,
                        value: "картошка",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 10,
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
        id: 2,
        title: "2",
        date: 123455,
        updateDate: 123455,
        // cards
        data: [
            {
                id: 4,
                title: "4",
                date: 123455,
                updateDate: 2345566,
                // cardList
                data: [
                    {
                        id: 11,
                        value: "яблоки",
                        date: 2454234,
                        updateDate: 564564,
                        status: "done",
                    },
                    {
                        id: 12,
                        value: "картошка",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 13,
                        value: "шпроты",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 14,
                        value: "что то еще",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 15,
                        value: "хелло",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                ],
            },
            {
                id: 5,
                title: "5",
                date: 123455,
                updateDate: 2345566,
                // cardList
                data: [
                    {
                        id: 16,
                        value: "яблоки",
                        date: 2454234,
                        updateDate: 564564,
                        status: "done",
                    },
                    {
                        id: 17,
                        value: "картошка",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 18,
                        value: "шпроты",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                ],
            },
            {
                id: 6,
                title: "6",
                date: 123455,
                updateDate: 2345566,
                // cardList
                data: [
                    {
                        id: 19,
                        value: "яблоки",
                        date: 2454234,
                        updateDate: 564564,
                        status: "done",
                    },
                    {
                        id: 20,
                        value: "картошка",
                        date: 2454234,
                        updateDate: 564564,
                        status: "active",
                    },
                    {
                        id: 21,
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
