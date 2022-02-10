(function(){

  //要素の取得
  var elements = document.getElementsByClassName("drag-and-drop");

  //要素内のクリックされた位置を取得するグローバル（のような）変数
  var x;
  var y;

  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for(var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("mousedown", mDown, false);
      elements[i].addEventListener("touchstart", mDown, false);
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
      document.body.addEventListener("mousemove", mMove, false);
      document.body.addEventListener("touchmove", mMove, false);
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

      //マウスが動いた場所に要素を動かす
      drag.style.top = event.pageY - y + "px";
      drag.style.left = event.pageX - x + "px";

      //マウスボタンが離されたとき、またはカーソルが外れたとき発火
      drag.addEventListener("mouseup", mUp, false);
      document.body.addEventListener("mouseleave", mUp, false);
      drag.addEventListener("touchend", mUp, false);
      document.body.addEventListener("touchleave", mUp, false);

  }

  //マウスボタンが上がったら発火
  function mUp(e) {
      var drag = document.getElementsByClassName("drag")[0];

      //ムーブベントハンドラの消去
      document.body.removeEventListener("mousemove", mMove, false);
      drag.removeEventListener("mouseup", mUp, false);
      document.body.removeEventListener("touchmove", mMove, false);
      drag.removeEventListener("touchend", mUp, false);

      //クラス名 .drag も消す
      drag.classList.remove("drag");
  }

})()
const body = document.getElementById('operating-screen');
const redBody = document.getElementById('redBody');
const greenBody = document.getElementById('greenBody');
const blueBody = document.getElementById('blueBody');
console.log(body);
console.log(redBody);
function changeBodyColor(color){
    console.log('started the method of changeBodyColor');
    body.style.backgroundColor = color;
}
redBody.addEventListener('click',changeBodyColor('FF0000'));
redBody.addEventListener('mousedown',changeBodyColor('FF0000'));
redBody.addEventListener('touchstart',changeBodyColor('FF0000'));
greenBody.addEventListener('click',changeBodyColor('00FF00'));
blueBody.addEventListener('click',changeBodyColor('0000FF'));
