const fs = require('fs');

// Read the extracted PDF text
const extractedFile = 'C:\\Users\\AxelK\\.claude\\projects\\C--Users-AxelK-OneDrive-Documentos-Claude-Aplicacion-RIC--Lab-de-Finanza\\94a8b6ec-81d8-4c73-84a6-f8236a057723\\tool-results\\mcp-Windows-MCP-PowerShell-1776991892484.txt';

console.log('Reading extracted PDF text...');
const text = fs.readFileSync(extractedFile, 'utf8');

// Find lines that look like function definitions
// Look for patterns that suggest data: currency codes, function names, etc.
const lines = text.split('\n').filter(line => line.trim().length > 0);

console.log(`Total lines: ${lines.length}`);
console.log('');

// Look for table headers or section markers
console.log('=== SEARCHING FOR DATA PATTERNS ===');
console.log('');

// Search for lines with specific keywords
const keywordsToFind = ['Category', 'category', 'Function', 'function', 'Ticker', 'ticker', 'Description', 'description', 'Ticket', 'ticket', 'Code', 'code'];
let patternMatches = [];

lines.forEach((line, index) => {
  keywordsToFind.forEach(keyword => {
    if (line.includes(keyword)) {
      if (!patternMatches.includes(line)) {
        patternMatches.push(line);
      }
    }
  });
});

if (patternMatches.length > 0) {
  console.log('Found lines with keywords:');
  patternMatches.slice(0, 50).forEach(match => {
    console.log(match.substring(0, 150));
  });
} else {
  console.log('No keyword matches found.');
  console.log('');
  console.log('=== FIRST 100 LINES OF TEXT ===');
  lines.slice(0, 100).forEach((line, i) => {
    console.log(`${i}: ${line.substring(0, 120)}`);
  });
}
