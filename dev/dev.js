const stampsContainer = document.getElementById("stamps");
const zoomSlider = document.getElementById("zoom-slider");
const sizeSlider = document.getElementById("size-slider");
const output = document.getElementById("output");

let zoom = 1.0;
let activeStamp = null;
let offsetX, offsetY;

// スタンプ定義
const stampIds = ["stamp1", "stamp2", "stamp3", "stamp4", "stamp5"];
let stampData = {};

// カード背景
const cardBg = document.getElementById("card-bg");
cardBg.onload = initStamps;

function initStamps() {
  stampsContainer.innerHTML = "";
  const rect = cardBg.getBoundingClientRect();

  stampIds.forEach((id, i) => {
    const img = document.createElement("img");
    img.src = `../images/stamps/${id}.png`;
    img.id = id;
    img.style.left = `${20 + i * 15}%`;
    img.style.top = `${30 + i * 10}%`;
    img.style.width = `${sizeSlider.value}%`;

    img.addEventListener("mousedown", startDrag);
    img.addEventListener("touchstart", startDrag);
    stampsContainer.appendChild(img);

    stampData[id] = { left: 20 + i * 15, top: 30 + i * 10, size: parseFloat(sizeSlider.value) };
  });
}

// ドラッグ開始
function startDrag(e) {
  e.preventDefault();
  activeStamp = e.target;
  const rect = cardBg.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  offsetX = clientX - rect.left - (parseFloat(activeStamp.style.left) / 100) * rect.width;
  offsetY = clientY - rect.top - (parseFloat(activeStamp.style.top) / 100) * rect.height;

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("touchmove", onDrag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
}

// ドラッグ中
function onDrag(e) {
  if (!activeStamp) return;
  const rect = cardBg.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const x = ((clientX - rect.left - offsetX) / rect.width) * 100;
  const y = ((clientY - rect.top - offsetY) / rect.height) * 100;
  activeStamp.style.left = `${x}%`;
  activeStamp.style.top = `${y}%`;
}

// ドラッグ終了
function endDrag() {
  if (activeStamp) {
    const id = activeStamp.id;
    stampData[id] = {
      left: parseFloat(activeStamp.style.left),
      top: parseFloat(activeStamp.style.top),
      size: parseFloat(activeStamp.style.width),
    };
  }
  activeStamp = null;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchend", endDrag);
  updateOutput();
}

// ズーム操作
zoomSlider.addEventListener("input", () => {
  zoom = zoomSlider.value / 100;
  stampsContainer.style.transform = `scale(${zoom})`;
});

// サイズ変更
sizeSlider.addEventListener("input", () => {
  const newSize = parseFloat(sizeSlider.value);
  document.querySelectorAll("#stamps img").forEach(img => {
    img.style.width = `${newSize}%`;
    stampData[img.id].size = newSize;
  });
  updateOutput();
});

// JSON出力
function updateOutput() {
  const json = JSON.stringify(stampData, null, 2);
  output.value = `const stampData = ${json};`;
}

// クリップボードにコピー
document.getElementById("save").addEventListener("click", () => {
  updateOutput();
  output.select();
  document.execCommand("copy");
  alert("JSONをコピーしました！\n完全版の script.js に貼り付けてください。");
});

// リセット
document.getElementById("reset").addEventListener("click", () => {
  initStamps();
  updateOutput();
});
