export class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function triangleAreaSigned(a: Point, b: Point, c: Point): number {
  return 0.5 * ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
}

export class Triangle {
  constructor(
    public a: Point,
    public b: Point,
    public c: Point,
  ) {
    const areaAbs = Math.abs(triangleAreaSigned(a, b, c));
    if (areaAbs < 1e-9) {
      throw new Error(
        "Трикутник вироджений (точки колінеарні або збігаються).",
      );
    }
  }

  static generateRandom(): Triangle {
    const rnd = () => Math.floor(Math.random() * 100);
    while (true) {
      try {
        return new Triangle(
          new Point(rnd(), rnd()),
          new Point(rnd(), rnd()),
          new Point(rnd(), rnd()),
        );
      } catch {}
    }
  }

  getPerimeter(): number {
    return dist(this.a, this.b) + dist(this.b, this.c) + dist(this.c, this.a);
  }

  getArea(): number {
    return Math.abs(triangleAreaSigned(this.a, this.b, this.c));
  }

  getAngles(): [number, number, number] {
    const ab = dist(this.a, this.b);
    const bc = dist(this.b, this.c);
    const ca = dist(this.c, this.a);

    const angleA = Triangle.safeAcosDeg(
      (ab * ab + ca * ca - bc * bc) / (2 * ab * ca),
    );
    const angleB = Triangle.safeAcosDeg(
      (ab * ab + bc * bc - ca * ca) / (2 * ab * bc),
    );
    const angleC = 180 - angleA - angleB;

    return [angleA, angleB, angleC];
  }

  getMaxAngle(): number {
    const [A, B, C] = this.getAngles();
    return Math.max(A, B, C);
  }

  private static safeAcosDeg(x: number): number {
    const clamped = Math.min(1, Math.max(-1, x));
    return (Math.acos(clamped) * 180) / Math.PI;
  }

  toString(): string {
    const [A, B, C] = this.getAngles();
    return `Трикутник[(${this.a.x},${this.a.y})-(${this.b.x},${this.b.y})-(${this.c.x},${this.c.y})], 
    S:${this.getArea().toFixed(2)}, P:${this.getPerimeter().toFixed(2)}, кути:${A.toFixed(1)}°/${B.toFixed(1)}°/${C.toFixed(1)}°`;
  }
}

export class HashTableL1 {
  protected table: (Triangle | null)[];
  protected size: number;

  constructor(size: number) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  protected hash(key: number): number {
    const intKey = Math.floor(key);
    return ((intKey % this.size) + this.size) % this.size;
  }

  public insert(item: Triangle): boolean {
    const h = this.hash(item.getPerimeter());
    if (this.table[h] === null) {
      this.table[h] = item;
      return true;
    }
    return false;
  }

  public print(title: string): void {
    console.log(`\n--- ${title} ---`);
    console.log("idx | key(P)      | element");
    console.log("----+------------+------------------------------");
    for (let i = 0; i < this.size; i++) {
      const item = this.table[i];
      if (!item) {
        console.log(`${i.toString().padEnd(3)} | ${"-".padEnd(10)} | Порожньо`);
      } else {
        const key = item.getPerimeter();
        console.log(
          `${i.toString().padEnd(3)} | ${key.toFixed(2).padEnd(10)} | ${item.toString()}`,
        );
      }
    }
  }
}
