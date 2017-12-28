// NOTE: could split this into multiple files...

interface Vector<T> {
    add (x: number, y: number): T;
    addv (v: T): T;

    sub (x: number, y: number): T;
    subv (v: T): T;

    mul (x: number, y: number): T;
    mulv (v: T): T;

    scl (c: number): T;

    cpy (): T;

    len (): number;

    dst (x: number, y: number): number;
    dstv (v: T): number;

    // lerp (v: T, alpha: number): T;
    // dot, cross, angle, normal, etc...
}

export class Vector2 implements Vector<Vector2> {
    static ZERO = new Vector2(0, 0);

    constructor (
        public x = 0,
        public y = 0,
    ) {}

    add (x: number, y: number): Vector2 {
        this.x += x;
        this.y += y;
        return this;
    }
    addv (v: Vector2): Vector2 {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub (x: number, y: number): Vector2 {
        this.x -= x;
        this.y -= y;
        return this;
    }
    subv (v: Vector2): Vector2 {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mul (x: number, y: number): Vector2 {
        this.x *= x;
        this.y *= y;
        return this;
    }
    mulv (v: Vector2): Vector2 {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    scl (c: number): Vector2 {
        this.x *= c;
        this.y *= c;
        return this;
    }

    cpy (): Vector2 {
        return new Vector2(this.x, this.y);
    }

    len (): number {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    dst (x: number, y: number): number {
        let dx = this.x - x;
        let dy = this.y - y;
        return Math.sqrt(dx*dx + dy*dy);
    }
    dstv (v: Vector2): number {
        let dx = this.x - v.x;
        let dy = this.y - v.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
}

export class Vector3 {
    constructor (
        public x = 0,
        public y = 0,
        public z = 0,
    ) {}
}

export class Vector4 {}

export class Matrix2 {}

export class Matrix3 {}

export class Matrix4 {}