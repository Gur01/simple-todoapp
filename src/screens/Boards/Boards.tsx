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

    return (
        <CardsWrapper>
            <PageSubheader titleText="Boards" titleDisabled links={links} />
            <PageContent maxWidth="lg">
                <CustomAddCard>
                    <CardContent onClick={() => history.push("board/0")}>Add +</CardContent>
                </CustomAddCard>
                {boards.map((list) => {
                    const handleDragAndDrop = dragAndDrop();
                    return (
                        <CustomCard
                            className="card"
                            data-ref={list.id}
                            key={list.id}
                            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) =>
                                handleDragAndDrop(
                                    event,
                                    list.id,
                                    boards,
                                    setBoards,
                                    server.saveBoards,
                                    () => {
                                        history.push(`board/${list.id}`);
                                    },
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
