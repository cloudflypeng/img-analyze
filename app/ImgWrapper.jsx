import React from "react"

const getPointColor = size =>{
  // size < 10k 返回green, 小于100k 返回 yellow, 其他返回 red
  if(size < 10240){
    return 'green'
  } else if(size < 102400){
    return 'yellow'
  } else {
    return 'red'
  }
}

const ImgWrapper = (imgobj) =>{
  return (
    <div className="wrapper" >
      <img src={imgobj.path} />
      <div className="info" >
        <div>文件名: {imgobj.name}</div>
        <div>文件大小: {imgobj.size}
          <span className={`${getPointColor(imgobj.imgSize)} point`}></span>
        </div>
        <div>文件位置: {imgobj.path}</div>
      </div>
    </div>
  )
}

export default ImgWrapper
