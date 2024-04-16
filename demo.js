// import { fileURLToPath } from 'url';
// import path from 'path';
// const { dirname } = path

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// path.join(__dirname, '../index.html')
// console.log('new URL :>> ', new URL('.', import.meta.url).pathname);
// console.log(__dirname)
// console.log('targe :>> ', path.join(__dirname, '../index.html'));

const imgReg = /\.(jpg|png|svg|gif|jpeg|webp|bmp|tiff)/;
console.log('object :>> ', imgReg.test('aaa.svg32'));
