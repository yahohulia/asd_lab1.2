import { Triangle } from "./level1.js";
import { HashTableL2 } from "./level2.js";
export declare class HashTableL3 extends HashTableL2 {
    private deletedItems;
    constructor(size: number);
    insert(item: Triangle): boolean;
    deleteByAngle(threshold: number): void;
    print(title: string): void;
}
//# sourceMappingURL=level3.d.ts.map