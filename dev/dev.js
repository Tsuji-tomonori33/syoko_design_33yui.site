// スタンプの初期位置（背景に対する比率指定）
const initialPositions = {
  stamp1: { left: 20, top: 30 }, // %
  stamp2: { left: 40, top: 45 },
  stamp3: { left: 60, top: 25 },
  stamp4: { left: 70, top: 60 },
  stamp5: { left: 50, top: 75 },
};

// 各スタンプを配置
window.addEventListener("load", () => {
  Object.keys(initialPositions).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const { left, top } = initialPositions[id];
      el.style.left = `${left}%`;
      el.style.top = `${top}%`;
    }
  });
});

// ドラッグ移動機能
const container = document.querySelector(".card-container");
let current = null;
let offsetX = 0, offsetY = 0;

document.querySelectorAll(".draggable").forEach(stamp => {
  stamp.addEventListener("mousedown", startDrag);
  stamp.addEventListener("touchstart", startDrag, { passive: false });
});

function startDrag(e) {
  e.preventDefault();
  current = e.target;

  const rect = container.getBoundingClientRect();
  const stampRect = current.getBoundingClientRect();

  if (e.touches) {
    offsetX = e.touches[0].clientX - stampRect.left;
    offsetY = e.touches[0].clientY - stampRect.top;
  } else {
    offsetX = e.clientX - stampRect.left;
    offsetY = e.clientY - stampRect.top;
  }

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchmove", onDrag, { passive: false });
  document.addEventListener("touchend", endDrag);
}

function onDrag(e) {
  if (!current) return;
  e.preventDefault();

  const rect = container.getBoundingClientRect();
  let x, y;

  if (e.touches) {
    x = e.touches[0].clientX - rect.left - offsetX;
    y = e.touches[0].clientY - rect.top - offsetY;
  } else {
    x = e.clientX - rect.left - offsetX;
    y = e.clientY - rect.top - offsetY;
  }

  const leftPercent = (x / rect.width) * 100;
  const topPercent = (y / rect.height) * 100;

  // 枠外に出ないよう制限
  current.style.left = Math.min(95, Math.max(0, leftPercent)) + "%";
  current.style.top = Math.min(95, Math.max(0, topPercent)) + "%";
}

function endDrag() {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", endDrag);
  current = null;
}

// リセットボタン
document.getElementById("reset-button").addEventListener("click", () => {
  Object.keys(initialPositions).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.left = `${initialPositions[id].left}%`;
      el.style.top = `${initialPositions[id].top}%`;
    }
  });
});
