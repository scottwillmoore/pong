// TODO: refine context menu and poitner lock interface
// TODO: implement event system
// TODO: write tests
// NOTE: should getDuration be replaced with getPressDuration, getReleaseDuration...

class Mouse {
    public readonly button = Button;

    private element: Element;

    private mouseDownHandler: EventListener;
    private mouseUpHandler: EventListener;
    private mouseMoveHandler: EventListener;
    private mouseWheelHandler: EventListener;
    private contextMenuHandler: EventListener;

    private buttons: { [key: number]: boolean; };
    private lastButtons: { [key: number]: boolean; };
    private buttonDurations: { [key: number]: number; };

    private contextMenu: boolean;
    private pointerLock: boolean;

    private preventDefault: boolean;
    private stopPropagation: boolean;

    public constructor (element: Element) {
        this.element = null;

        this.mouseDownHandler = this.handleMouseDown.bind(this);
        this.mouseUpHandler = this.handleMouseUp.bind(this);
        this.mouseMoveHandler = this.handleMouseMove.bind(this);
        this.handleMouseWheel = this.handleMouseWheel.bind(this);
        this.contextMenuHandler = this.handleContextMenu.bind(this);

        this.buttons = {};
        this.lastButtons = {};
        this.buttonDurations = {};

        this.contextMenu = false;
        this.pointerLock = false;

        this.preventDefault = false;
        this.stopPropagation = false;

        this.attach(element);
    }

    public attach (element: Element): void {
        if (this.element) {
            this.detatch();
        }
        this.element = element;
        this.element.addEventListener("mousedown", this.mouseDownHandler);
        this.element.addEventListener("mouseup", this.mouseUpHandler);
        this.element.addEventListener("mousemove", this.mouseMoveHandler);
        this.element.addEventListener("mousewheel", this.mouseWheelHandler);
        this.element.addEventListener("contextmenu", this.contextMenuHandler);
    }

    public detatch (): void {
        this.element.removeEventListener("mousedown", this.mouseDownHandler);
        this.element.removeEventListener("mouseup", this.mouseUpHandler);
        this.element.removeEventListener("mousemove", this.mouseMoveHandler);
        this.element.removeEventListener("mousewheel", this.mouseWheelHandler);
        this.element.removeEventListener("contextmenu", this.contextMenuHandler);
        this.element = null;
    }

    public update (dt: number): void {
        let button;
        for (button in this.lastButtons) {
            this.lastButtons[button] = undefined;
        }
        for (button in this.buttons) {
            this.lastButtons[button] = this.buttons[button];
        }
    }

    public setContextMenu (state: boolean): void {
        this.contextMenu = state;
    }

    public setPointerLock (state: boolean): void {
        if (state) {
            this.element.requestPointerLock();
        } else {
            if (document.pointerLockElement) {
                document.exitPointerLock();
            }
        }
    }

    public isPressed (button: number): boolean {
        return !!this.buttons[button];
    }

    public wasPressed (button: number): boolean {
        return !!this.buttons[button] && !!!this.lastButtons[button];
    }

    public wasReleased (button: number): boolean {
        return !!!this.buttons[button] && !!this.lastButtons[button];
    }

    public getDuration (button: number): number {
        if (this.buttonDurations[button]) {
            return this.buttonDurations[button];
        }
        return 0;
    }

    private handleMouseDown (event: MouseEvent): void {
        this.buttons[event.button] = true;
        this.buttonDurations[event.button] = performance.now();

        if (this.preventDefault) {
            event.preventDefault();
        }
        if (this.stopPropagation) {
            event.stopPropagation();
        }
    }

    private handleMouseUp (event: MouseEvent): void {
        this.buttons[event.button] = undefined;
        this.buttonDurations[event.button] = performance.now();

        if (this.preventDefault) {
            event.preventDefault();
        }
        if (this.stopPropagation) {
            event.stopPropagation();
        }
    }

    private handleMouseMove (event: MouseEvent): void {
        // TODO
    }

    private handleMouseWheel (event: MouseEvent): void {
        // TODO
    }

    private handleContextMenu (event: MouseEvent): void {
        if (!this.contextMenu) {
            event.preventDefault();
        }
    }
}