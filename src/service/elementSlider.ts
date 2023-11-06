;

export class ElementSlider {
    private listElem: HTMLElement;
    private isMouseDown: boolean;
    private pointerDownPosition: number;
    private articlesNode: NodeListOf<HTMLElement> | null;
    private moveStep: number;
    private padding: number;
    private paddingLength: number;
    private width: number;
    private show: number;

    constructor(
        listElem: HTMLElement, 
        moveStep: number, 
        padding: number, 
        width: number, 
        show: number
        ) {
            this.listElem = listElem;
            this.isMouseDown = false;
            this.pointerDownPosition = 0;
            this.articlesNode = null;
            this.moveStep = moveStep;
            this.padding = padding;
            this.width = width;
            this.show = show;

            this.setListItems();
            this.paddingLength = this.calcPadingsLength();
            this.setListener();
            this.setItemsPosition();
            this.setHeightOfList();
    }

    private moveItemInList (e: MouseEvent) {
        if(!this.isMouseDown || !this.articlesNode) return;
        let currentMovePosition = -(this.pointerDownPosition - e.clientX) / 10; 

        const show = this.show;
        const listLength = this.articlesNode.length;
        const articles = this.listElem.querySelectorAll('article');

        if(currentMovePosition > 0) {
            currentMovePosition = 0;
        }

        if(currentMovePosition < (listLength - show) * -1) {
            currentMovePosition = (listLength - show) * -1;
        }

        for(let i=0; i<articles.length; i++) {
            articles[i].style.transform = `translateX(
                ${(currentMovePosition + i) * this.moveStep}px
            )`
        }
    }

    private mouseDown (e: MouseEvent) {
        this.isMouseDown = true;
        this.pointerDownPosition = e.clientX;
    }

    private mouseUp () {
        this.isMouseDown = false;
        this.pointerDownPosition = 0;
    }

    private setListener () {
        this.listElem.onpointerdown = this.mouseDown.bind(this);
        this.listElem.onpointerup = this.mouseUp.bind(this);
        this.listElem.onpointermove = this.moveItemInList.bind(this);
 

    }

    private setListItems () {
        this.articlesNode = this.listElem.querySelectorAll('article');
    }

    private setItemsPosition () {
        if(!this.articlesNode) return;


        for(let i=0; i<this.articlesNode.length; i++) {
            this.articlesNode[i].style.width = `${this.width}px`;
            this.articlesNode[i].style.transform = `translateX(${i * this.moveStep}px)`;
            if(i === 0) continue;
            this.articlesNode[i].style.paddingLeft = `${this.padding}px`;
        }
    }

    private setHeightOfList() {
        const listItem = this.articlesNode;
        if(!listItem) return;

        setTimeout(() => {
            let maxHeight = 0;
            for(let i=0; i < listItem.length; i++) {
                let itemHeight = listItem[i].getBoundingClientRect().height;
                if(maxHeight < itemHeight) {
                    maxHeight = itemHeight;
                }
            }
        this.listElem.style.height = `${maxHeight}px`;
        }, 1000);
    }

    private calcPadingsLength() {
        if(!this.articlesNode) return 0;

        return (this.articlesNode.length) * this.padding;
    }
}

export type TypeElementSlider = InstanceType<typeof ElementSlider>;