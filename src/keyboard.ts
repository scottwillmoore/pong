// NOTE: two alternative Key implementations below...
// TODO: implement way to track key durations...

class Key {
    public readonly A = "KeyA";
    public readonly D = "KeyD";
    public readonly S = "KeyS";
    public readonly W = "KeyW";
    public readonly NUM_1 = "Digit1";
    public readonly ARROW_UP = "ArrowUp";
    // TODO: 
}

class Keyboard {
    public readonly Key: Key = new Key();

    private element: Element;

    private keyDownHandler: EventListener;
    private keyUpHandler: EventListener;
    private keyPressHandler: EventListener;

    private keys: { [key: string]: boolean; };
    private lastKeys: { [key: string]: boolean; };
    private keyDurations: { [key: string]: number; };

    private preventDefault: boolean;
    private stopPropagation: boolean;

    constructor (element: Element) {
        this.element = null;

        this.keyDownHandler = this.handleKeyDown.bind(this);
        this.keyUpHandler = this.handleKeyDown.bind(this);
        this.keyPressHandler = this.handleKeyPress.bind(this);

        this.keys = {};
        this.lastKeys = {};
        this.keyDurations = {};

        this.preventDefault = false;
        this.stopPropagation = false;

        this.attach(element);
    }

    public attach (element: Element): void {
        if (this.element) {
            this.detatch();
        }
        this.element = element;
        this.element.addEventListener("keydown", this.keyDownHandler);
        this.element.addEventListener("keyup", this.keyUpHandler);
        this.element.addEventListener("keypress", this.keyPressHandler);
    }

    public detatch (): void {
        this.element.removeEventListener("keydown", this.keyDownHandler);
        this.element.removeEventListener("keyup", this.keyUpHandler);
        this.element.removeEventListener("keypress", this.keyPressHandler);
        this.element = null;
    }

    public update (dt: number): void {
        let key;
        for (key in this.lastKeys) {
            this.lastKeys[key] = undefined;
        }
        for (key in this.keys) {
            this.lastKeys[key] = this.keys[key];
        }
    }

    public isPressed (key: number): boolean {
        return !!this.keys[key];
    }

    public wasPressed (key: number): boolean {
        return !!this.keys[key] && !!!this.lastKeys[key];
    }

    public wasReleased (key: number): boolean {
        return !!!this.keys[key] && !!this.lastKeys[key];
    }

    private handleKeyDown (event: KeyboardEvent): void {
        this.keys[event.code] = true;

        if (this.preventDefault) {
            event.preventDefault();
        }
        if (this.stopPropagation) {
            event.stopPropagation();
        }
    }

    private handleKeyUp (event: KeyboardEvent): void {
        this.keys[event.code] = undefined;

        if (this.preventDefault) {
            event.preventDefault();
        }
        if (this.stopPropagation) {
            event.stopPropagation();
        }
    }

    private handleKeyPress (event: KeyboardEvent): void {
        // TODO: not used!

        if (this.preventDefault) {
            event.preventDefault();
        }
        if (this.stopPropagation) {
            event.stopPropagation();
        }
    }
}

module Keyboard {
    export enum Key {
        A = "KeyA",
    }
}

export default Keyboard;