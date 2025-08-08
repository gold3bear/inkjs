import pkg from './inkjs-fork/dist/ink.js';
const { Story } = pkg;
import fs from 'fs';

// Test with the simple function
console.log('=== Testing hasFunction API ===\n');

// Remove BOM if present
function cleanJson(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    return content.slice(1);
  }
  return content;
}

// Test 1: Simple function file
const testFuncJson = cleanJson(fs.readFileSync('story/test_function.json', 'utf8'));
const testStory = new Story(testFuncJson);

console.log('1. Testing test_function.json:');
console.log('   hasFunction("test_func"):', testStory.hasFunction('test_func'));
console.log('   listFunctions():', testStory.listFunctions());

// Test 2: Main story file
const mainJson = cleanJson(fs.readFileSync('story/main.json', 'utf8'));
const mainStory = new Story(mainJson);

console.log('\n2. Testing main.json:');
const functions = mainStory.listFunctions();
console.log('   Total functions found:', functions.length);
if (functions.length > 0) {
  console.log('   First 10 functions:', functions.slice(0, 10));
}

// Test 3: Test a known non-function
console.log('\n3. Testing non-functions:');
console.log('   hasFunction("start"):', mainStory.hasFunction('start'));
console.log('   hasFunction("game_start"):', mainStory.hasFunction('game_start'));

