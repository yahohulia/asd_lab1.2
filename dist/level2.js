import { Triangle, HashTableL1 } from "./level1.js";
export class HashTableL2 extends HashTableL1 {
    constructor(size) {
        super(size);
    }
    // Відкрита адресація – квадратичне зондування
    insert(item) {
        const hPrime = this.hash(item.getPerimeter());
        for (let i = 0; i < this.size; i++) {
            const h = (hPrime + i * i) % this.size;
            if (this.table[h] === null) {
                this.table[h] = item;
                return true;
            }
        }
        return false; // таблиця переповнена або колізію не вдалося вирішити
    }
}
