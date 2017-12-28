import { Ball } from "./ball";
import { Vector2 } from "./math";
import { Keyboard, Key } from "./input";

export class Pong {
    protected step: number;
    protected previous: number;
    protected accumulator: number;

    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;

    protected ball: Ball;

    constructor () {
        this.step = 1/20;
        this.previous = performance.now();
        this.accumulator = 0;

        this.canvas = document.getElementsByTagName("canvas")[0];
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        let context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("unable to create canvas context");
        }
        this.context = context;

        this.ball = new Ball();
        this.ball.pos = new Vector2(innerWidth / 2, innerHeight / 2);

        addEventListener("resize", this.resize.bind(this));
        requestAnimationFrame(this.tick.bind(this));
    }

    tick (now: number): void {
        let dt = (now - this.previous) / 1000;
        this.accumulator += dt;
        this.previous = now;

        while (this.accumulator > this.step) {
            this.accumulator -= this.step;
            this.update(this.step);
        }

        let alpha = this.accumulator / this.step;
        this.render(alpha);

        requestAnimationFrame(this.tick.bind(this));
    }

    resize (): void {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
    }

    update (delta: number): void {
        let speed = 50*delta;
        let vel = new Vector2();
        if (Keyboard.isPressed(Key.W)) vel.addv(new Vector2(0, -speed));
        if (Keyboard.isPressed(Key.S)) vel.addv(new Vector2(0, speed));
        // if (this.keyboard.isPressed(Key.A)) vel.addv(new Vector2(-speed, 0));
        // if (this.keyboard.isPressed(Key.D)) vel.addv(new Vector2(speed, 0));
        this.ball.vel = vel;

        // console.log({
        //     up: this.keyboard.isPressed(Key.UP),
        //     down: this.keyboard.isPressed(Key.DOWN),
        //     left: this.keyboard.isPressed(Key.LEFT),
        //     right: this.keyboard.isPressed(Key.RIGHT)
        // });

        this.ball.update(delta);
    }

    render (alpha: number): void {
        // TODO: webgl renderer
        // TODO: interpolation
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let radius = 10;
        this.context.fillRect(
            this.ball.pos.x - radius,
            this.ball.pos.y - radius,
            2*radius,
            2*radius
        );
    }
}