import cloneDeep from "clone-deep";
import deepEqual from "deep-equal";

// click functional
const handleDragAndDrop = (className: string, type?: "click" | "press"): any => {
    let drag = false;

    let editTimer: number;

    // if (type === "click") {
    //     throw new Error("You must provide onClick function");
    //     return;
    // }
    // if (type === "press") {
    //     throw new Error("You must provide onClick function");
    //     return;
    // }
    // only updateFn and saveFn props

    return (
        event: React.MouseEvent<HTMLDivElement>,
        target: HTMLDivElement,
        id: number,
        items: any,
        onUpdate: any,
        onSave: any,
        onClick: () => void,
        onPress: () => void,
    ): void => {
        if (event.button === 2) return;

        drag = false;

        const currentItem = target;

        if (!currentItem) return;

        const shiftX = event.clientX - currentItem.getBoundingClientRect().left;
        const shiftY = event.clientY - currentItem.getBoundingClientRect().top + 15; // margins TODO remove

        // const shiftX = event.pageX - currentItem.offsetLeft + 16;
        // const shiftY = event.pageY - currentItem.offsetTop + 16;

        const positionX = event.pageX - shiftX;
        const positionY = event.pageY - shiftY;

        const currentItemCopy = createItemCopy();

        document.body.appendChild(currentItemCopy);

        let itemBelow: HTMLDivElement | null | undefined = undefined;

        let tempItems = cloneDeep(items);

        // onPress logic
        if (type === "press") {
            editTimer = setTimeout(() => {
                onPress();
                removeItemCopy();
            }, 300);
        }

        document.addEventListener("mousemove", handleMouseMove);

        currentItemCopy.onmouseup = handleMouseUp;

        function handleMouseMove(event: globalThis.MouseEvent): void {
            if (editTimer) {
                clearInterval(editTimer);
            }
            drag = true;

            if (currentItemCopy.style.cursor !== "grabbing") {
                currentItemCopy.style.cursor = "grabbing";
            }

            currentItemCopy.style.left = event.pageX - shiftX + "px";
            currentItemCopy.style.top = event.pageY - shiftY + "px";

            // find the d'n'd item
            currentItemCopy.hidden = true;
            itemBelow = document
                .elementFromPoint(event.clientX, event.clientY)
                ?.closest(`.${className}`) as HTMLDivElement;
            currentItemCopy.hidden = false;

            // update items
            if (itemBelow && String(id) !== itemBelow?.dataset.ref) {
                const itemBelowId = Number(itemBelow.dataset.ref);

                const nextItems = onUpdate(tempItems, id, itemBelowId);
                console.log({ tempItems });

                tempItems = nextItems;
            }
        }

        function handleMouseUp(): void {
            if (editTimer) {
                clearInterval(editTimer);
            }

            if (!drag && type && onClick) {
                onClick();
            }

            removeItemCopy();

            if (!deepEqual(tempItems, items)) {
                onSave(tempItems);
            }
        }

        function createItemCopy(): HTMLDivElement {
            const currentItemCopy = currentItem.cloneNode(true) as HTMLDivElement;

            currentItem.style.visibility = "hidden";

            currentItemCopy.style.position = "absolute";
            currentItemCopy.style.left = positionX + "px";
            currentItemCopy.style.top = positionY + "px";
            currentItemCopy.style.zIndex = "100";
            currentItemCopy.style.userSelect = "none";
            currentItemCopy.style.display = "";
            currentItemCopy.style.width = currentItem.offsetWidth + "px";
            // currentCardCopy.style.transform = "scale(1.05)";

            return currentItemCopy;
        }

        function removeItemCopy(): void {
            document.removeEventListener("mousemove", handleMouseMove);

            currentItemCopy.style.left = positionX + "px";
            currentItemCopy.style.top = positionY + "px";

            currentItemCopy.remove();
            currentItem.style.visibility = "";
        }
    };
};

export default handleDragAndDrop;
