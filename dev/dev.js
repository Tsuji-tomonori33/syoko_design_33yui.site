// ===== スタンプ配置用（%単位） =====
const initialPositions = {
  stamp1: { left: 11.5, top: 19.95 },
  stamp2: { left: 64.67, top: 23.84 },
  stamp3: { left: 26, top: 42.31 },
  stamp4: { left: 65.17, top: 53.28 },
  stamp5: { left: 13.83, top: 75.19 }
};

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".card-container");
  const stamps = document.querySelectorAll(".stamp");
  const resetBtn = document.getElementById("reset");
  const logBtn = document.getElementById("log");
  const output = document.getElementById("output");

  // 初期位置を設定
  Object.entries(initialPositions).forEach(([id, pos]) => {
    const stamp = document.getElementById(id);
    if (stamp) {
      stamp.style.left = `${pos.left}%`;
      stamp.style.top = `${pos.top}%`;
    }
  });

  // ===== ドラッグ移動機能 =====
  let activeStamp = null;
  let offsetX = 0;
  let offsetY = 0;

  stamps.forEach(stamp => {
    stamp.addEventListener("mousedown", startDrag);
    stamp.addEventListener("touchstart", startDrag, { passive: false });
  });

  function startDrag(e) {
    e.preventDefault();
    activeStamp = e.target;
    const rect = container.getBoundingClientRect();
    const stampRect = activeStamp.getBoundingClientRect();
    offsetX = (e.clientX || e.touches[0].clientX) - stampRect.left;
    offsetY = (e.clientY || e.touches[0].clientY) - stampRect.top;

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", endDrag);
  }

  function drag(e) {
    if (!activeStamp) return;
    e.preventDefault();

    const rect = container.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    let left = ((clientX - rect.left - offsetX) / rect.width) * 100;
    let top = ((clientY - rect.top - offsetY) / rect.height) * 100;

    // はみ出し防止
    left = Math.min(90, Math.max(0, left));
    top = Math.min(90, Math.max(0, top));

    activeStamp.style.left = `${left}%`;
    activeStamp.style.top = `${top}%`;
  }

  function endDrag() {
    if (!activeStamp) return;
    activeStamp = null;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", endDrag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", endDrag);
  }

  // ===== 座標出力 =====
  logBtn.addEventListener("click", () => {
    const positions = {};
    stamps.forEach(stamp => {
      const left = parseFloat(stamp.style.left);
      const top = parseFloat(stamp.style.top);
      positions[stamp.id] = { left, top };
    });
    const text = JSON.stringify(positions, null, 2);
    output.textContent = text;
    console.log("スタンプ座標:", text);
  });

  // ===== リセット =====
  resetBtn.addEventListener("click", () => {
    Object.entries(initialPositions).forEach(([id, pos]) => {
      const stamp = document.getElementById(id);
      stamp.style.left = `${pos.left}%`;
      stamp.style.top = `${pos.top}%`;
    });
    output.textContent = "";
  });
});
