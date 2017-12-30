import Vec3 from "./vec3";

export default class Vec2 {
    public static readonly X = new Vec2(1, 0);
    public static readonly Y = new Vec2(0, 1);
    public static readonly ZERO = new Vec2(0, 0);
    public static readonly ONE = new Vec2(1, 1);

    public x: number;
    public y: number;

    public static fromVec2 (vector: Vec2): Vec2 {
        return new Vec2(vector.x, vector.y);
    }

    public static fromVec3 (vector: Vec3): Vec2 {
        return new Vec2(vector.x, vector.y);
    }

    public static fromArray (array: [number, number]): Vec2 {
        if (array.length > 1) {
            return new Vec2(array[0], array[1]);
        } else if (array.length > 0) {
            return new Vec2(array[0]);
        }
        return new Vec2();
    }

    public static fromObject (object: { x: number, y: number }): Vec2 {
        return new Vec2(object.x, object.y);
    }

    public constructor (x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public copy (): Vec2 {
        return new Vec2(this.x, this.y);
    }

    public toString (): string {
        return "[" + this.x + "," + this.y + "]";
    }

    public toVec3 (): Vec3 {
        return new Vec3(this.x, this.y);
    }

    public toArray (): [number, number] {
        return [this.x, this.y];
    }
    public toObject (): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }

    public add (vector: Vec2): Vec2 {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    public subtract (vector: Vec2): Vec2 {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    public multiply (vector: Vec2): Vec2 {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    }

    public divide (vector: Vec2): Vec2 {
        this.x /= vector.x;
        this.y /= vector.y;
        return this;
    }

    public scale (scalar: number): Vec2 {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    public lerp (vector: Vec2, alpha: number): Vec2 {
        this.x = this.x * (1 - alpha) + vector.x * alpha;
        this.y = this.y * (1 - alpha) + vector.y * alpha;
        return this;
    }

    public normalize (): Vec2 {
        let length = this.length();
        if (length != 0) {
            this.x /= length;
            this.y /= length;
        }
        return this;
    }
    
    public rotate (radians: number): Vec2 {
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        this.x = this.x * cos - this.y * sin;
        this.y = this.x * sin - this.y * cos;
        return this;
    }

    public dot (vector: Vec2): number {
        return this.x * vector.x + this.y * vector.y;
    }

    public cross (vector: Vec2): number {
        return this.x * vector.y - this.y * vector.x;
    }

    public length (): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public length2 (): number {
        return this.x * this.x + this.y * this.y;
    }

    public distance (vector: Vec2): number {
        let dx = this.x - vector.x;
        let dy = this.y - vector.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public distance2 (vector: Vec2): number {
        let dx = this.x - vector.x;
        let dy = this.y - vector.y;
        return dx * dx + dy * dy;
    }

    public angle (): number {
        return Math.atan2(this.y, this.x);
    }
}