const stampIds = ["stamp1","stamp2","stamp3","stamp4","stamp5"];
const stampBoard = document.querySelector(".stamp-board");
let dragged = null;

// 初期座標（％）
const stampPositions = {
  "stamp1": { left: 10, top: 15, width: 80 },
  "stamp2": { left: 30, top: 40, width: 80 },
  "stamp3": { left: 50, top: 60, width: 80 },
  "stamp4": { left: 70, top: 35, width: 80 },
  "stamp5": { left: 60, top: 20, width: 80 }
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

// ドラッグ開始
stampIds.forEach(id => {
  const stamp = document.getElementById(id);
  stamp.addEventListener("dragstart", e => { dragged = stamp; });
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

  const leftPercent = ((e.clientX - rect.left - dragged.offsetWidth/2) / bgWidth) * 100;
  const topPercent = ((e.clientY - rect.top - dragged.offsetHeight/2) / bgHeight) * 100;

  stampPositions[dragged.id].left = leftPercent;
  stampPositions[dragged.id].top = topPercent;

  applyStampPositions();
  dragged = null;
});

// スライダーでサイズ変更
stampIds.forEach((id, index) => {
  const slider = document.getElementById(`size${index+1}`);
  slider.addEventListener("input", e => {
    const val = e.target.value;
    stampPositions[id].width = val;
    applyStampPositions();
  });
});

// 出力ボタン
document.getElementById("output-button").addEventListener("click", () => {
  const jsonOutput = JSON.stringify(stampPositions, null, 2);
  document.getElementById("json-output").textContent = jsonOutput;
});

window.addEventListener("DOMContentLoaded", applyStampPositions);
window.addEventListener("resize", applyStampPositions);
