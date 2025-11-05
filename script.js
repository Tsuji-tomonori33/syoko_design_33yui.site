// 開発版で調整した値（比率で統一）
const stampData = {
  stamp1: { left: 11.5, top: 19.95, size: 15 },
  stamp2: { left: 64.67, top: 23.84, size: 15 },
  stamp3: { left: 26.0, top: 42.31, size: 15 },
  stamp4: { left: 65.17, top: 53.28, size: 15 },
  stamp5: { left: 13.83, top: 75.19, size: 15 },
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
