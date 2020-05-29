import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { PageSubheader } from "components";
import { Board } from "../../mockdata/boards";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";

const links = [
    {
        href: "/",
        text: "Main",
    },
    {
        href: "/boards",
        text: "Boards",
    },
];

interface BoardProps {
    board?: Board;
    updateBoard: any;
}

const Boards = (props: BoardProps) => {
    return (
        <BoardsWrapper>
            <PageSubheader links={links} titleText={props.board?.title} titleDisabled={true} />
            <PageContent>
                <>
                    {props.board &&
                        props.board.data.map((card) => (
                            <BoardCard key={card.id} className="boardCard">
                                <CardHeader title={card.title} />
                                <CardContent>
                                    {card.data &&
                                        card.data.map((cardList) => (
                                            <BoardListItemCard
                                                key={cardList.id}
                                                className="boardListItemCard"
                                            >
                                                {cardList.value}
                                            </BoardListItemCard>
                                        ))}
                                </CardContent>
                            </BoardCard>
                        ))}
                </>
            </PageContent>
        </BoardsWrapper>
    );
};

const BoardListItemCard = styled(Paper)`
    cursor: pointer;
    margin: 6px 0;
    position: relative;
    user-select: none;
    width: 100%;
    padding: 6px;
`;

const BoardsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const PageContent = styled(Container)`
    flex-grow: 1;
    display: flex !important;
    flex-wrap: nowrap;
    height: 100%;
    align-items: flex-start;
`;

const BoardCard = styled(Card)`
    width: 300px;
    min-width: 300px;
    padding: 8px;
    &:not(.last-child) {
        margin-right: 16px;
    }
`;
export default Boards;
