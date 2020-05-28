import cloneDeep from "clone-deep";
import produce from "immer";

export const stopPropagation = (event: React.MouseEvent): void => {
    event.stopPropagation();
};

export const handleDragAndDrop = (): any => {
    let drag = false;

    return (
        event: React.MouseEvent<HTMLDivElement>,
        id: number,
        items: any,
        updateFunction: React.Dispatch<React.SetStateAction<any>>,
        saveFunction: any,
        linkFunction: () => void,
    ): void => {
        if (event.button === 2) return;

        drag = false;
        const currentItem = event.currentTarget;

        if (!currentItem) return;

        const currentItemCopy = currentItem.cloneNode(true) as HTMLDivElement;

        const shiftX = event.pageX - currentItem.offsetLeft + 16;
        const shiftY = event.pageY - currentItem.offsetTop + 16;

        const positionX = event.pageX - shiftX;
        const positionY = event.pageY - shiftY;

        currentItem.style.visibility = "hidden";

        currentItemCopy.style.position = "absolute";
        currentItemCopy.style.left = positionX + "px";
        currentItemCopy.style.top = positionY + "px";
        currentItemCopy.style.zIndex = "100";
        currentItemCopy.style.userSelect = "none";
        currentItemCopy.style.display = "";

        // currentCardCopy.style.transform = "scale(1.05)";
        document.body.appendChild(currentItemCopy);

        let itemBelow: HTMLDivElement | null | undefined = undefined;

        let tempItems = cloneDeep(items);

        const handleMouseMove = (event: globalThis.MouseEvent): void => {
            drag = true;

            if (currentItemCopy.style.cursor !== "grabbing") {
                currentItemCopy.style.cursor = "grabbing";
            }

            currentItemCopy.style.left = event.pageX - shiftX + "px";
            currentItemCopy.style.top = event.pageY - shiftY + "px";

            currentItemCopy.hidden = true;
            itemBelow = document
                .elementFromPoint(event.clientX, event.clientY)
                ?.closest(".card") as HTMLDivElement;
            currentItemCopy.hidden = false;

            if (itemBelow && String(id) !== itemBelow?.dataset.ref) {
                const itemBelowId = Number(itemBelow.dataset.ref);

                const nextLists = produce(tempItems, (draft: any) => {
                    const currentCardIndex = draft.findIndex((todo: any) => todo.id === id);
                    const cardBelowIndex = draft.findIndex((todo: any) => todo.id === itemBelowId);
                    const moovingItem = draft.splice(currentCardIndex, 1);
                    draft.splice(cardBelowIndex, 0, ...moovingItem);
                });
                tempItems = nextLists;
                updateFunction(nextLists);
                saveFunction(nextLists);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);

        currentItemCopy.onmouseup = (): void => {
            if (!drag) {
                linkFunction();
            }

            document.removeEventListener("mousemove", handleMouseMove);

            currentItemCopy.style.left = positionX + "px";
            currentItemCopy.style.top = positionY + "px";

            currentItemCopy.remove();

            currentItem.style.visibility = "";

            currentItemCopy.onmouseup = null;
        };
    };
};
