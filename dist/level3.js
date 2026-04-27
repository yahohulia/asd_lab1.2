import { Segment } from "./level1.js";
import { HashTableL2 } from "./level2.js";
export class HashTableL3 extends HashTableL2 {
    deleted;
    constructor(size) {
        super(size);
        this.deleted = new Array(size).fill(false);
    }
    insert(item) {
        const hPrime = this.hash(item.getLength());
        let firstDeleted = null;
        for (let i = 0; i < this.size; i++) {
            const h = (hPrime + i * i) % this.size;
            if (this.deleted[h]) {
                if (firstDeleted === null)
                    firstDeleted = h;
                continue;
            }
            if (this.table[h] === null) {
                const pos = firstDeleted !== null ? firstDeleted : h;
                this.table[pos] = item;
                this.deleted[pos] = false;
                return true;
            }
        }
        if (firstDeleted !== null) {
            this.table[firstDeleted] = item;
            this.deleted[firstDeleted] = false;
            return true;
        }
        return false;
    }
    deleteByAngle(threshold) {
        for (let i = 0; i < this.size; i++) {
            if (this.table[i] !== null && !this.deleted[i]) {
                if (Math.abs(this.table[i].getAngleWithOX()) > threshold) {
                    this.table[i] = null;
                    this.deleted[i] = true;
                }
            }
        }
    }
    print(title) {
        console.log(`\n--- ${title} ---`);
        console.log("idx | статус       | key(L)      | елемент");
        console.log("----+--------------+-------------+------------------------------");
        for (let i = 0; i < this.size; i++) {
            const idx = i.toString().padEnd(3);
            if (this.deleted[i]) {
                console.log(`${idx} | [ВИДАЛЕНО]   | ${"-".padEnd(11)} | -`);
                continue;
            }
            const item = this.table[i];
            if (!item) {
                console.log(`${idx} | Порожньо     | ${"-".padEnd(11)} | -`);
            }
            else {
                const key = item.getLength();
                console.log(`${idx} | Заповнено    | ${key.toFixed(4).padEnd(11)} | ${item.toString()}`);
            }
        }
    }
}
