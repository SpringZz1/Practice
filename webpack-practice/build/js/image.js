import imgSrc from '../img/chat.png';
import '../css/img.css';

function packImg() {
  // 01. 创建一个容器
  var oEle = document.createElement('div'); // 02. 创建img标签，设置src属性

  var img = document.createElement('img'); // img.src = require('../img/chat.png').default;
  // img.src = require('../img/chat.png');

  img.src = imgSrc; // 03. 设置背景图片

  var bgImg = document.createElement('div');
  bgImg.className = 'bgBox';
  oEle.appendChild(bgImg);
  oEle.appendChild(img);
  return oEle;
}

document.body.appendChild(packImg());
document.body.appendChild(packImg());