// 開発版で取得した座標データを反映
const stampData = {
  stamp1: { left: 11.5, top: 19.95, size: 15 },
  stamp2: { left: 64.67, top: 23.84, size: 15 },
  stamp3: { left: 26.0, top: 42.31, size: 15 },
  stamp4: { left: 65.17, top: 53.28, size: 15 },
  stamp5: { left: 13.83, top: 75.19, size: 15 },
};

const stampsContainer = document.getElementById("stamps");

// 各スタンプを生成
Object.keys(stampData).forEach(id => {
  const img = document.createElement("img");
  const isGot = localStorage.getItem(id) === "got";
  img.src = isGot
    ? `images/stamps/${id}_got.png`
    : `images/stamps/${id}.png`;
  img.id = id;
  img.className = "stamp";
  img.style.left = stampData[id].left + "%";
  img.style.top = stampData[id].top + "%";
  img.style.width = stampData[id].size + "%";
  if (isGot) img.classList.add("visible");

  stampsContainer.appendChild(img);
});

// コンプリート判定
function checkCompletion() {
  const allGot = Object.keys(stampData).every(
    id => localStorage.getItem(id) === "got"
  );
  document.getElementById("complete-message").style.display = allGot
    ? "block"
    : "none";
}
checkCompletion();

// リセットボタン
document.getElementById("reset-button").addEventListener("click", () => {
  Object.keys(stampData).forEach(id => localStorage.removeItem(id));
  location.reload();
});
