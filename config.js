import { fileURLToPath } from 'url';
import path from 'path';
const { dirname } = path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const ignoreDirs = ['node_modules', 'cantants', 'dist', 'git']

const isImg = (id) => {
  // 判断是否是图片 格式包括 jpg, png, svg, gif, jpeg, webp, bmp, tiff
  const imgReg = /\.(jpg|png|svg|gif|jpeg|webp|bmp|tiff)$/;
  return imgReg.test(id);
}
// 格式化size单位
const formatSize = (size) => {
  if (size < 1024) {
    return `${size}B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)}KB`;
  } else {
    return `${(size / 1024 / 1024).toFixed(2)}MB`;
  }
}
// 根据文件大小计算图片宽度
// 0-10k映射到10-50px, 10k-100k映射到50-100px, 100k-1M映射到100-200px, 1M-10M映射到200-300px, 10M-100M映射到300-400px, 100M-1G映射到400-500px
const getSize = (size) => {
  if (size < 10 * 1024) {
    return 10
  } else if (size < 50 * 1024) {
    return 50 * (size / 1024 / 50)
  } else if (size < 100 * 1024) {
    return 100 * (size / 1024 / 100)
  } else if (size < 1024 * 1024) {
    return 200 * (size / 1024 / 1024)
  } else if (size < 10 * 1024 * 1024) {
    return 300 * (size / 1024 / 1024 / 10)
  } else if (size < 100 * 1024 * 1024) {
    return 400 * (size / 1024 / 1024 / 100)
  } else {
    return 500
  }
}

export { ignoreDirs, __dirname, isImg, formatSize, getSize }
