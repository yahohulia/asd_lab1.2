export class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export class Segment {
    start;
    end;
    constructor(start, end) {
        this.start = start;
        this.end = end;
        if (Math.abs(start.x - end.x) < 1e-9 && Math.abs(start.y - end.y) < 1e-9) {
            throw new Error("Відрізок вироджений: початкова і кінцева точки збігаються.");
        }
    }
    static generateRandom() {
        const rnd = () => Math.floor(Math.random() * 100);
        while (true) {
            try {
                return new Segment(new Point(rnd(), rnd()), new Point(rnd(), rnd()));
            }
            catch { }
        }
    }
    getLength() {
        return Math.hypot(this.end.x - this.start.x, this.end.y - this.start.y);
    }
    getAngleWithOX() {
        const dx = this.end.x - this.start.x;
        const dy = this.end.y - this.start.y;
        return (Math.atan2(dy, dx) * 180) / Math.PI;
    }
    toString() {
        return (`Відрізок[(${this.start.x},${this.start.y})→(${this.end.x},${this.end.y})]` +
            `, L:${this.getLength().toFixed(2)}` +
            `, кут:${this.getAngleWithOX().toFixed(2)}°`);
    }
}
export class HashTableL1 {
    table;
    size;
    static KnuthConst = (Math.sqrt(5) - 1) / 2;
    constructor(size) {
        if (size < 1)
            throw new Error("Розмір таблиці має бути > 0");
        this.size = size;
        this.table = new Array(size).fill(null);
    }
    hash(key) {
        const frac = (key * HashTableL1.KnuthConst) % 1;
        return Math.floor(this.size * frac);
    }
    insert(item) {
        const h = this.hash(item.getLength());
        if (this.table[h] === null) {
            this.table[h] = item;
            return true;
        }
        return false;
    }
    print(title) {
        console.log(`\n--- ${title} ---`);
        console.log("idx | key(L)      | елемент");
        console.log("----+-------------+------------------------------");
        for (let i = 0; i < this.size; i++) {
            const item = this.table[i];
            if (!item) {
                console.log(`${pad(i, 3)} | ${"-".padEnd(11)} | Порожньо`);
            }
            else {
                const key = item.getLength();
                console.log(`${pad(i, 3)} | ${key.toFixed(4).padEnd(11)} | ${item.toString()}`);
            }
        }
    }
}
function pad(n, width) {
    return n.toString().padEnd(width);
}
