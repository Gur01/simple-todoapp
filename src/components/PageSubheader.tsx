import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

interface Subheader {
    links: LinksProps[];
    title: any;
}
export interface LinksProps {
    href: string;
    text: string;
}

const PageSubheader = (props: Subheader) => {
    const history = useHistory();

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
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

                        {props.title()}
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
    position: relative;
    flex-grow: 1;
    overflow: hidden;
`;

export default PageSubheader;
