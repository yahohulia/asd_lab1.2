export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class Triangle {
    a: Point;
    b: Point;
    c: Point;
    constructor(a: Point, b: Point, c: Point);
    static generateRandom(): Triangle;
    getPerimeter(): number;
    getArea(): number;
    /** Повертає 3 внутрішні кути (в градусах). */
    getAngles(): [number, number, number];
    getMaxAngle(): number;
    private static safeAcosDeg;
    toString(): string;
}
export declare class HashTableL1 {
    protected table: (Triangle | null)[];
    protected size: number;
    constructor(size: number);
    protected hash(key: number): number;
    insert(item: Triangle): boolean;
    print(title: string): void;
}
//# sourceMappingURL=level1.d.ts.map