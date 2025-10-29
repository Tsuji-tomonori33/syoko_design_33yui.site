// 開発版で決めた座標とサイズ（％）
const stampPositions = {
  "stamp1": { "left": 10, "top": 15, "width": 12 },
  "stamp2": { "left": 30, "top": 40, "width": 10 },
  "stamp3": { "left": 50, "top": 60, "width": 15 },
  "stamp4": { "left": 70, "top": 35, "width": 10 },
  "stamp5": { "left": 60, "top": 20, "width": 12 }
};

function applyStampPositions() {
  const bg = document.querySelector(".background");
  const bgWidth = bg.clientWidth;
  const bgHeight = bg.clientHeight;

  for (const [id, pos] of Object.entries(stampPositions)) {
    const stamp = document.getElementById(id);
    if (stamp) {
      stamp.style.left = `${(pos.left/100)*bgWidth}px`;
      stamp.style.top = `${(pos.top/100)*bgHeight}px`;
      stamp.style.width = `${(pos.width/100)*bgWidth}px`;
    }
  }
}

function loadStamps() {
  for (let i = 1; i <= 5; i++) {
    const stamp = document.getElementById("stamp"+i);
    const state = localStorage.getItem("stamp"+i);
    if (state === "get") stamp.classList.add("collected");
    else stamp.classList.remove("collected");
  }
  checkCompletion();
}

function checkCompletion() {
  const allCollected = Array.from(document.querySelectorAll(".stamp"))
    .every(stamp => stamp.classList.contains("collected"));
  document.getElementById("complete-message").style.display = allCollected ? "block" : "none";
}

// 完全版ではクリックで消えないのでクリックイベント削除

document.getElementById("reset-button").addEventListener("click", () => {
  if (!confirm("本当に全てのスタンプをリセットしますか？")) return;
  for (let i=1;i<=5;i++) localStorage.removeItem("stamp"+i);
  loadStamps();
});

window.addEventListener("DOMContentLoaded", () => {
  applyStampPositions();
  loadStamps();
});
