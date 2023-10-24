import {Dote} from './doteService';

export class Slider {
    private leftDote: Dote;
    private rightDote: Dote;
    private sliderEl: HTMLDivElement;
    private sliderWidth: number;
    private sideBarEl: HTMLElement;
    private priceRange: HTMLDivElement;
    private leftProcent: number;
    private rightProcent: number;
    private leftPrice: number;
    private rightPrice: number;
    private priceNumber: number;

    constructor(
        priceRange: HTMLDivElement,
        sideBar: HTMLElement,
        sliderElement: HTMLDivElement, 
        leftDote: HTMLDivElement, 
        rightDote: HTMLDivElement,
    ) {
        this.priceRange = priceRange;
        this.sideBarEl = sideBar;
        this.sliderEl = sliderElement;
        this.sliderWidth = this.sliderEl.clientWidth;

        this.leftProcent = 0;
        this.rightProcent = 0;
        this.leftPrice = 0;
        this.rightPrice = 0;
        this.priceNumber = 500;

        this.leftDote = new Dote(leftDote, 'left' );
        this.rightDote = new Dote(rightDote, 'right');

        this.setListener();
        this.setDotePosition();
        this.setPriceRange();
        this.setDefaultValues();
    }

    private onDoteMove (e: PointerEvent) {
        if(this.leftDote.pointerDown) {
            this.leftDoteMove(e);
        } else if(this.rightDote.pointerDown) {
            this.rightDoteMove(e);
        }
    }

    private leftDoteMove (e: PointerEvent) {
        const leftDote = this.leftDote.dote;

        const sliderEl = this.sliderEl;
        const rightDote = this.rightDote.dote;

        leftDote.style.left = `${e.clientX - leftDote.clientWidth/2}px`;

        if(leftDote.offsetLeft < sliderEl.offsetLeft) {
            leftDote.style.left = `${sliderEl.offsetLeft}px`
        } else if((leftDote.offsetLeft + leftDote.clientWidth) > rightDote.offsetLeft) {
            leftDote.style.left = `${rightDote.offsetLeft - leftDote.clientWidth}px`
        }

        this.setPriceRange();

        this.calcLeftProcentFromSubNUm(this.priceRange.offsetLeft - this.sliderEl.offsetLeft);
        this.calcLeftPrice();
        
        e.preventDefault();
    }

    private rightDoteMove (e: PointerEvent) {
        const leftDote = this.leftDote.dote;
        const sliderEl = this.sliderEl;
        const rightDote = this.rightDote.dote;

        rightDote.style.left = `${e.clientX - rightDote.clientWidth/2}px`

        if((rightDote.offsetLeft + rightDote.clientWidth) > (sliderEl.offsetLeft + sliderEl.offsetWidth)) {
            rightDote.style.left = `${sliderEl.offsetLeft + sliderEl.offsetWidth - rightDote.clientWidth}px`
        } else if((leftDote.offsetLeft + leftDote.clientWidth) > rightDote.offsetLeft) {
            rightDote.style.left = `${leftDote.offsetLeft + leftDote.clientWidth}px`
        }

        this.setPriceRange();

        this.calcRightProcentFromSubNUm(this.priceRange.offsetLeft + this.priceRange.clientWidth - this.sliderEl.offsetLeft);
        this.calcRightPrice();

        e.preventDefault();
    }

    private onpointerUp(e: PointerEvent) {
        this.leftDote.pointerDown = false;
        this.rightDote.pointerDown = false;
    }

    private calcLeftProcentFromSubNUm (subNUm: number) {
        const res = subNUm/this.sliderEl.clientWidth * 100;

        if(res <= 0) {
            this.leftProcent = 0;
        } else {
            this.leftProcent = res;
        }
    }

    private calcRightProcentFromSubNUm (subNUm: number) {
        const res = subNUm/this.sliderEl.clientWidth * 100;

        if(res >= 100) {
            this.rightProcent = 100;
        } else {
            this.rightProcent = res;
        }
    }

    private calcLeftPrice() {
        const resString = (this.priceNumber * (this.leftProcent/100)).toPrecision(4);
        const res: number = Number(resString); 
        this.leftPrice = res;
    }

    private calcRightPrice() {
        const resString = (this.priceNumber * (this.rightProcent/100)).toPrecision(4);
        const res: number = Number(resString); 
        this.rightPrice = res;
    }

    private setPriceRange() {
        this.priceRange.style.left = `${this.leftDote.dote.offsetLeft}px`;
        this.priceRange.style.width = `${(this.rightDote.dote.offsetLeft + this.rightDote.dote.offsetWidth) - this.leftDote.dote.offsetLeft}px`;
    }



    set setPriceNumber (num: number) {
        this.priceNumber = num;
    }

    get getLeftPrice () {
        return this.leftPrice;
    }

    get getRightPrice () {
        return this.rightPrice;
    }

    get getPriceRange() {
        return this.priceNumber;
    }


    private setListener () {
        this.sideBarEl.onpointermove = this.onDoteMove.bind(this);
        this.sideBarEl.onpointerup = this.onpointerUp.bind(this);
        this.sideBarEl.onpointerleave = this.onpointerUp.bind(this);
    }

    private setDotePosition () {
        this.leftDote.dote.style.left =`${this.sliderEl.offsetLeft}px`;
        this.rightDote.dote.style.left = `${this.sliderWidth}px`;
    }

    private setDefaultValues () {
        this.calcLeftProcentFromSubNUm(this.priceRange.offsetLeft - this.sliderEl.offsetLeft);
        this.calcRightProcentFromSubNUm(this.priceRange.offsetLeft + this.priceRange.clientWidth - this.sliderEl.offsetLeft);
        
        this.calcLeftPrice();
        this.calcRightPrice();
    }
}

export type typeSlider = InstanceType<typeof Slider>;