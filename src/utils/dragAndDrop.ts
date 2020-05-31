import cloneDeep from "clone-deep";
import deepEqual from "deep-equal";

// click functional
const handleDragAndDrop = (click?: "click"): any => {
    let drag = false;

    // only updateFn and saveFn props
    return (
        event: React.MouseEvent<HTMLDivElement>,
        id: number,
        items: any,
        onUpdate: any,
        onSave: any,
        onClick?: () => void,
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

                const nextItems = onUpdate(tempItems, id, itemBelowId);

                tempItems = nextItems;
            }
        };

        document.addEventListener("mousemove", handleMouseMove);

        currentItemCopy.onmouseup = (): void => {
            if (!drag && click && onClick) {
                onClick();
            }

            document.removeEventListener("mousemove", handleMouseMove);

            currentItemCopy.style.left = positionX + "px";
            currentItemCopy.style.top = positionY + "px";

            currentItemCopy.remove();

            currentItem.style.visibility = "";

            currentItemCopy.onmouseup = null;

            if (!deepEqual(tempItems, items)) {
                onSave(tempItems);
            }
        };
    };
};

export default handleDragAndDrop;
