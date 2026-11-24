// Two Lines to Your Past Self — make.fun entry.
// Writes the two-line warning to /output/entry.txt.
//
// Line one warns the past self about one specific moment: the doctor's
// appointment, the exact sentence the doctor says, and the nod that almost
// lets it slide. Line two (added next) lands why that moment mattered.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Line 1 of the entry — the warning about one specific moment.
// Line 2 — why that moment mattered: the second hearing catches the one
// word that changes everything, and catching it is the only reason the
// writer is still here to send this warning at all.
export const ENTRY =
  "When the doctor says 'come back in six months,' don't nod and walk out — ask him to say it again, slower.\n" +
  "That second hearing is when you catch the word 'urgent,' and catching it is the only reason you're still here to write this.";

// The gate in RULES.txt: /output/entry.txt must be UTF-8 text of 1 to 280
// characters, not only white space. Refuse to write anything that fails it.
export function assertGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 280) {
    throw new Error(`entry is ${chars} characters, gate needs 1-280`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  const lines = text.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
  for (const line of lines) {
    const sentences = line.trim().split(/[.!?]+/).filter(Boolean);
    if (sentences.length !== 1) {
      throw new Error(`each line must be exactly one sentence, got ${sentences.length} in: ${line}`);
    }
  }
}

export function outputPath(): string {
  // The grader runs the program with /output mounted; allow an override so
  // the same file can be tested locally without root.
  return join(process.env.MAKEFUN_OUTPUT_DIR ?? "/output", "entry.txt");
}

function main(): void {
  assertGate(ENTRY);
  const path = outputPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, ENTRY, "utf8");
  const chars = [...ENTRY].length;
  console.log(`wrote ${chars} characters to ${path}`);
}

main();
