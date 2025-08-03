import fs from 'fs';
import path from 'path';

let wordList = [];
try {
  // Construct the path relative to the current working directory
  const filePath = path.join(process.cwd(), 'words.txt');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  wordList = fileContent.split('\n').map(word => word.trim().toLowerCase()).filter(word => word.length > 0);
} catch (error) {
  console.error('Error reading words.txt:', error);
}
export const WORD_LIST = wordList;

export function getWordByIndex(index) {
  return WORD_LIST[index % WORD_LIST.length];
}

export function getIndexByWord(word) {
  return WORD_LIST.indexOf(word.toLowerCase());
}

export function isValidWord(word) {
  return WORD_LIST.includes(word.toLowerCase());
}

export function getWordListLength() {
  return WORD_LIST.length;
}