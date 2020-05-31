import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import { PageSubheader } from "components";
import React from "react";
import { useHistory } from "react-router-dom";
import server from "server";
import styled from "styled-components";
import { dragAndDrop } from "utils";
import { Board } from "../../mockdata/boards";
import produce from "immer";

const Boards = () => {
    const history = useHistory();

    const [boards, setBoards] = React.useState<Board[]>([]);

    React.useEffect(() => {
        const boards = server.loadBoards();
        setBoards(boards);
    }, []);

    const links = [
        {
            href: "/",
            text: "Main",
        },
    ];

    const onUpdateBoards = (boards: any, itemId: number, itemBelowId: number): any => {
        const nextBoards = produce(boards, (draft: any) => {
            const currentCardIndex = draft.findIndex((todo: any) => todo.id === itemId);
            const cardBelowIndex = draft.findIndex((todo: any) => todo.id === itemBelowId);
            const moovingItem = draft.splice(currentCardIndex, 1);
            draft.splice(cardBelowIndex, 0, ...moovingItem);
        });
        setBoards(nextBoards as any);
        return nextBoards;
    };
    const onSaveBoards = (newBoards: any) => {
        server.saveBoards(newBoards as any);
    };
    const onClickBoard = (id: number) => {
        history.push(`board/${id}`);
    };

    return (
        <CardsWrapper>
            <PageSubheader titleText="Boards" titleDisabled links={links} />
            <PageContent maxWidth="lg">
                <CustomAddCard>
                    <CardContent onClick={() => history.push("board/0")}>Add +</CardContent>
                </CustomAddCard>
                {boards.map((list) => {
                    const handleDragAndDrop = dragAndDrop("card", "click");
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
                                    boards,
                                    onUpdateBoards,
                                    onSaveBoards,
                                    () => onClickBoard(list.id),
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

export default Boards;
