const stampIds = ["stamp1","stamp2","stamp3","stamp4","stamp5"];

// 開発版出力JSON座標を反映
const stampPositions = {
  "stamp1": { left: 11.3333, top: 19.8113 },
  "stamp2": { left: 64.1667, top: 23.7258 },
  "stamp3": { left: 25.6667, top: 42.0751 },
  "stamp4": { left: 65.6667, top: 53.3958 },
  "stamp5": { left: 13.8333, top: 75.1879 }
};

// スタンプ位置を画面サイズに応じて適用
function applyStampPositions() {
  const bg = document.querySelector(".background");
  const bgWidth = bg.clientWidth;
  const bgHeight = bg.clientHeight;

  stampIds.forEach(id => {
    const stamp = document.getElementById(id);
    const pos = stampPositions[id];
    stamp.style.left = `${(pos.left / 100) * bgWidth}px`;
    stamp.style.top = `${(pos.top / 100) * bgHeight}px`;
  });
}

// QRコードでスタンプ獲得（localStorage管理）
function loadStamps() {
  stampIds.forEach(id => {
    const stamp = document.getElementById(id);
    if(localStorage.getItem(id) === "get") {
      stamp.style.display = "block";
    } else {
      stamp.style.display = "none";
    }
  });
}

// リセットボタン
document.getElementById("reset-button").addEventListener("click", () => {
  if(confirm("スタンプをリセットしますか？")) {
    stampIds.forEach(id => {
      localStorage.removeItem(id);
      document.getElementById(id).style.display = "none";
    });
  }
});

// 初期表示
window.addEventListener("DOMContentLoaded", () => {
  applyStampPositions();
  loadStamps();
});
window.addEventListener("resize", applyStampPositions);
