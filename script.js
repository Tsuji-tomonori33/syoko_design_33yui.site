// スタンプ位置データを外部JSONから読み込み
fetch("stampData.json")
  .then(response => response.json())
  .then(data => {
    applyStampPositions(data);
    initStamps();
  })
  .catch(error => console.error("スタンプデータの読み込みエラー:", error));

function applyStampPositions(data) {
  for (const [id, pos] of Object.entries(data)) {
    const stamp = document.getElementById(id);
    if (stamp) {
      stamp.style.left = pos.left;
      stamp.style.top = pos.top;
    }
  }
}

// スタンプ機能本体
function initStamps() {
  const stamps = document.querySelectorAll(".stamp");
  const message = document.getElementById("complete-message");
  const resetButton = document.getElementById("reset-button");

  // スタンプクリック処理
  stamps.forEach(stamp => {
    stamp.addEventListener("click", () => {
      stamp.classList.toggle("collected");
      checkCompletion();
    });
  });

  // 全取得チェック
  function checkCompletion() {
    const allCollected = Array.from(stamps).every(stamp =>
      stamp.classList.contains("collected")
    );
    message.style.display = allCollected ? "block" : "none";
  }

  // リセットボタン
  resetButton.addEventListener("click", () => {
    stamps.forEach(stamp => stamp.classList.remove("collected"));
    message.style.display = "none";
  });
}
