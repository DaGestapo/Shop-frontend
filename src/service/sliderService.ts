

export class Slider {
    protected element: HTMLElement;
    protected isMouseDown: boolean;
    protected pointerDownPosition: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.isMouseDown = false;
        this.pointerDownPosition = 0;
    }

    protected setListener (
        pointerMove: (e: PointerEvent) => void
    ) {
        this.element.onpointerdown = this.pointerDown.bind(this);
        this.element.onpointerup = this.poinerUp.bind(this);
        this.element.onpointermove = pointerMove.bind(this);
    }

    protected removeListener () {
        this.element.onpointerdown = null;
        this.element.onpointerup = null;
        this.element.onpointermove = null;
    }

    private pointerDown (e: MouseEvent) {
        this.isMouseDown = true;
        this.pointerDownPosition = e.clientX;
    }

    private poinerUp () {
        this.isMouseDown = false;
        this.pointerDownPosition = 0;
    }


}