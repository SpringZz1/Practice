import '../css/login.css';
import '../css/login.less';
import '../css/test.css';

function login() {
  var oH2 = document.createElement('h2');
  oH2.innerHTML = 'wj测试';
  oH2.className = 'title';
  return oH2;
}

document.body.appendChild(login());