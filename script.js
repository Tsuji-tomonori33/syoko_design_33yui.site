const stampIds = ["stamp1","stamp2","stamp3","stamp4","stamp5"];
const stampBoard = document.querySelector(".stamp-board");

// 開発版出力JSON座標を反映
const stampPositions = {
  "stamp1": { left: 11.333333333333332, top: 19.81132075471698 },
  "stamp2": { left: 64.16666666666667, top: 23.72586232311321 },
  "stamp3": { left: 25.666666666666664, top: 42.07510318396226 },
  "stamp4": { left: 65.66666666666666, top: 53.3958579009434 },
  "stamp5": { left: 13.833333333333334, top: 75.18794221698113 }
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
  });
}

// スタンプ獲得チェック（localStorage）
function loadStamps() {
  let complete = true;
  stampIds.forEach((id, i) => {
    if (localStorage.getItem(id) === "get") {
      document.getElementById(id).classList.add("got");
    } else {
      complete = false;
    }
  });

  if (complete) {
    document.getElementById("complete-message").style.display = "block";
  }
}

// スタンプクリックで獲得
stampIds.forEach(id => {
  const stamp = document.getElementById(id);
  stamp.addEventListener("click", () => {
    stamp.classList.add("got");
    localStorage.setItem(id, "get");
    loadStamps();
  });
});

// リセットボタン
document.getElementById("reset-button").addEventListener("click", () => {
  if (confirm("スタンプをリセットしますか？")) {
    stampIds.forEach(id => {
      localStorage.removeItem(id);
      document.getElementById(id).classList.remove("got");
    });
    document.getElementById("complete-message").style.display = "none";
  }
});

// 初期表示
window.addEventListener("DOMContentLoaded", () => {
  applyStampPositions();
  loadStamps();
});
window.addEventListener("resize", applyStampPositions);
