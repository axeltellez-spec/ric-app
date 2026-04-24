const fs = require('fs');
const path = require('path');

// Try to read the PDF file as binary and extract text
const pdfPath = 'C:\\Users\\AxelK\\Downloads\\pdf bloomberg.pdf';

try {
  const buffer = fs.readFileSync(pdfPath);
  const text = buffer.toString('latin1');
  
  // Extract text between common markers or just output raw text
  console.log('=== PDF CONTENT ===');
  console.log(text);
  console.log('=== END PDF ===');
} catch (error) {
  console.error('Error reading PDF:', error.message);
  console.log('Trying alternative method...');
  
  // If the above fails, try using child_process to call an external tool
  const { exec } = require('child_process');
  
  // Try using pdftotext if available
  exec('pdftotext "C:\\Users\\AxelK\\Downloads\\pdf bloomberg.pdf" -', (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error.message);
      return;
    }
    if (stderr) {
      console.error('Stderr:', stderr);
    }
    console.log('=== PDF CONTENT (via pdftotext) ===');
    console.log(stdout);
  });
}
