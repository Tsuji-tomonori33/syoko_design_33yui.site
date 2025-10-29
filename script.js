const stampIds = ["stamp1","stamp2","stamp3","stamp4","stamp5"];
const stampPositions = {
  "stamp1": { left: 12.5, top: 20.541900058962266 },
  "stamp2": { left: 65.83333333333333, top: 24.43340949292453 },
  "stamp3": { left: 27.166666666666668, top: 42.78265035377358 },
  "stamp4": { left: 66.33333333333333, top: 53.985480542452834 },
  "stamp5": { left: 14.833333333333334, top: 75.65964033018868 }
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
