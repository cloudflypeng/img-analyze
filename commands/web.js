import fs from 'fs';
import chalk from 'chalk';
import open from 'open';
import pkg from 'lodash';
const { cloneDeep } = pkg;

import { createHostServer } from '../src/brower.js'

import { ignoreDirs } from '../config.js';
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

// 扫描目录下的图片文件, 返回地址, 文件名, 文件大小
const getDirectoryTree = (dir) => {
  const tree = {
    name: dir,
    children: [],
  };

  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (ignoreDirs.find((ignoreDir) => file.includes(ignoreDir))) {
      continue;
    }
    const path = `${dir}/${file}`;
    const stat = fs.statSync(path);
    if (stat.isDirectory()) {
      tree.children.push(getDirectoryTree(path));
    } else {

      tree.children.push({
        name: file,
        size: formatSize(stat.size),
        path,
      });
    }
  }

  return tree;
}

function web(dir = '.') {
  // 遍历并保存dir 下所有带图片路径的目录结构树
  const imgTree = getDirectoryTree('./src');

  const server = createHostServer(imgTree);

  server.listen(8080, '127.0.0.1', async () => {
    await open('http://localhost:8080')
  });
}

export { web };
