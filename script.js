// 開発版で調整した値（比率で統一）
const stampData = {
  "stamp1": {
    "left": 64.9524,
    "top": 24.3966,
    "width": 30.2566
  },
  "stamp2": {
    "left": 14.4971,
    "top": 20.7041,
    "width": 30.4636
  },
  "stamp3": {
    "left": 28.4652,
    "top": 42.8794,
    "width": 30.1027
  },
  "stamp4": {
    "left": 65.5267,
    "top": 54.0957,
    "width": 29.9371
  },
  "stamp5": {
    "left": 16.6093,
    "top": 75.8046,
    "width": 30.4377
  }
};

// スタンプ生成処理
const stampsContainer = document.getElementById("stamps");

Object.keys(stampData).forEach(id => {
  const img = document.createElement("img");
  const isGot = localStorage.getItem(id) === "got";
  img.src = isGot
    ? `images/stamps/${id}_got.png`
    : `images/stamps/${id}.png`;
  img.id = id;
  img.className = "stamp";

  // 開発版の比率データをそのまま反映
  const data = stampData[id];
  img.style.left = data.left + "%";
  img.style.top = data.top + "%";
  img.style.width = data.size + "%";

  stampsContainer.appendChild(img);
});

// スタンプがすべて揃ったらメッセージ表示
function checkCompletion() {
  const allGot = Object.keys(stampData).every(
    id => localStorage.getItem(id) === "got"
  );
  if (allGot) {
    document.getElementById("complete-message").style.display = "block";
  } else {
    document.getElementById("complete-message").style.display = "none";
  }
}
checkCompletion();

// リセットボタン
document.getElementById("reset-button").addEventListener("click", () => {
  Object.keys(stampData).forEach(id => localStorage.removeItem(id));
  location.reload();
});
