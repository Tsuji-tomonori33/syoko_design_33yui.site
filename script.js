const stampIds = ["stamp1","stamp2","stamp3","stamp4","stamp5"];
const stampBoard = document.querySelector(".stamp-board");

// 最新座標を反映
let stampPositions = {
  "stamp1": { left: 12.5, top: 20.541900058962266 },
  "stamp2": { left: 65.83333333333333, top: 24.43340949292453 },
  "stamp3": { left: 27.166666666666668, top: 42.78265035377358 },
  "stamp4": { left: 66.33333333333333, top: 53.985480542452834 },
  "stamp5": { left: 14.833333333333334, top: 75.65964033018868 }
};

// スタンプ初期配置
function applyStampPositions() {
  const bg = document.querySelector(".background");
  const bgWidth = bg.clientWidth;
  const bgHeight = bg.clientHeight;

  stampIds.forEach(id => {
    const stamp = document.getElementById(id);
    const pos = stampPositions[id];
    stamp.style.left = `${(pos.left/100)*bgWidth}px`;
    stamp.style.top = `${(pos.top/100)*bgHeight}px`;
  });
}

// ドラッグ機能
stampIds.forEach(id => {
  const stamp = document.getElementById(id);
  let offsetX, offsetY, isDragging = false;

  stamp.addEventListener("mousedown", e => {
    isDragging = true;
    const rect = stamp.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  document.addEventListener("mousemove", e => {
    if(!isDragging) return;
    const bg = document.querySelector(".background");
    const boardRect = bg.getBoundingClientRect();

    let left = e.clientX - boardRect.left - offsetX;
    let top = e.clientY - boardRect.top - offsetY;

    // 背景内で移動制限
    left = Math.max(0, Math.min(left, boardRect.width - stamp.offsetWidth));
    top = Math.max(0, Math.min(top, boardRect.height - stamp.offsetHeight));

    stamp.style.left = left + "px";
    stamp.style.top = top + "px";
  });

  document.addEventListener("mouseup", e => {
    if(isDragging){
      isDragging = false;
      // 相対座標（％）を保存
      const bg = document.querySelector(".background");
      const bgRect = bg.getBoundingClientRect();
      stampPositions[id].left = (parseFloat(stamp.style.left)/bgRect.width)*100;
      stampPositions[id].top = (parseFloat(stamp.style.top)/bgRect.height)*100;
    }
  });
});

// 出力ボタン
document.getElementById("export-button").addEventListener("click", () => {
  document.getElementById("output-json").textContent = JSON.stringify(stampPositions, null, 2);
});

// 初期表示
window.addEventListener("DOMContentLoaded", () => {
  applyStampPositions();
});
window.addEventListener("resize", applyStampPositions);
