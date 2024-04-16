import {
  createApp, eventHandler, serveStatic,
  toNodeListener, createRouter, defineEventHandler,
  appendHeader
} from 'h3'
import { createServer } from 'http';
import path from 'path';
import fs from 'fs';
import { __dirname, isImg } from '../config.js'
import { stat, readFile } from "node:fs/promises";
import process from 'node:process';

import { join } from "pathe";
const publicDir = `${__dirname}/dist`

const calcUrl = (fileName) => {

  return isImg(fileName) ? process.cwd() + fileName : join(publicDir, fileName)
}

const getmimeType = (id) => {
  let mimeType;
  const ext = path.extname(id);
  switch (ext) {
    case '.html':
      mimeType = 'text/html';
      break;
    case '.js':
      mimeType = 'text/javascript';
      break;
    case '.css':
      mimeType = 'text/css';
      break;
    case '.json':
      mimeType = 'application/json';
      break;
    case '.png':
      mimeType = 'image/png';
      break;
    case '.jpg':
      mimeType = 'image/jpeg';
      break;
    case '.svg':
      mimeType = 'image/svg+xml';
      break;
    default:
      mimeType = 'image/svg+xml';
  }
  return mimeType;
}


function createHostServer(json) {
  // 2. 打开一个web服务, 用于展示将这个json 转化成图片组成的页面
  const app = createApp();
  const router = createRouter();
  app.use(router)
  router.get('/json', eventHandler(async (event) => {
    return json;
  }))
  router.get(
    '/',
    eventHandler(async (event) => {

      const htmlPath = path.join(__dirname, '/dist/index.html');

      const htmlContent = await fs.readFileSync(htmlPath, 'utf-8');
      return htmlContent;
    })
  );
  app.use(
    defineEventHandler((event) => {
      return serveStatic(event, {
        getContents: (id) => {

          return readFile(calcUrl(id))
        },
        getMeta: async (id) => {

          if (id == 'json') return json
          let stats = await stat(calcUrl(id)).catch(() => { });
          if (!stats || !stats.isFile()) {
            return;
          }
          let mimeType = getmimeType(id)

          appendHeader(event, 'Content-Type', mimeType);

          return {
            size: stats.size,
            mtime: stats.mtimeMs,
            mimeType: mimeType
          };
        },
      });
    }),
  );

  return createServer(toNodeListener(app));
}

export { createHostServer };
