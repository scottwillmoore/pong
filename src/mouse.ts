// TODO: implement. see keyboard.ts for reference

class Mouse {
    private element: Element;

    private mouseDownHandler: EventListener;
    private mouseUpHandler: EventListener;
    private mouseMoveHandler: EventListener;
    private mouseWheelHandler: EventListener;

    private buttons: { [key: number]: boolean; };
    private lastButtons: { [key: number]: boolean; };
    private buttonDurations: { [key: number]: number; };

    private preventDefault: boolean;
    private stopPropagation: boolean;

    constructor (element: Element);

    public attach (element: Element): void;
    public detatch (): void;

    public update (dt: number): void;

    public setContextMenu (state: boolean): void;
    public setPointerLock (state: boolean): void;

    public isPressed (button: number): boolean;

    public wasPressed (button: number): boolean;
    public wasReleased (button: number): boolean;

    private handleMouseDown (e: MouseEvent): void;
    private handleMouseUp (e: MouseEvent): void;
    private handleMouseMove (e: MouseEvent): void;
    private handleMouseWheel (e: MouseEvent): void;
}