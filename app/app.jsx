import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css'
// const isImg = (id) => {
//   // 判断是否是图片 格式包括 jpg, png, svg, gif, jpeg, webp, bmp, tiff
//   const imgReg = /\.(jpg|png|svg|gif|jpeg|webp|bmp|tiff)$/;
//   return imgReg.test(id);
// }

import ImgWrapper from './ImgWrapper.jsx';

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/json').then(response => response.json()).then(data => {
      console.log(data);
      setData(data.img || [])
    });
  }, [])

  return (
    <div style={{display: 'grid', gap:'1rem', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
      {data?.map(ImgWrapper)}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
