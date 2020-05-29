import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ContentEditable } from "components";
import Button from "@material-ui/core/Button";

interface SubheaderProps {
    links: LinksProps[];
    isDoneListItem?: boolean;
    titleDisabled: boolean;
    titleText?: string;
    onTileChange?: any;
    onTitleBlur?: any;
}
export interface LinksProps {
    href: string;
    text: string;
}

const PageSubheader = (props: SubheaderProps) => {
    const history = useHistory();

    const handleLinkClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        href: string,
    ) => {
        event.preventDefault();
        history.push(href);
    };

    return (
        <SubHeader maxWidth="xl">
            <PageContent maxWidth="lg">
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        {props.links.map((link, index) => (
                            <Link
                                color="inherit"
                                href={link.href}
                                key={index}
                                onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
                                    handleLinkClick(event, link.href)
                                }
                            >
                                {link.text}
                            </Link>
                        ))}

                        <Title
                            done={props.isDoneListItem ? 1 : 0}
                            titledisabled={props.titleDisabled ? 1 : 0}
                        >
                            <ContentEditable
                                text={props.titleText ?? "New title"}
                                onChange={props.onTileChange ? props.onTileChange : undefined}
                                onBlur={props.onTitleBlur ? props.onTitleBlur : undefined}
                                disabled={
                                    props.isDoneListItem
                                        ? props.isDoneListItem
                                        : props.titleDisabled
                                }
                            />
                        </Title>
                    </Breadcrumbs>
                </Grid>
            </PageContent>
        </SubHeader>
    );
};

const SubHeader = styled(Container)`
    background-color: #eee;
    z-index: 100;
`;

const PageContent = styled(Container)`
    flex-grow: 1;
    overflow: hidden;
    position: relative;
`;

interface TitleProps {
    done: number;
    titledisabled: number;
}

const Title = styled(Button)<TitleProps>`
    color: ${(props) => (props.done === 1 ? "rgba(0, 0, 0, 0.4) !important" : "inherit")};
    display: inline-block;
    font-size: 1.25rem !important;
    min-width: 50px !important;
    pointer-events: ${(props) => (props.titledisabled === 1 ? "none" : "all")};
    text-decoration: ${(props) => (props.done === 1 ? "line-through !important" : "none")};
    text-transform: none !important;
    white-space: none;
    width: auto;

    div[class^="StyledContentEditable"] {
        padding: 0;
    }

    .MuiTouchRipple-root {
        display: none;
    }
`;
export default PageSubheader;
