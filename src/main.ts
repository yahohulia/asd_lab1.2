import * as readline from "readline";
import { Segment, HashTableL1 } from "./level1.js";
import { HashTableL2 } from "./level2.js";
import { HashTableL3 } from "./level3.js";

async function askQuestion(
  rl: readline.Interface,
  question: string,
): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(
    "=== Хеш-таблиця: Відрізок / Метод множення / Квадратичне зондування ===\n",
  );

  const args = process.argv.slice(2);
  let size: number, nL1: number, nL23: number, angleThreshold: number;

  if (args.length >= 4) {
    const a0 = args[0] as string;
    const a1 = args[1] as string;
    const a2 = args[2] as string;
    const a3 = args[3] as string;
    size = Math.max(1, parseInt(a0, 10) || 10);
    nL1 = Math.min(Math.max(1, parseInt(a1, 10) || 5), size);
    nL23 = Math.min(Math.max(1, parseInt(a2, 10) || 8), size);
    angleThreshold = isFinite(Number(a3)) ? Number(a3) : 45;
    rl.close();
    console.log(
      `Параметри (з аргументів): size=${size}, nL1=${nL1}, nL23=${nL23}, angle>${angleThreshold}°\n`,
    );
  } else {
    const rawSize = await askQuestion(rl, "Введіть розмір хеш-таблиці: ");
    size = Math.max(1, parseInt(rawSize, 10) || 10);

    const rawN1 = await askQuestion(
      rl,
      "Кількість елементів для рівня 1 (без колізій): ",
    );
    nL1 = Math.min(Math.max(1, parseInt(rawN1, 10) || 5), size);

    const rawN23 = await askQuestion(
      rl,
      "Кількість елементів для рівнів 2 і 3: ",
    );
    nL23 = Math.min(Math.max(1, parseInt(rawN23, 10) || 8), size);

    const rawAngle = await askQuestion(
      rl,
      "Поріг кута (°) для видалення (рівень 3): ",
    );
    angleThreshold = isFinite(Number(rawAngle)) ? Number(rawAngle) : 45;
    rl.close();
  }

  console.log("\n════════════════════════════════════");
  console.log("  РІВЕНЬ 1 — Вставлення без колізій");
  console.log("════════════════════════════════════");
  console.log(`Розмір таблиці: ${size}  |  Елементів: ${nL1}`);

  const ht1 = new HashTableL1(size);
  let inserted1 = 0;
  let tries1 = 0;
  while (inserted1 < nL1 && tries1 < 100_000) {
    tries1++;
    const seg = Segment.generateRandom();
    const ok = ht1.insert(seg);
    if (ok) {
      inserted1++;
      console.log(`  [+] Вставлено: ${seg.toString()}`);
    } else {
      console.log(
        `  [-] Колізія — позиція зайнята, елемент відхилено: ${seg.toString()}`,
      );
    }
  }
  ht1.print("Таблиця рівня 1");

  console.log("\n════════════════════════════════════════════════");
  console.log("  РІВЕНЬ 2 — Квадратичне зондування при колізії");
  console.log("════════════════════════════════════════════════");
  console.log(`Розмір таблиці: ${size}  |  Елементів: ${nL23}`);

  const ht2 = new HashTableL2(size);
  for (let i = 0; i < nL23; i++) {
    const seg = Segment.generateRandom();
    const ok = ht2.insert(seg);
    console.log(
      ok ? `  [+] Вставлено: ${seg.toString()}` : `  [!] Таблиця переповнена.`,
    );
  }
  ht2.print("Таблиця рівня 2");

  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("  РІВЕНЬ 3 — Видалення елементів з |кут > OX| > порогу");
  console.log("═══════════════════════════════════════════════════════════");
  console.log(
    `Розмір таблиці: ${size}  |  Елементів: ${nL23}  |  Поріг: ${angleThreshold}°`,
  );

  const ht3 = new HashTableL3(size);
  for (let i = 0; i < nL23; i++) {
    const seg = Segment.generateRandom();
    ht3.insert(seg);
  }
  ht3.print("До видалення");

  console.log(`\nВидаляємо елементи з |кут з OX| > ${angleThreshold}° ...`);
  ht3.deleteByAngle(angleThreshold);
  ht3.print("Після видалення");
}

main().catch(console.error);
