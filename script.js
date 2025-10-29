// 開発版で決めた座標とサイズ（相対％）
const stampPositions = {
  "stamp1": { "left": "10%", "top": "15%", "width": "12%" },
  "stamp2": { "left": "30%", "top": "40%", "width": "10%" },
  "stamp3": { "left": "50%", "top": "60%", "width": "15%" },
  "stamp4": { "left": "70%", "top": "35%", "width": "10%" },
  "stamp5": { "left": "60%", "top": "20%", "width": "12%" }
};

// スタンプ位置とサイズを適用
function applyStampPositions() {
  for (const [id, pos] of Object.entries(stampPositions)) {
    const stamp = document.getElementById(id);
    if (stamp) {
      stamp.style.left = pos.left;
      stamp.style.top = pos.top;
      stamp.style.width = pos.width;
    }
  }
}

// スタンプ状態反映
function loadStamps() {
  for (let i = 1; i <= 5; i++) {
    const stamp = document.getElementById("stamp" + i);
    const state = localStorage.getItem("stamp" + i);
    if (state === "get") {
      stamp.classList.add("collected");
    } else {
      stamp.classList.remove("collected");
    }
  }
  checkCompletion();
}

// 全スタンプ獲得チェック
function checkCompletion() {
  const allCollected = Array.from(document.querySelectorAll(".stamp"))
    .every(stamp => stamp.classList.contains("collected"));
  document.getElementById("complete-message").style.display =
    allCollected ? "block" : "none";
}

// スタンプクリックで手動獲得切替
document.querySelectorAll(".stamp").forEach(stamp => {
  stamp.addEventListener("click", () => {
    const id = stamp.id;
    const collected = stamp.classList.toggle("collected");
    if (collected) localStorage.setItem(id, "get");
    else localStorage.removeItem(id);
    checkCompletion();
  });
});

// リセットボタン
document.getElementById("reset-button").addEventListener("click", () => {
  if (!confirm("本当に全てのスタンプをリセットしますか？")) return;
  for (let i = 1; i <= 5; i++) localStorage.removeItem("stamp" + i);
  loadStamps();
});

// 初期化
window.addEventListener("DOMContentLoaded", () => {
  applyStampPositions();
  loadStamps();
});
