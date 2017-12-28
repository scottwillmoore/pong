export enum Key {
    UNIDENTIFIED = "Unidentified",

    A = "KeyA", B = "KeyB", C = "KeyC", D = "KeyD", E = "KeyE", F = "KeyF",
    G = "KeyG", H = "KeyH", I = "KeyI", J = "KeyJ", K = "KeyK", L = "KeyL",
    M = "KeyM", N = "KeyN", O = "KeyO", P = "KeyP", Q = "KeyQ", R = "KeyR",
    S = "KeyS", T = "KeyT", U = "KeyU", V = "KeyV", W = "KeyW", X = "KeyX",
    Y = "KeyY", Z = "KeyZ",

    BACKQUOTE = "Backquote", BACKSLASH = "Backslash",
    BRACKET_LEFT = "BracketLeft", BRACKET_RIGHT = "BRACKET_RIGHT",
    COMMA = "Comma", EQUAL = "Equal", MINUS = "Minus", PERIOD = "Period",
    QUOTE = "Quote", SEMICOLON = "Semicolon", SLASH = "Slash",

    NUM_0 = "Digit0", NUM_1 = "Digit1", NUM_2 = "Digit2", NUM_3 = "Digit3",
    NUM_4 = "Digit4", NUM_5 = "Digit5", NUM_6 = "Digit6", NUM_7 = "Digit7",
    NUM_8 = "Digit8", NUM_9 = "Digit9",

    F1 = "F1", F2 = "F2", F3 = "F3", F4 = "F4", F5 = "F5", F6 = "F6",
    F7 = "F7", F8 = "F8", F9 = "F9", F10 = "F10", F11 = "F11", F12 = "F12",

    ALT_LEFT = "AltLeft", ALT_RIGHT = "AltRight",
    CONTROL_LEFT = "ControlLeft", CONTROL_RIGHT = "ControlRight",
    SHIFT_LEFT = "ShiftLeft", SHIFT_RIGHT = "ShiftRight",

    BACKSPACE = "Backspace", ENTER = "Enter", ESCAPE = "Escape",
    SPACE = "Space", TAB = "Tab",

    ARROW_DOWN = "ArrowDown", ARROW_LEFT = "ArrowLeft",
    ARROW_RIGHT = "ArrowRight", ARROW_UP = "ArrowUp",

    NUMPAD_0 = "Numpad0", NUMPAD_1 = "Numpad1", NUMPAD_2 = "Numpad2",
    NUMPAD_3 = "Numpad3", NUMPAD_4 = "Numpad4", NUMPAD_5 = "Numpad5",
    NUMPAD_6 = "Numpad6", NUMPAD_7 = "Numpad7", NUMPAD_8 = "Numpad8",
    NUMPAD_9 = "Numpad9",

    NUMPAD_ADD = "NumpadAdd", NUMPAD_COMMA = "NumpadComma",
    NUMPAD_DECIMAL = "NumpadDecimal", NUMPAD_DIVIDE = "NumpadDivide",
    NUMPAD_ENTER = "NumpadEnter", NUMPAD_EQUAL = "NumpadEqual",
    NUMPAD_MULTIPLY = "NumpadMultiply", NUMPAD_SUBTRACT = "NumpadSubtract",

    DELETE = "Delete", END = "End", HOME = "Home", INSERT = "Insert",
    PAGE_DOWN = "PageDown", PAGE_UP = "PageUp",
    
    CAPS_LOCK = "CapsLock", NUM_LOCK = "NumLock",
    PRINT_SCREEN = "PrintScreen", SCROLL_LOCK = "ScrollLock",
}

class Keyboard {
    protected buffer: { [key: string]: boolean; };

    constructor () {
        this.buffer = {};
        addEventListener("keyup", (e) => this.handle(e.code, false ));
        addEventListener("keydown", (e) => this.handle(e.code, true ));
    }

    protected handle (code: string, state: boolean): void {
        this.buffer[code] = state;
    }

    isPressed (key: Key): boolean {
        if (this.buffer[key] == undefined) {
            return false;
        }
        return this.buffer[key];
    }
}

let keyboard = new Keyboard();
export { keyboard as Keyboard };