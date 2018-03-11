var button = document.getElementById('button');
var number = document.getElementById('number');

button.addEventListener('click', (e)=>{
    let script = document.createElement('script');
    let functionName = 'frank'+ parseInt(Math.random()*10000000 ,10);
    window[functionName] = function(ev){  // 每次请求之前搞出一个随机的函数
        number.innerText = ev;
    };
    script.src = 'http://localhost:8888/pay?callback=' + functionName;
document.body.appendChild(script);
script.onload = function(e){ // 状态码是 2XX 则表示成功
    e.currentTarget.remove();
    delete window[functionName] // 请求完了就干掉这个随机函数
};
script.onload = function(e){ // 状态码大于等于 400 则表示失败
    e.currentTarget.remove();
    delete window[functionName] // 请求完了就干掉这个随机函数
}
});
