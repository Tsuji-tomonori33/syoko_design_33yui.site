// スタンプ初期設定（位置とサイズは仮）
const stampData = {
  stamp1: { left: 20, top: 20, size: 15 },
  stamp2: { left: 50, top: 30, size: 15 },
  stamp3: { left: 30, top: 60, size: 15 },
  stamp4: { left: 70, top: 50, size: 15 },
  stamp5: { left: 80, top: 75, size: 15 },
};

const card = document.getElementById("card");
const stampsContainer = document.getElementById("stamps");

// スタンプを生成
Object.keys(stampData).forEach(id => {
  const img = document.createElement("img");
  img.src = `../images/stamps/${id}.png`;
  img.id = id;
  img.className = "stamp";
  img.style.left = stampData[id].left + "%";
  img.style.top = stampData[id].top + "%";
  img.style.width = stampData[id].size + "%";

  // リサイズハンドル
  const handle = document.createElement("div");
  handle.className = "resize-handle";
  img.appendChild(handle);

  stampsContainer.appendChild(img);

  makeDraggableAndResizable(img);
});

function makeDraggableAndResizable(el) {
  let isDragging = false;
  let isResizing = false;
  let startX, startY, startWidth, startHeight, startLeft, startTop;

  const handle = el.querySelector(".resize-handle");

  el.addEventListener("mousedown", e => {
    if (e.target === handle) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = el.getBoundingClientRect();
    const parentRect = card.getBoundingClientRect();
    startLeft = ((rect.left - parentRect.left) / parentRect.width) * 100;
    startTop = ((rect.top - parentRect.top) / parentRect.height) * 100;
    e.preventDefault();
  });

  handle.addEventListener("mousedown", e => {
    e.stopPropagation();
    isResizing = true;
    startX = e.clientX;
    const rect = el.getBoundingClientRect();
    const parentRect = card.getBoundingClientRect();
    startWidth = (rect.width / parentRect.width) * 100;
    e.preventDefault();
  });

  document.addEventListener("mousemove", e => {
    const parentRect = card.getBoundingClientRect();

    if (isDragging) {
      const dx = ((e.clientX - startX) / parentRect.width) * 100;
      const dy = ((e.clientY - startY) / parentRect.height) * 100;
      el.style.left = startLeft + dx + "%";
      el.style.top = startTop + dy + "%";
    }

    if (isResizing) {
      const dw = ((e.clientX - startX) / parentRect.width) * 100;
      el.style.width = startWidth + dw + "%";
    }
  });

  document.addEventListener("mouseup", () => {
    if (isDragging || isResizing) updateOutput();
    isDragging = false;
    isResizing = false;
  });
}

// 📋 現在の配置情報を出力
function updateOutput() {
  const cardRect = card.getBoundingClientRect();
  const data = {};

  document.querySelectorAll(".stamp").forEach(el => {
    const rect = el.getBoundingClientRect();
    const parentRect = card.getBoundingClientRect();

    const id = el.id;
    data[id] = {
      left: ((rect.left - parentRect.left + rect.width / 2) / parentRect.width) * 100,
      top: ((rect.top - parentRect.top + rect.height / 2) / parentRect.height) * 100,
      size: (rect.width / parentRect.width) * 100
    };
  });

  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}

updateOutput();

// 🔄 リセット
document.getElementById("reset-btn").addEventListener("click", () => {
  Object.keys(stampData).forEach(id => {
    const el = document.getElementById(id);
    const data = stampData[id];
    el.style.left = data.left + "%";
    el.style.top = data.top + "%";
    el.style.width = data.size + "%";
  });
  updateOutput();
});

// 📋 出力ボタン
document.getElementById("export-btn").addEventListener("click", updateOutput);
