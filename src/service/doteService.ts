export class Dote {
    public dote: HTMLDivElement;
    public pointerDown: boolean;
    public name: string;

    constructor(dote: HTMLDivElement, name: string) {
        this.dote = dote;
        this.pointerDown = false;
        this.name = name;

        this.setListeners();
    }

    protected onPointerDown() {
        this.pointerDown = true;
    }

    protected onPointerMove (e: PointerEvent) {
        e.preventDefault();
    }
  
    private setListeners () {
        this.dote.onpointerdown = this.onPointerDown.bind(this);
        this.dote.onpointermove = this.onPointerMove.bind(this);
    }

}