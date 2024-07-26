import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css'
// const isImg = (id) => {
//  是否是图片 格式包括 jpg, png, svg, gif, jpeg, webp, bmp, tiff
//   const imgReg = /\.(jpg|png|svg|gif|jpeg|webp|bmp|tiff)$/;
//   return imgReg.test(id);
// }

import ImgWrapper from './ImgWrapper.jsx';
import SvgElement from './svgElement.jsx';

function App() {
  //jpg|png|svg|gif|jpeg|webp|bmp|tiff
  // jpg|jpeg|GIF|BMP|TIFF|webP
  const [bitmap, setBitmap] = useState([])
  const [svgList, setSvgList] = useState([])
  // 位图

  useEffect(() => {
    fetch('/json').then(response => response.json()).then(data => {
      console.log(data);
      let svgs = []
      let bitmaps = [];
      if (!Array.isArray(data.img)) return
      data.img.forEach(element => {
        element.name.toLowerCase().includes('.svg') ? svgs.push(element) : bitmaps.push(element)
      });
      setBitmap(bitmaps)
      setSvgList(svgs)
    });
  }, [])

  return (
    <>
      <h2>svg图片概览</h2>
      <div style={{ display: 'flex' }} >

        {svgList?.map(imgObj => {
          return <SvgElement {...imgObj} />
        })}
      </ div>
      <h2>位图概览</h2>
      <div>
        {bitmap?.map(imgObj => {
          return <ImgWrapper {...imgObj} />
        })}
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
