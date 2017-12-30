// TODO: polyfill KeyboardEvent.code
// TODO: implement event system
// TODO: write tests
// NOTE: should getDuration be replaced with getPressDuration, getReleaseDuration...

enum Key {
    A = "KeyA",
    D = "KeyD",
    S = "KeyS",
    W = "KeyW",
    NUM_1 = "Digit1",
    ARROW_UP = "ArrowUp",
}

class Keyboard {
    public readonly key = Key;

    private element: Element;

    private keyDownHandler: EventListener;
    private keyUpHandler: EventListener;
    private keyPressHandler: EventListener;

    private keys: { [key: string]: boolean; };
    private lastKeys: { [key: string]: boolean; };
    private keyDurations: { [key: string]: number; };

    private preventDefault: boolean;
    private stopPropagation: boolean;

    public constructor (element: Element) {
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

    public isPressed (key: string): boolean {
        return !!this.keys[key];
    }

    public wasPressed (key: string): boolean {
        return !!this.keys[key] && !!!this.lastKeys[key];
    }

    public wasReleased (key: string): boolean {
        return !!!this.keys[key] && !!this.lastKeys[key];
    }

    public getDuration (key: string): number {
        if (this.keyDurations[key]) {
            return this.keyDurations[key];
        }
        return 0;
    }

    private handleKeyDown (event: KeyboardEvent): void {
        this.keys[event.code] = true;
        if (!event.repeat) {
            this.keyDurations[event.code] = performance.now();
        }

        if (this.preventDefault) {
            event.preventDefault();
        }
        if (this.stopPropagation) {
            event.stopPropagation();
        }
    }

    private handleKeyUp (event: KeyboardEvent): void {
        this.keys[event.code] = undefined;
        if (!event.repeat) {
            this.keyDurations[event.code] = performance.now();
        }

        if (this.preventDefault) {
            event.preventDefault();
        }
        if (this.stopPropagation) {
            event.stopPropagation();
        }
    }

    private handleKeyPress (event: KeyboardEvent): void {
        // TODO

        if (this.preventDefault) {
            event.preventDefault();
        }
        if (this.stopPropagation) {
            event.stopPropagation();
        }
    }
}