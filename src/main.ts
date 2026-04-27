import { Triangle, HashTableL1 } from "./level1.js";
import { HashTableL2 } from "./level2.js";
import { HashTableL3 } from "./level3.js";

function parsePositiveIntOrDefault(
  raw: string | undefined,
  def: number,
): number {
  const v = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(v) && v > 0 ? v : def;
}

function runDemo() {
  const size = parsePositiveIntOrDefault(process.argv[2], 10);
  const nLevel1 = parsePositiveIntOrDefault(process.argv[3], 5);
  const nLevel23 = parsePositiveIntOrDefault(process.argv[4], 8);
  const angleThreshold = Number.isFinite(Number(process.argv[5]))
    ? Number(process.argv[5])
    : 90;

  console.log("Рівень 1 (Без колізій)");
  console.log(`Розмір таблиці: ${size}`);
  const ht1 = new HashTableL1(size);
  let inserted1 = 0;
  let tries1 = 0;
  while (inserted1 < Math.min(nLevel1, size) && tries1 < 10000) {
    tries1++;
    if (ht1.insert(Triangle.generateRandom())) inserted1++;
  }
  ht1.print("Таблиця 1-го рівня");

  console.log("\nРівень 2 (Квадратичне зондування)");
  const ht2 = new HashTableL2(size);
  for (let i = 0; i < Math.min(nLevel23, size); i++) {
    ht2.insert(Triangle.generateRandom());
  }
  ht2.print("Таблиця 2-го рівня");

  console.log("\nРівень 3 (Видалення за критерієм)");
  const ht3 = new HashTableL3(size);
  for (let i = 0; i < Math.min(nLevel23, size); i++) {
    ht3.insert(Triangle.generateRandom());
  }
  ht3.print("До видалення");

  console.log(`\nВидаляємо елементи з кутом > ${angleThreshold}°...`);
  ht3.deleteByAngle(angleThreshold);
  ht3.print("Після видалення");
}

runDemo();

