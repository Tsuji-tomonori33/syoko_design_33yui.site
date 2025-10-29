const stampIds = ["stamp1","stamp2","stamp3","stamp4","stamp5"];
const stampBoard = document.querySelector(".stamp-board");

let dragged = null;

// 初期配置（任意の座標）
const stampPositions = {
  "stamp1": { left: 10, top: 15 },
  "stamp2": { left: 30, top: 40 },
  "stamp3": { left: 50, top: 60 },
  "stamp4": { left: 70, top: 35 },
  "stamp5": { left: 60, top: 20 }
};

// スタンプを背景に対して配置
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

// ドラッグ開始
stampIds.forEach(id => {
  const stamp = document.getElementById(id);
  stamp.addEventListener("dragstart", e => {
    dragged = stamp;
  });
});

// ドロップ
stampBoard.addEventListener("dragover", e => e.preventDefault());
stampBoard.addEventListener("drop", e => {
  e.preventDefault();
  if (!dragged) return;
  const rect = stampBoard.getBoundingClientRect();
  const bg = document.querySelector(".background");
  const bgWidth = bg.clientWidth;
  const bgHeight = bg.clientHeight;

  // 相対座標を％で保存
  const leftPercent = ((e.clientX - rect.left - dragged.offsetWidth/2) / bgWidth) * 100;
  const topPercent = ((e.clientY - rect.top - dragged.offsetHeight/2) / bgHeight) * 100;

  stampPositions[dragged.id] = { left: leftPercent, top: topPercent };
  applyStampPositions();
  dragged = null;
});

// 出力ボタン
document.getElementById("output-button").addEventListener("click", () => {
  const jsonOutput = JSON.stringify(stampPositions, null, 2);
  document.getElementById("json-output").textContent = jsonOutput;
});

window.addEventListener("DOMContentLoaded", applyStampPositions);
window.addEventListener("resize", applyStampPositions);
