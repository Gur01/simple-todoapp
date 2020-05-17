import React from "react";

interface ContentEditableProps {
    text: string;
    style?: Record<string, string>;
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
        <div
            contentEditable="true"
            dangerouslySetInnerHTML={{ __html: value }}
            onInput={handleChange}
            onBlur={handleBlur}
            style={props.style}
            onKeyDown={handleKeyDown}
            onClick={props.onClick}
        ></div>
    );
};

export default ContentEditable;
