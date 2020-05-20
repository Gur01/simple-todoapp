import React from "react";
import styled from "styled-components";

interface ContentEditableProps {
    text: string;
    style?: Record<string, string>;
    propsRef?: any;
    disabled?: boolean;
    onChange: (value: string) => void;
    onBlur: (target: string) => void;
    onClick?: () => void;
}

const ContentEditable = (props: ContentEditableProps) => {
    const value = React.useMemo(() => props.text, []);

    const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
        const text = event.currentTarget.innerHTML;
        props.onChange(text);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === 27) {
            event.currentTarget.blur();
            props.onBlur(event.currentTarget.innerHTML);
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        props.onBlur(event.target.innerHTML);
    };

    return (
        <StyledContentEditable
            contentEditable={props.disabled !== undefined ? !props.disabled : true}
            dangerouslySetInnerHTML={{ __html: value }}
            onInput={handleChange}
            onBlur={handleBlur}
            style={props.style}
            onKeyDown={handleKeyDown}
            onClick={props.onClick}
            ref={props.propsRef}
        ></StyledContentEditable>
    );
};

const StyledContentEditable = styled.div`
    padding: 10px;
    padding-left: 20px;
    height: 100% !important;
    text-decoration: inherit;
    line-height: 1.5;

    > div {
        padding-right: 80px;
        height: 100%;
    }
`;
export default ContentEditable;
