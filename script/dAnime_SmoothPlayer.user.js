// ==UserScript==
// @name        dアニメストア スムーズプレイヤー
// @namespace   https://github.com/chimaha/dAnimeSmoothPlayer
// @match       https://animestore.docomo.ne.jp/animestore/sc_d_pc*
// @grant       none
// @version     1.4
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
    const observer = new MutationObserver(() => {
        observer.disconnect();
        let time = video.currentTime;
        video.currentTime = time - 3;
        video.pause();
        setTimeout(() => {
            video.currentTime = time;
            video.play();
        }, setTime);
    });
    const config = { childList: true };
    observer.observe(document.querySelector("#time"), config);
}


// 動画を開いた時
freezeRemover(300);

// シークバーをクリックした時
const seekbar = document.querySelector('.seekArea');
seekbar.addEventListener("mouseup", () => {
    freezeRemover(400);
});

// シークバー下の30秒戻るボタンを押した時
const backButton = document.querySelector('.buttonArea > .back');
backButton.addEventListener("click", () => {
    freezeRemover(400);
});

// 左矢印キーとjキーを押した時
document.addEventListener("keyup", e => {
    if (e.key == "ArrowLeft" || e.key == "j") {
        freezeRemover(400);
    }
});

// 10秒以上一時停止した場合、再生再開時に実行
let stopTime;
let startTIme;
video.addEventListener("pause", () => {
    stopTime = new Date();
})
video.addEventListener("play", () => {
    if (stopTime) {
        startTIme = new Date();
        const sec = (startTIme.getTime() - stopTime.getTime()) / 1000;
        if (sec > 10) {
            freezeRemover(0);
        }
    }
})