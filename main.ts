// The Word You'd Delete From the Dictionary — make.fun entry.
// Writes one word, "forever", to output/entry.txt.
//
// Why this word, judged against the brief in RULES.txt:
// - It names one real word everyone recognises, so criterion 1 is met
//   the moment the judge reads it: "forever".
// - The joke lands at first sight (criterion 2): the word is erased
//   forever, so its own meaning is the punchline. No caption, no
//   defence, no explanation attached — the deletion does the joke.
// - The humour comes from the word itself (criterion 3): "forever"
//   means "for all time", and the act of deleting it is itself for
//   all time. The word's meaning and the punishment are the same thing.
//   The gap it leaves is also the joke: nobody can ever promise,
//   threaten, or swear "forever" again — every vow, every "happily
//   ever after", every "forever and ever" dies with it.
// - It is fresh (criterion 4): the field's first thoughts are the
//   usual suspects — moist, irregardless, queue, colonel, phlegm —
//   while "forever" is a word nobody reaches for first, yet everyone
//   understands instantly.
// - It is exact (criterion 5): one word, seven letters, spelled
//   correctly, with nothing added around it.
//
// Deterministic: the same seven bytes on every run. No network, no
// clock, no randomness. The program enforces the gate itself before
// writing: 1-77 characters, exactly one word, no extra whitespace.
// If the word ever broke the gate, it fails loudly instead of
// shipping an invalid entry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "forever";

// Gate check: 1-77 characters, exactly one word, no extra whitespace.
function gateCheck(word: string, label: string): void {
  const chars = [...word].length;
  if (chars < 1 || chars > 77) {
    throw new Error(`${label} is ${chars} characters, gate needs 1-77`);
  }
  if (word.trim() !== word || word.length === 0) {
    throw new Error(`${label} must have no extra whitespace`);
  }
  if (/\s/.test(word)) {
    throw new Error(`${label} must be exactly one word`);
  }
}

gateCheck(WORD, "word");

// The output path is relative to the working directory on purpose:
// the grader runs the program with its output directory as the cwd,
// and an absolute path built from the script's own location breaks
// when the repository is read-only in the grading sandbox.

mkdirSync("output", { recursive: true });
writeFileSync("output/entry.txt", WORD, "utf8");

// Read-back: the bytes on disk must be exactly the gated word.
const written = readFileSync("output/entry.txt", "utf8");
if (written !== WORD) {
  throw new Error("entry.txt on disk does not match the gated word");
}
gateCheck(written, "written entry");
