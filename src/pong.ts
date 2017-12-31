import Application from "./core/application";
import Vec2 from "./math/vec2";

export default class Pong extends Application {
    private context: CanvasRenderingContext2D;

    private ballSpeed: number;
    private ballRadius: number;
    private previousBallPosition: Vec2;
    private ballPosition: Vec2;
    private ballVelocity: Vec2;

    constructor (canvas: HTMLCanvasElement) {
        super (canvas);

        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;

        let context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("unable to create canvas context");
        }
        this.context = context;

        this.ballSpeed = 80;
        this.ballRadius = 10;
        this.ballPosition = new Vec2(innerWidth / 2, innerHeight / 2);
        this.previousBallPosition = this.ballPosition.copy();
        this.ballVelocity = new Vec2();
    }

    protected update (delta: number): void {
        super.update(delta);

        let newBallVelocity = new Vec2();
        if (this.keyboard.isPressed(this.keyboard.key.W)) {
            newBallVelocity.add(new Vec2(0, -this.ballSpeed));
        }
        if (this.keyboard.isPressed(this.keyboard.key.S)) {
            newBallVelocity.add(new Vec2(0, this.ballSpeed));
        }
        if (this.keyboard.isPressed(this.keyboard.key.A)) {
            newBallVelocity.add(new Vec2(-this.ballSpeed, 0));
        }
        if (this.keyboard.isPressed(this.keyboard.key.D)) {
            newBallVelocity.add(new Vec2(this.ballSpeed, 0));
        }
        this.ballVelocity = newBallVelocity;

        this.previousBallPosition = this.ballPosition.copy();
        this.ballPosition
            .add(this.ballVelocity
                    .copy()
                    .scale(delta));
    }

    protected render (alpha: number): void {
        // TODO: webgl renderer
        // TODO: interpolation
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let interpolatedPosition = this.previousBallPosition.copy()
            .lerp(this.ballPosition, alpha);

        this.context.fillRect(
            interpolatedPosition.x - this.ballRadius,
            interpolatedPosition.y - this.ballRadius,
            2*this.ballRadius,
            2*this.ballRadius);
    }
}