import { Triangle } from "./level1.js";
import { HashTableL2 } from "./level2.js";

export class HashTableL3 extends HashTableL2 {
  private deletedItems: boolean[];

  constructor(size: number) {
    super(size);
    this.deletedItems = new Array(size).fill(false);
  }

  public insert(item: Triangle): boolean {
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

  public deleteByAngle(threshold: number): void {
    for (let i = 0; i < this.size; i++) {
      if (this.table[i] !== null && !this.deletedItems[i]) {
        if (this.table[i]!.getMaxAngle() > threshold) {
          this.table[i] = null;
          this.deletedItems[i] = true;
        }
      }
    }
  }

  public print(title: string): void {
    console.log(`\n--- ${title} ---`);
    console.log("idx | status       | key(P)      | element");
    console.log(
      "----+-------------+------------+------------------------------",
    );
    for (let i = 0; i < this.size; i++) {
      if (this.deletedItems[i]) {
        console.log(
          `${i.toString().padEnd(3)} | [ВИДАЛЕНО]  | ${"-".padEnd(10)} | -`,
        );
        continue;
      }
      const item = this.table[i];
      if (!item) {
        console.log(
          `${i.toString().padEnd(3)} | Порожньо     | ${"-".padEnd(10)} | -`,
        );
      } else {
        const key = item.getPerimeter();
        console.log(
          `${i.toString().padEnd(3)} | Заповнено    | ${key.toFixed(2).padEnd(10)} | ${item.toString()}`,
        );
      }
    }
  }
}

