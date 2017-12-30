// TODO: polyfill KeyboardEvent.code
// TODO: implement event system
// TODO: write tests
// NOTE: should getDuration be replaced with getPressDuration, getReleaseDuration...

export default class Keyboard {
    public readonly key = new class Key {
        public readonly A = "KeyA";
        public readonly ALT_LEFT = "AltLeft";
        public readonly ALT_RIGHT = "AltRight";
        public readonly ARROW_DOWN = "ArrowDown";
        public readonly ARROW_LEFT = "ArrowLeft";
        public readonly ARROW_RIGHT = "ArrowRight";
        public readonly ARROW_UP = "ArrowUp";
        public readonly B = "KeyB";
        public readonly BACKQUOTE = "Backquote";
        public readonly BACKSLASH = "Backslash";
        public readonly BACKSPACE = "Backspace";
        public readonly BRACKET_LEFT = "BracketLeft";
        public readonly BRACKET_RIGHT = "BRACKET_RIGHT";
        public readonly C = "KeyC";
        public readonly CAPS_LOCK = "CapsLock";
        public readonly COMMA = "Comma";
        public readonly CONTEXT_MENU = "ContextMenu";
        public readonly CONTROL_LEFT = "ControlLeft";
        public readonly CONTROL_RIGHT = "ControlRight";
        public readonly D = "KeyD";
        public readonly E = "KeyE";
        public readonly ENTER = "Enter";
        public readonly EQUAL = "Equal";
        public readonly ESCAPE = "Escape";
        public readonly F = "KeyF";
        public readonly F1 = "F1";
        public readonly F10 = "F10";
        public readonly F11 = "F11";
        public readonly F12 = "F12";
        public readonly F2 = "F2";
        public readonly F3 = "F3";
        public readonly F4 = "F4";
        public readonly F5 = "F5";
        public readonly F6 = "F6";
        public readonly F7 = "F7";
        public readonly F8 = "F8";
        public readonly F9 = "F9";
        public readonly G = "KeyG";
        public readonly H = "KeyH";
        public readonly I = "KeyI";
        public readonly J = "KeyJ";
        public readonly K = "KeyK";
        public readonly L = "KeyL";
        public readonly M = "KeyM";
        public readonly META_LEFT = "MetaLeft";
        public readonly META_RIGHT = "MetaRight";
        public readonly MINUS = "Minus";
        public readonly N = "KeyN";
        public readonly NUMPAD_0 = "Numpad0";
        public readonly NUMPAD_1 = "Numpad1";
        public readonly NUMPAD_2 = "Numpad2";
        public readonly NUMPAD_3 = "Numpad3";
        public readonly NUMPAD_4 = "Numpad4";
        public readonly NUMPAD_5 = "Numpad5";
        public readonly NUMPAD_6 = "Numpad6";
        public readonly NUMPAD_7 = "Numpad7";
        public readonly NUMPAD_8 = "Numpad8";
        public readonly NUMPAD_9 = "Numpad9";
        public readonly NUMPAD_ADD = "NumpadAdd";
        public readonly NUMPAD_COMMA = "NumpadComma";
        public readonly NUMPAD_DECIMAL = "NumpadDecimal";
        public readonly NUMPAD_DIVIDE = "NumpadDivide";
        public readonly NUMPAD_ENTER = "NumpadEnter";
        public readonly NUMPAD_EQUAL = "NumpadEqual";
        public readonly NUMPAD_MULTIPLY = "NumpadMultiply";
        public readonly NUMPAD_SUBTRACT = "NumpadSubtract";
        public readonly NUM_0 = "Digit0";
        public readonly NUM_1 = "Digit1";
        public readonly NUM_2 = "Digit2";
        public readonly NUM_3 = "Digit3";
        public readonly NUM_4 = "Digit4";
        public readonly NUM_5 = "Digit5";
        public readonly NUM_6 = "Digit6";
        public readonly NUM_7 = "Digit7";
        public readonly NUM_8 = "Digit8";
        public readonly NUM_9 = "Digit9";
        public readonly NUM_LOCK = "NumLock";
        public readonly O = "KeyO";
        public readonly P = "KeyP";
        public readonly PERIOD = "Period";
        public readonly PRINT_SCREEN = "PrintScreen";
        public readonly Q = "KeyQ";
        public readonly QUOTE = "Quote";
        public readonly R = "KeyR";
        public readonly S = "KeyS";
        public readonly SCROLL_LOCK = "ScrollLock";
        public readonly SEMICOLON = "Semicolon";
        public readonly SHIFT_LEFT = "ShiftLeft";
        public readonly SHIFT_RIGHT = "ShiftRight";
        public readonly SLASH = "Slash";
        public readonly SPACE = "Space";
        public readonly T = "KeyT";
        public readonly TAB = "Tab";
        public readonly U = "KeyU";
        public readonly V = "KeyV";
        public readonly W = "KeyW";
        public readonly X = "KeyX";
        public readonly Y = "KeyY";
        public readonly Z = "KeyZ";
    }

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