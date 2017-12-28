import { Vector2 } from "./math";

export class Ball {
    public pos: Vector2;
    public vel: Vector2;
    public acc: Vector2;

    constructor () {
        this.pos = new Vector2();
        this.vel = new Vector2();
        this.acc = new Vector2();
    }

    update (delta: number): void {
        this.vel.addv(this.acc);
        this.pos.addv(this.vel);
    }
}