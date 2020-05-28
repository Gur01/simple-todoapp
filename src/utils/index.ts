export { default as dragAndDrop } from "./dragAndDrop";

export const stopPropagation = (event: React.MouseEvent): void => {
    event.stopPropagation();
};
