// スタンプ状態を localStorage から読み込んで反映
function loadStamps() {
  for (let i = 1; i <= 5; i++) {
    const stamp = document.getElementById("stamp" + i);
    const state = localStorage.getItem("stamp" + i);
    if (state === "get") {
      stamp.classList.add("collected");
      stamp.querySelector("img").src = `images/stamps/stamp${i}_got.png`;
    } else {
      stamp.classList.remove("collected");
      stamp.querySelector("img").src = `images/stamps/stamp${i}.png`;
    }
  }

  // 全スタンプ獲得チェック
  checkCompletion();
}

// 全スタンプ獲得チェック
function checkCompletion() {
  const stamps = document.querySelectorAll(".stamp");
  const completeMsg = document.getElementById("complete-message");
  const allCollected = Array.from(stamps).every(stamp =>
    stamp.classList.contains("collected")
  );
  completeMsg.style.display = allCollected ? "block" : "none";
}

// スタンプクリックで手動切り替え
const stamps = document.querySelectorAll(".stamp");
stamps.forEach(stamp => {
  stamp.addEventListener("click", () => {
    const id = stamp.id;
    const collected = stamp.classList.toggle("collected");
    if (collected) {
      stamp.querySelector("img").src = `images/stamps/${id}_got.png`;
      localStorage.setItem(id, "get");
    } else {
      stamp.querySelector("img").src = `images/stamps/${id}.png`;
      localStorage.removeItem(id);
    }
    checkCompletion();
  });
});

// リセットボタン
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  for (let i = 1; i <= 5; i++) {
    localStorage.removeItem("stamp" + i);
  }
  loadStamps();
});

// ページロード時に反映
window.addEventListener("DOMContentLoaded", loadStamps);
