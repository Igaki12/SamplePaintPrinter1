  
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
      let drags = document.getElementsByClassName("drag");
      for(let i=0; i<drags.length;i++){
          drags[i].classList.remove("drag");
      }
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
      drag.style.border = 'none';

      //ムーブベントハンドラの消去
      document.body.removeEventListener("mousemove", mMove, {passive:false});
      drag.removeEventListener("mouseup", mUp, {passive:false});
      document.body.removeEventListener("touchmove", mMove, {passive:false});
      drag.removeEventListener("touchend", mUp, {passive:false});

      //クラス名 .drag も消す
    //   drag.classList.remove("drag");
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
ctx.font = "50px fantasy";
console.log(ctx.measureText("Hello World!"));
cans[0].width = Math.ceil(ctx.measureText("Hello World!").width) + 30;
ctx.lineWidth = 5;
ctx.fillStyle = "#0ff";
ctx.font = "50px fantasy";
ctx.fillText("Hello World!!", 15, 50);
ctx.lineWidth = 4;
ctx.strokeStyle = "green";
ctx.strokeText("Hello World!!", 15, 50);
ctx.lineWidth = 2;
ctx.strokeStyle = "orange";
ctx.strokeText("Hello World!!", 15, 50);
ctx.lineWidth = 1;
ctx.strokeStyle = "yellow";
ctx.strokeText("Hello World!!", 15, 50);
cans[0].style.width = Math.ceil(ctx.measureText("Hello World!").width) + 30 + "px";


// 入力した文字列からフォントを作成する
const submit = document.getElementById('create_text');
const text = document.getElementById('text');
const ope = document.getElementById('operating-screen');
const range = document.getElementById('fontSize');
const sizeView = document.getElementById('fontSize-value');
let inputSize = range.value;
const fontColorRadio = document.getElementsByClassName('fontColor');
const fontLabel = document.getElementsByClassName('fontLabel');
const inputColor = () => {
    for(let i=0;i<fontColorRadio.length; i++){
        if(fontColorRadio[i].checked){
            return fontColorRadio[i].value;
        }
    }
    console.log('ERROR:GETTING INPUTTED COLOR');
    return 'black';
}
console.log(`fontLabelLength:${fontLabel.length}radioLength:${fontColorRadio.length}inputColor:${inputColor()}`);
for(let index=0;index<fontColorRadio.length; index++){
    fontLabel[index].addEventListener('click',() => {
        for(let j=0; j<fontColorRadio.length; j++){
            fontLabel[j].style.fontSize = '40px';
        }
        fontLabel[index].style.fontSize = '20px';
        return;
    });
}

sizeView.innerText = inputSize;
range.addEventListener('input',(e) => {
    const setCurrentSize = (value) => {
        sizeView.innerText = value;
    }
    setCurrentSize(e.target.value);
},{passive:false});
let fontId = 1;
submit.addEventListener('click',() => {
    let inputtedColor = inputColor();
    let inputEl = text.value;
    inputSize = range.value;
    if(inputEl === "") return;
    console.log(`${inputEl},${inputSize},${inputtedColor}`);
    let newFont = document.createElement('canvas');
    newFont.className = 'character';
    let h = parseInt(inputSize) + 30;
    newFont.height = h;
    newFont.style.height = `${h}px`;
    ope.appendChild(newFont);
    console.log(newFont);
    cans = document.getElementsByClassName('character');
    for(let i = 0; i<cans.length; i++){
        cans[i].addEventListener("mousedown",mDown, {passive:false});
        cans[i].addEventListener("touchstart",mDown, {passive:false});
    }
    let writeNewCanvas = (id,font,size,color) => {
        ctx = cans[id].getContext("2d");
        ctx.lineWidth = 5;
        ctx.fillStyle = color;
        ctx.font = `bold ${size}px fantasy`;
        cans[id].width = Math.ceil(ctx.measureText(font).width) + 30;
        ctx.lineWidth = 5;
        ctx.fillStyle = color;
        ctx.font = `bold ${size}px fantasy`;
        ctx.fillText(font, 15, size);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "orange";
        ctx.strokeText(font, 15, size);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "yellow";
        ctx.strokeText(font, 15, size);
        console.log(Math.ceil(ctx.measureText(font).width) + 10);
        cans[id].style.width = Math.ceil(ctx.measureText(font).width) + 30 + "px";
        text.value = '';
        }
    writeNewCanvas(fontId,inputEl,parseInt(inputSize),inputtedColor);
    console.log(cans);
    fontId++;

},{passive:false})

