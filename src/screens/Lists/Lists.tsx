import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import cloneDeep from "clone-deep";
import produce from "immer";
import React from "react";
import { useHistory } from "react-router-dom";
import server from "server";
import styled from "styled-components";
import { TodoList } from "../../mockdata/lists";
import Container from "@material-ui/core/Container";
import { PageSubheader } from "components";
import { dragAndDrop } from "utils";

const List = () => {
    const history = useHistory();

    const [lists, setLists] = React.useState<TodoList[]>([]);

    React.useEffect(() => {
        const lists = server.loadLists();
        setLists(lists);
    }, []);

    const links = [
        {
            href: "/",
            text: "Main",
        },
    ];

    const handleDragAndDrop = dragAndDrop("card", "click");

    const onUpdateLists = (lists: any, listId: number, listBelowId: number): any => {
        const nextLists = produce(lists, (draft: any) => {
            const currentCardIndex = draft.findIndex((todo: any) => todo.id === listId);
            const cardBelowIndex = draft.findIndex((todo: any) => todo.id === listBelowId);
            const moovingItem = draft.splice(currentCardIndex, 1);
            draft.splice(cardBelowIndex, 0, ...moovingItem);
        });

        setLists(nextLists as any);
        return nextLists;
    };

    const onSaveLists = (newBoards: any) => {
        server.saveLists(newBoards as any);
    };

    const onClickList = (id: number) => {
        history.push(`list/${id}`);
    };

    return (
        <CardsWrapper>
            <PageSubheader titleText="Lists" titleDisabled links={links} />
            <PageContent maxWidth="lg">
                <CustomAddCard>
                    <CardContent onClick={() => history.push("list/0")}>Add +</CardContent>
                </CustomAddCard>
                {lists.map((list) => {
                    return (
                        <CustomCard
                            className="card"
                            data-ref={list.id}
                            key={list.id}
                            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) =>
                                handleDragAndDrop(
                                    event,
                                    event.currentTarget,
                                    list.id,
                                    lists,
                                    onUpdateLists,
                                    onSaveLists,
                                    () => onClickList(list.id),
                                )
                            }
                        >
                            <CardContent>{list.title}</CardContent>
                        </CustomCard>
                    );
                })}
            </PageContent>
        </CardsWrapper>
    );
};

const CardsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const CustomCard = styled(Card)`
    width: 250px;
    height: 150px;
    margin: 16px;
    cursor: pointer;
    box-sizing: content-box;
`;

const CustomAddCard = styled(CustomCard)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PageContent = styled(Container)`
    flex-grow: 1;
    display: flex !important;
    flex-wrap: wrap;
`;

export default List;
