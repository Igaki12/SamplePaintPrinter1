  
  //要素の取得
  var elements = document.getElementsByClassName("drag-and-drop");
  let cans = document.getElementsByClassName("character");
  console.log(cans);


  //要素内のクリックされた位置を取得するグローバル（のような）変数
  var x;
  var y;

  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for(var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("mousedown", mDown, {passive:false});
      elements[i].addEventListener("touchstart", mDown, {passive:false});
  }
  for(var i = 0; i<cans.length; i++){
      cans[i].addEventListener("mousedown",mDown, {passive:false});
      cans[i].addEventListener("touchstart",mDown, {passive:false});
  }

  //マウスが押された際の関数
  function mDown(e) {

      //クラス名に .drag を追加
      this.classList.add("drag");

      //タッチデイベントとマウスのイベントの差異を吸収
      if(e.type === "mousedown") {
          var event = e;
      } else {
          var event = e.changedTouches[0];
      }

      //要素内の相対座標を取得
      x = event.pageX - this.offsetLeft;
      y = event.pageY - this.offsetTop;

      //ムーブイベントにコールバック
      document.body.addEventListener("mousemove", mMove, {passive:false});
      document.body.addEventListener("touchmove", mMove, {passive:false});
  }

  //マウスカーソルが動いたときに発火
  function mMove(e) {

      //ドラッグしている要素を取得
      var drag = document.getElementsByClassName("drag")[0];

      //同様にマウスとタッチの差異を吸収
      if(e.type === "mousemove") {
          var event = e;
      } else {
          var event = e.changedTouches[0];
      }

      //フリックしたときに画面を動かさないようにデフォルト動作を抑制
      e.preventDefault();

          //   個人的な追記部分(画面外まで動いて行ってしまわないようにする)
    // if(event.pageY - y > 480){
    //     event.pageY = 480 + y;
    // }
    // if(event.pageX - x > 480){
    //     event.pageX = 480 + x;
    // }

      //マウスが動いた場所に要素を動かす
      drag.style.top = event.pageY - y + "px";
      drag.style.left = event.pageX - x + "px";



      //マウスボタンが離されたとき、またはカーソルが外れたとき発火
      drag.addEventListener("mouseup", mUp, {passive:false});
      document.body.addEventListener("mouseleave", mUp, {passive:false});
      drag.addEventListener("touchend", mUp, {passive:false});
      document.body.addEventListener("touchleave", mUp, {passive:false});

  }

  //マウスボタンが上がったら発火
  function mUp(e) {
      var drag = document.getElementsByClassName("drag")[0];

      //ムーブベントハンドラの消去
      document.body.removeEventListener("mousemove", mMove, {passive:false});
      drag.removeEventListener("mouseup", mUp, {passive:false});
      document.body.removeEventListener("touchmove", mMove, {passive:false});
      drag.removeEventListener("touchend", mUp, {passive:false});

      //クラス名 .drag も消す
      drag.classList.remove("drag");
  }


const body = document.getElementById('operating-screen');
const redBody = document.getElementById('redBody');
const greenBody = document.getElementById('greenBody');
const blueBody = document.getElementById('blueBody');
console.log(`body:${body}`);
console.log(`redBody:${redBody}`);
function changeBodyColor(color){
    body.style.backgroundColor = color;
}
redBody.addEventListener('click',() => {changeBodyColor('#FF0000')},{passive:false});
greenBody.addEventListener('click',() => {changeBodyColor('#00FF00')},{passive:false});
blueBody.addEventListener('click',() => {changeBodyColor('#0000FF')},{passive:false});


// ここから文字の作成・移動
let ctx = cans[0].getContext("2d");
ctx.lineWidth = 5;
ctx.fillStyle = "#0ff";
ctx.font = "50px cursive";
console.log(ctx.measureText("Hello World!"));
cans[0].width = Math.ceil(ctx.measureText("Hello World!").width) + 30;
ctx.lineWidth = 5;
ctx.fillStyle = "#0ff";
ctx.font = "50px cursive";
ctx.fillText("Hello World!!", 15, 65);
ctx.lineWidth = 7;
ctx.strokeStyle = "green";
ctx.strokeText("Hello World!!", 15, 65);
ctx.lineWidth = 4;
ctx.strokeStyle = "orange";
ctx.strokeText("Hello World!!", 15, 65);
ctx.lineWidth = 2;
ctx.strokeStyle = "yellow";
ctx.strokeText("Hello World!!", 15, 65);
cans[0].style.width = Math.ceil(ctx.measureText("Hello World!").width) + 30 + "px";


// 入力した文字列からフォントを作成する
const submit = document.getElementById('create_text');
const text = document.getElementById('text');
const ope = document.getElementById('operating-screen');
const range = document.getElementById('fontSize');
const sizeView = document.getElementById('fontSize-value');
let inputSize = range.value;
sizeView.innerText = inputSize;
range.addEventListener('input',(e) => {
    const setCurrentSize = (value) => {
        sizeView.innerText = value;
    }
    setCurrentSize(e.target.value);
},{passive:false});
let fontId = 1;
submit.addEventListener('click',() => {
    let inputEl = text.value;
    inputSize = range.value;
    if(inputEl === "") return;
    console.log(`${inputEl},${inputSize}`);
    let newFont = document.createElement('canvas');
    newFont.className = 'character';
    let h = parseInt(inputSize) + 20;
    newFont.height = h;
    newFont.style.height = h;
    ope.appendChild(newFont);
    console.log(newFont);
    cans = document.getElementsByClassName('character');
    for(let i = 0; i<cans.length; i++){
        cans[i].addEventListener("mousedown",mDown, {passive:false});
        cans[i].addEventListener("touchstart",mDown, {passive:false});
    }
    let writeNewCanvas = (id,font,size) => {
        ctx = cans[id].getContext("2d");
        ctx.lineWidth = 5;
        ctx.fillStyle = "#0ff";
        ctx.font = size + "px cursive";
        cans[id].width = Math.ceil(ctx.measureText(font).width) + 30;
        ctx.lineWidth = 5;
        ctx.fillStyle = "#0ff";
        ctx.font = size + "px cursive";
        ctx.fillText(font, 15, 65);
        ctx.lineWidth = 7;
        ctx.strokeStyle = "green";
        ctx.strokeText(font, 15, 65);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "orange";
        ctx.strokeText(font, 15, 65);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "yellow";
        ctx.strokeText(font, 15, 65);
        console.log(Math.ceil(ctx.measureText(font).width) + 10);
        cans[id].style.width = Math.ceil(ctx.measureText(font).width) + 30 + "px";
        text.value = '';
        }
    writeNewCanvas(fontId,inputEl,parseInt(inputSize));
    console.log(cans);
    fontId++;

},{passive:false})

