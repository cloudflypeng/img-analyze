import fs from 'fs';
import open from 'open';
import { isImg, formatSize, getSize } from '../config.js';

import { createHostServer } from '../src/brower.js'

import { ignoreDirs } from '../config.js';

// 扫描目录下的图片文件, 返回地址, 文件名, 文件大小
const getDirectoryList = (dir, list) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (ignoreDirs.find((ignoreDir) => file.includes(ignoreDir))) {
      continue;
    }
    const path = `${dir}/${file}`;
    const stat = fs.statSync(path);
    if (stat.isDirectory()) {
      getDirectoryList(path, list);
    } else {
      if (!isImg(file)) {
        continue;
      }
      list.push({
        name: file,
        imgSize: stat.size,
        size: formatSize(stat.size),
        path,
      });
    }
  }

}

function list(dir = '.') {
  // 遍历并保存dir 下所有带图片路径的目录结构树
  let list = []
  console.log('list :>> ', list);
  const server = createHostServer({
    img: list
  });

  server.listen(8080, '127.0.0.1', async () => {
    await open('http://localhost:8080')
  });
}

export { list };
