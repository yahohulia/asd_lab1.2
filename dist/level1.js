export class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}
function triangleAreaSigned(a, b, c) {
    return 0.5 * ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
}
export class Triangle {
    a;
    b;
    c;
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        const areaAbs = Math.abs(triangleAreaSigned(a, b, c));
        if (areaAbs < 1e-9) {
            throw new Error("Трикутник вироджений (точки колінеарні або збігаються).");
        }
    }
    static generateRandom() {
        const rnd = () => Math.floor(Math.random() * 100);
        while (true) {
            try {
                return new Triangle(new Point(rnd(), rnd()), new Point(rnd(), rnd()), new Point(rnd(), rnd()));
            }
            catch {
                // пробуємо ще раз
            }
        }
    }
    getPerimeter() {
        return dist(this.a, this.b) + dist(this.b, this.c) + dist(this.c, this.a);
    }
    getArea() {
        return Math.abs(triangleAreaSigned(this.a, this.b, this.c));
    }
    /** Повертає 3 внутрішні кути (в градусах). */
    getAngles() {
        const ab = dist(this.a, this.b);
        const bc = dist(this.b, this.c);
        const ca = dist(this.c, this.a);
        const angleA = Triangle.safeAcosDeg((ab * ab + ca * ca - bc * bc) / (2 * ab * ca));
        const angleB = Triangle.safeAcosDeg((ab * ab + bc * bc - ca * ca) / (2 * ab * bc));
        const angleC = 180 - angleA - angleB;
        return [angleA, angleB, angleC];
    }
    getMaxAngle() {
        const [A, B, C] = this.getAngles();
        return Math.max(A, B, C);
    }
    static safeAcosDeg(x) {
        const clamped = Math.min(1, Math.max(-1, x));
        return (Math.acos(clamped) * 180) / Math.PI;
    }
    toString() {
        const [A, B, C] = this.getAngles();
        return `Трикутник[(${this.a.x},${this.a.y})-(${this.b.x},${this.b.y})-(${this.c.x},${this.c.y})], S:${this.getArea().toFixed(2)}, P:${this.getPerimeter().toFixed(2)}, кути:${A.toFixed(1)}°/${B.toFixed(1)}°/${C.toFixed(1)}°`;
    }
}
export class HashTableL1 {
    table;
    size;
    constructor(size) {
        this.size = size;
        this.table = new Array(size).fill(null);
    }
    // Метод хешування: Ділення (h(k) = k mod m)
    hash(key) {
        const intKey = Math.floor(key);
        return ((intKey % this.size) + this.size) % this.size;
    }
    insert(item) {
        const h = this.hash(item.getPerimeter());
        if (this.table[h] === null) {
            this.table[h] = item;
            return true;
        }
        return false; // колізія не вирішується (рівень 1)
    }
    print(title) {
        console.log(`\n--- ${title} ---`);
        console.log("idx | key(P)      | element");
        console.log("----+------------+------------------------------");
        for (let i = 0; i < this.size; i++) {
            const item = this.table[i];
            if (!item) {
                console.log(`${i.toString().padEnd(3)} | ${"-".padEnd(10)} | Порожньо`);
            }
            else {
                const key = item.getPerimeter();
                console.log(`${i.toString().padEnd(3)} | ${key.toFixed(2).padEnd(10)} | ${item.toString()}`);
            }
        }
    }
}
