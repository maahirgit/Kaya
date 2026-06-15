import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const pdfPath = 'C:\\Users\\Maahir\\Desktop\\Maahir_Shah_CV.pdf';
const dataBuffer = fs.readFileSync(pdfPath);
const parser = new PDFParse({ data: dataBuffer });

async function run() {
    try {
        console.log('Loading generated PDF...');
        await parser.load(pdfPath);
        console.log('Total pages:', parser.shouldParse ? 1 : 0); // let's see if we can get page count
        const info = parser.getInfo();
        console.log('PDF Info:', info);
        // Let's count page tables or look at the text
        const text = parser.getText();
        console.log('Text length:', text ? text.length : 0);
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await parser.destroy();
    }
}

run();
