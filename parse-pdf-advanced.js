const fs = require('fs');
const path = require('path');

// Install pdf-parse if not available
const pdfParse = (() => {
  try {
    return require('pdf-parse');
  } catch (e) {
    console.log('Attempting to install pdf-parse...');
    require('child_process').execSync('npm install pdf-parse 2>&1', { stdio: 'inherit' });
    return require('pdf-parse');
  }
})();

const pdfPath = path.join(__dirname, '..', 'Downloads', 'pdf bloomberg.pdf');

console.log(`Reading PDF from: ${pdfPath}`);
console.log(`File exists: ${fs.existsSync(pdfPath)}`);

if (!fs.existsSync(pdfPath)) {
  console.log('Trying alternative path...');
  const altPath = 'C:\\Users\\AxelK\\Downloads\\pdf bloomberg.pdf';
  if (fs.existsSync(altPath)) {
    pdfPath = altPath;
    console.log(`Found at: ${altPath}`);
  }
}

const pdfBuffer = fs.readFileSync(pdfPath);

pdfParse(pdfBuffer).then(data => {
  console.log('=== PDF PARSED SUCCESSFULLY ===');
  console.log('Number of pages:', data.numpages);
  console.log('');
  console.log('=== PDF TEXT CONTENT ===');
  console.log(data.text);
  console.log('');
  console.log('=== END PDF ===');
}).catch(err => {
  console.error('Error parsing PDF:', err.message);
  process.exit(1);
});
