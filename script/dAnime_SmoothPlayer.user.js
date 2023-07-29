// ==UserScript==
// @name        dアニメストア スムーズプレイヤー
// @namespace   https://github.com/chimaha/dAnimeSmoothPlayer
// @match       https://animestore.docomo.ne.jp/animestore/sc_d_pc*
// @grant       none
// @version     1.1
// @author      chimaha
// @description dアニメストアのFirefox限定フリーズバグを擬似的に回避します 
// @license     MIT license
// @icon        https://animestore.docomo.ne.jp/favicon.ico
// @compatible  firefox
// @downloadURL https://github.com/chimaha/dAnimeSmoothPlayer/raw/main/script/dAnime_SmoothPlayer.user.js
// @updateURL   https://github.com/chimaha/dAnimeSmoothPlayer/raw/main/script/dAnime_SmoothPlayer.user.js
// @supportURL  https://github.com/chimaha/dAnimeSmoothPlayer/issues
// ==/UserScript==

/*! dアニメストア スムーズプレイヤー | MIT license | https://github.com/chimaha/dAnimeSmoothPlayer/blob/main/LICENSE */

const video = document.querySelector('video');
function freezeRemover(setTime) {
    console.log(setTime);
    const observer = new MutationObserver(() => {
        observer.disconnect();
        let time = video.currentTime;
        video.currentTime = time - 5;
        setTimeout(() => {
            video.currentTime = time;
        }, setTime);
    });
    const config = { childList: true };
    observer.observe(document.querySelector("#time"), config);
}

// 動画を開いた時
freezeRemover(250);

// シークバーをクリックした時
const seekbar = document.querySelector('.seekArea');
seekbar.addEventListener("mouseup", () => {
    console.log("クリック");
    freezeRemover(400);
});

// シークバー下の30秒戻るボタンを押した時
const backButton = document.querySelector('.buttonArea > .back');
backButton.addEventListener("click", () => {
    console.log("クリック");
    freezeRemover(400);
});

// 左矢印キーとjキーを押した時
document.addEventListener("keyup", e => {
    if (e.key == "ArrowLeft" || e.key == "j") {
        console.log(e.key);
        freezeRemover(480)
    }
});