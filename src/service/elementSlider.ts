import { Slider } from "./sliderService";

export class ElementSlider extends Slider {
    protected articlesNode: NodeListOf<HTMLElement> | null;

    constructor (listElem: HTMLElement) {
        super(listElem)
        this.articlesNode = this.setListItems(); 
    
    }


    protected setHeightOfList() {
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

            this.element.style.height = `${maxHeight}px`;
        }, 1000);
     
    }

    protected setListItems () {
        return this.element.querySelectorAll('article').length > 0 
            ? this.element.querySelectorAll('article')
            : null;
    }
}