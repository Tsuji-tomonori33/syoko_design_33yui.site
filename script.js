// スタンプの位置（％指定）→背景に対して相対配置
const stampPositions = {
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
};

window.addEventListener("DOMContentLoaded", () => {
  const stamps = document.querySelectorAll(".stamp");
  const completeMsg = document.getElementById("complete-message");
  const resetBtn = document.getElementById("reset-button");

  // スタンプ位置を設定
  Object.entries(stampPositions).forEach(([id, pos]) => {
    const stamp = document.getElementById(id);
    if (stamp) {
      stamp.style.left = `${pos.left}%`;
      stamp.style.top = `${pos.top}%`;
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
    if (confirm("本当にスタンプをリセットしますか？")) {
      stamps.forEach(stamp => stamp.classList.remove("visible"));
      localStorage.clear();
      completeMsg.style.display = "none";
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
