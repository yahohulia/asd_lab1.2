import { Triangle } from "./level1.js";
import { HashTableL2 } from "./level2.js";
export class HashTableL3 extends HashTableL2 {
    // Маркер видаленої комірки (tombstone) для відкритої адресації
    deletedItems;
    constructor(size) {
        super(size);
        this.deletedItems = new Array(size).fill(false);
    }
    // Вставка з урахуванням видалених комірок
    insert(item) {
        const hPrime = this.hash(item.getPerimeter());
        for (let i = 0; i < this.size; i++) {
            const h = (hPrime + i * i) % this.size;
            if (this.table[h] === null || this.deletedItems[h]) {
                this.table[h] = item;
                this.deletedItems[h] = false;
                return true;
            }
        }
        return false;
    }
    // Критерій видалення: елементи з кутом > заданого (беремо максимальний внутрішній кут трикутника)
    deleteByAngle(threshold) {
        for (let i = 0; i < this.size; i++) {
            if (this.table[i] !== null && !this.deletedItems[i]) {
                if (this.table[i].getMaxAngle() > threshold) {
                    this.table[i] = null;
                    this.deletedItems[i] = true;
                }
            }
        }
    }
    print(title) {
        console.log(`\n--- ${title} ---`);
        console.log("idx | status       | key(P)      | element");
        console.log("----+-------------+------------+------------------------------");
        for (let i = 0; i < this.size; i++) {
            if (this.deletedItems[i]) {
                console.log(`${i.toString().padEnd(3)} | [ВИДАЛЕНО]  | ${"-".padEnd(10)} | -`);
                continue;
            }
            const item = this.table[i];
            if (!item) {
                console.log(`${i.toString().padEnd(3)} | Порожньо     | ${"-".padEnd(10)} | -`);
            }
            else {
                const key = item.getPerimeter();
                console.log(`${i.toString().padEnd(3)} | Заповнено    | ${key.toFixed(2).padEnd(10)} | ${item.toString()}`);
            }
        }
    }
}
