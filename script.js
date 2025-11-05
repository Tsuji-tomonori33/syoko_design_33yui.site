// スタンプの位置（％指定）→背景に対して相対配置
const stampPositions = {
  "stamp1": {
    "left": 14.5864,
    "top": 20.4145,
    "width": 30.6084
  },
  "stamp2": {
    "left": 64.8088,
    "top": 24.3451,
    "width": 30.6291
  },
  "stamp3": {
    "left": 28.5725,
    "top": 42.9095,
    "width": 30.2553
  },
  "stamp4": {
    "left": 65.3999,
    "top": 54.1336,
    "width": 30.298
  },
  "stamp5": {
    "left": 16.7736,
    "top": 75.9299,
    "width": 30.1325
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
