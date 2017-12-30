class Vec2 {
    public static readonly DOWN = new Vec2(0, -1);
    public static readonly LEFT = new Vec2(-1, 0);
    public static readonly ONE = new Vec2(1, 1);
    public static readonly RIGHT = new Vec2(1, 0);
    public static readonly UP = new Vec2(0, 1);
    public static readonly ZERO = new Vec2(0, 0);

    public x: number;
    public y: number;

    // TODO: static API?
    
    public static fromArray (v: [number]): Vec2 {
        return new Vec2(v[0], v[1]);
    }

    public static fromJSON (v: {x: number, y: number}): Vec2 {
        return new Vec2(v.x, v.y);
    }

    public constructor (x = 0, y = 0) {
        this.x = x; this.y = y;
    }

    public set (x = 0, y = 0): Vec2 {
        this.x = x; this.y = y;
        return this;
    }

    public add (v: Vec2): Vec2 {
        this.x += v.x; this.y += v.y;
        return this;
    }

    public add2 (a: Vec2, b: Vec2): Vec2 {
        this.x = a.x + b.x; this.y = a.y + b.y;
        return this;
    }

    public subtract (v: Vec2): Vec2 {
        this.x -= v.x; this.y -= v.y;
        return this;
    }

    public multiply (v: Vec2): Vec2 {
        this.x *= v.x; this.y *= v.y;
        return this;
    }

    scale (c: number): Vec2 {
        this.x *= c; this.y *= c;
        return this;
    }

    magnitude (): number {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    magnitudeSquared (): number {
        return this.x*this.x + this.y*this.y;
    }

    lerp (v: Vec2, alpha: number): Vec2 {
        // TODO
        return this;
    }

    normalize (): Vec2 {
        // TODO
        return this;
    }

    toArray (): [number] {
        return [this.x, this.y];
    }

    toString (): string {
        return `[${this.x},${this.y}]`;
    }
}