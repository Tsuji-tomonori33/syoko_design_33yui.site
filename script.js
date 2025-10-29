const stampIds = ["stamp1","stamp2","stamp3","stamp4","stamp5"];
const stampPositions = {
  "stamp1": { left: 11.5, top: 19.95227741745283 },
  "stamp2": { left: 64.66666666666666, top: 23.843786851415093 },
  "stamp3": { left: 26, top: 42.31095224056604 },
  "stamp4": { left: 65.16666666666666, top: 53.277933372641506 },
  "stamp5": { left: 13.833333333333334, top: 75.18794221698113 }
};

// スタンプ位置を反映
function applyStampPositions() {
  const bg = document.querySelector(".background");
  if(!bg) return;

  const bgWidth = bg.clientWidth;
  const bgHeight = bg.clientHeight;

  stampIds.forEach(id => {
    const stamp = document.getElementById(id);
    if(localStorage.getItem(id) === "get") {
      stamp.style.display = "block";
      const pos = stampPositions[id];
      stamp.style.left = `${(pos.left / 100) * bgWidth}px`;
      stamp.style.top = `${(pos.top / 100) * bgHeight}px`;
    } else {
      stamp.style.display = "none";
    }
  });
}

// リセットボタン
const resetButton = document.getElementById("reset-button");
if(resetButton){
  resetButton.addEventListener("click", () => {
    if(confirm("スタンプをリセットしますか？")){
      stampIds.forEach(id => {
        localStorage.removeItem(id);
      });
      applyStampPositions();
    }
  });
}

// 初期表示
window.addEventListener("DOMContentLoaded", applyStampPositions);
window.addEventListener("resize", applyStampPositions);
