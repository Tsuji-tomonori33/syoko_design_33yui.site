const stampIds = ["stamp1","stamp2","stamp3","stamp4","stamp5"];
const stampBoard = document.querySelector(".stamp-board");

// 開発版で出力された固定座標（％）とサイズ（px）を反映
const stampPositions = {
  "stamp1": { left: 5.5, top: 12, width: 120 },
  "stamp2": { left: 0, top: 42, width: 120 },
  "stamp3": { left: 20, top: 61, width: 120 },
  "stamp4": { left: 53.5, top: 46, width: 120 },
  "stamp5": { left: 46, top: 28, width: 120 }
};

// スタンプ配置
function applyStampPositions() {
  const bg = document.querySelector(".background");
  const bgWidth = bg.clientWidth;
  const bgHeight = bg.clientHeight;

  stampIds.forEach(id => {
    const pos = stampPositions[id];
    const stamp = document.getElementById(id);
    stamp.style.left = `${(pos.left/100)*bgWidth}px`;
    stamp.style.top = `${(pos.top/100)*bgHeight}px`;
    stamp.querySelector("img").style.width = `${pos.width}px`;
  });
}

// スタンプ押下（localStorageに反映）
stampIds.forEach(id => {
  const stamp = document.getElementById(id);
  stamp.addEventListener("click", () => {
    localStorage.setItem(id,"get");
    applyStampGot();
  });
});

// スタンプ状態反映
function applyStampGot() {
  let complete = true;
  stampIds.forEach(id => {
    const stamp = document.getElementById(id).querySelector("img");
    if (localStorage.getItem(id) === "get") {
      stamp.style.opacity = 0.5; // 獲得済みは半透明
    } else {
      stamp.style.opacity = 1;
      complete = false;
    }
  });
  document.getElementById("complete-message").style.display = complete ? "block" : "none";
}

// リセット
document.getElementById("reset-button").addEventListener("click", () => {
  if (confirm("本当にリセットしますか？")) {
    stampIds.forEach(id => localStorage.removeItem(id));
    applyStampGot();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  applyStampPositions();
  applyStampGot();
});

window.addEventListener("resize", applyStampPositions);
