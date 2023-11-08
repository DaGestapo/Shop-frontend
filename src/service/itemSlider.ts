import { ElementSlider } from "./elementSlider";

export class ItemSlider extends ElementSlider {
    private moveStep: number;
    private padding: number;
    private width: number;
    private show: number;

    constructor(
        listElem: HTMLElement, 
        moveStep: number, 
        padding: number, 
        width: number, 
        show: number
        ) {
            super(listElem);

            this.moveStep = moveStep;
            this.padding = padding;
            this.width = width;
            this.show = show;

            this.removeListener();

            this.setListener();
            this.setItemsPosition();
            this.setHeightOfList();
    }

    private moveItemInList (e: MouseEvent) {
        if(!this.isMouseDown || !this.articlesNode) return;
        let currentMovePosition = -(this.pointerDownPosition - e.clientX) / 10; 

        const show = this.show;
        const listLength = this.articlesNode.length;
        const articles = this.element.querySelectorAll('article');

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


    protected setListener () {
        super.setListener(this.moveItemInList);
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

}

export type TypeElementSlider = InstanceType<typeof ItemSlider>;