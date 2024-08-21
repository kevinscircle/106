
function init(){
console.log('this is the initial state:',);
sayHello();
}


function sayHello(){
    console.log('Hello',);
}

window.onload = init;  // no need for () means now // unless you want at same time as css and html render 