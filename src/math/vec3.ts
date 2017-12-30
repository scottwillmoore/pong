import Vec2 from "./Vec2";

export default class Vec3 {
    public static readonly X = new Vec3(1, 0, 0);
    public static readonly Y = new Vec3(0, 1, 0);
    public static readonly Z = new Vec3(0, 0, 1);
    public static readonly ONE = new Vec3(1, 1, 1);
    public static readonly ZERO = new Vec3(0, 0, 0);

    public x: number;
    public y: number;
    public z: number;

    public static fromVec2 (vector: Vec2): Vec3 {
        return new Vec3(vector.x, vector.y);
    }

    public static fromVec3 (vector: Vec3): Vec3 {
        return new Vec3(vector.x, vector.y, vector.z);
    }

    public static fromArray (array: [number, number, number]): Vec3 {
        if (array.length > 2) {
            return new Vec3(array[0], array[1], array[2]);
        } else if (array.length > 1) {
            return new Vec3(array[0], array[1]);
        } else if (array.length > 0) {
            return new Vec3(array[0]);
        }
        return new Vec3();
    }

    public static fromObject (object: { x: number, y: number, z: number }): Vec3 {
        return new Vec3(object.x, object.y, object.z);
    }

    public constructor (x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}