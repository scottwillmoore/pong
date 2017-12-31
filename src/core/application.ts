import Keyboard from "../input/keyboard";
import Mouse from "../input/mouse";

export default class Application {
    protected canvas: HTMLCanvasElement;

    protected keyboard: Keyboard;
    protected mouse: Mouse;

    private fixedUpdateStep: number;
    private previousTimestamp: number;
    private timestampAccumulator: number;

    private tickHandler: FrameRequestCallback;
    private resizeHandler: EventListener;

    constructor (canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.keyboard = new Keyboard(document.body);
        this.mouse = new Mouse(document.body);

        this.fixedUpdateStep = 1/20;
        this.previousTimestamp = performance.now();
        this.timestampAccumulator = 0;

        this.tickHandler = this.handleTick.bind(this);
        this.resizeHandler = this.handleResize.bind(this);

        addEventListener("resize", this.resizeHandler);

        requestAnimationFrame(this.tickHandler);
    }

    protected update (delta: number): void {
        this.keyboard.update(delta);
        this.mouse.update(delta);
    }

    protected render (alpha: number): void {
    }

    private handleTick (timestamp: number): void {
        let delta = (timestamp - this.previousTimestamp) / 1000;
        this.timestampAccumulator += delta;
        this.previousTimestamp = timestamp;

        while (this.timestampAccumulator > this.fixedUpdateStep) {
            this.timestampAccumulator -= this.fixedUpdateStep;
            this.update(this.fixedUpdateStep);
        }

        let alpha = this.timestampAccumulator / this.fixedUpdateStep;
        this.render(alpha);

        requestAnimationFrame(this.tickHandler);
    }

    private handleResize (event: UIEvent): void {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
    }

}