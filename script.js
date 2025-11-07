// スタンプの位置とサイズ（％指定）
// !!!!! 開発版 (dev/dev.html) で「📋 座標を出力」ボタンを押して出力された内容を、
// !!!!! この 'const stampPositions = {};' の中身と入れ替えてください。
const stampPositions = {
  // --- 開発版で調整後、このブロック全体を上書きペーストしてください ---
  "stamp1": {
    "left": 13.646,
    "top": 19.8733,
    "width": 32.3753
  },
  "stamp2": {
    "left": 63.9823,
    "top": 23.9953,
    "width": 32.4115
  },
  "stamp3": {
    "left": 27.142,
    "top": 42.135,
    "width": 32.6159
  },
  "stamp4": {
    "left": 64.5721,
    "top": 53.3874,
    "width": 32.4503
  },
  "stamp5": {
    "left": 15.8889,
    "top": 75.4373,
    "width": 32.0752
  }
  // ----------------------------------------------------------------
};

window.addEventListener("DOMContentLoaded", () => {
  const stamps = document.querySelectorAll(".stamp");
  const completeMsg = document.getElementById("complete-message");
  const resetBtn = document.getElementById("reset-button");

  // スタンプ位置とサイズを設定
  Object.entries(stampPositions).forEach(([id, pos]) => {
    const stamp = document.getElementById(id);
    if (stamp) {
      // 開発版で設定した位置とサイズ（%）を反映
      stamp.style.left = `${pos.left}%`;
      stamp.style.top = `${pos.top}%`;
      stamp.style.width = `${pos.width}%`;
    }
  });

  // ローカルストレージをチェックしてスタンプを表示
  stamps.forEach(stamp => {
    const key = stamp.id;
    if (localStorage.getItem(key) === "get") {
      stamp.classList.add("visible");
    }
  });

  // 全部押されたらメッセージ表示
  checkCompletion();

  // リセットボタン
  resetBtn.addEventListener("click", () => {
    // ご要望の確認画面を表示
    if (confirm("スタンプカードをリセットしますか？\n（獲得したスタンプがすべて消えます）")) {
      stamps.forEach(stamp => stamp.classList.remove("visible"));
      // ローカルストレージをクリア
      localStorage.clear();
      completeMsg.style.display = "none";
      alert("スタンプカードをリセットしました！");
    }
  });
});

// スタンプが全て押されたか確認
function checkCompletion() {
  const allGot = [1, 2, 3, 4, 5].every(num => localStorage.getItem(`stamp${num}`) === "get");
  if (allGot) {
    document.getElementById("complete-message").style.display = "block";
  }
}
