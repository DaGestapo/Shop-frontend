

export const resizeMobileList = (list: HTMLElement) => {
    const listItem = list.querySelectorAll('article');
    if(!listItem) return;

    let maxHeight = 0;
    for(let i=0; i < listItem.length; i++) {
        let itemHeight = listItem[i].getBoundingClientRect().height;
        if(maxHeight < itemHeight) {
            maxHeight = itemHeight;
        }
    }

    list.style.height = `${maxHeight}px`;
}