// ===== スタンプ初期位置・サイズ（%単位） =====
const initialPositions = {
  stamp1: { left: 11.5, top: 19.95, width: 18 },
  stamp2: { left: 64.67, top: 23.84, width: 18 },
  stamp3: { left: 26, top: 42.31, width: 18 },
  stamp4: { left: 65.17, top: 53.28, width: 18 },
  stamp5: { left: 13.83, top: 75.19, width: 18 }
};

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".card-container");
  const stamps = document.querySelectorAll(".stamp-wrapper");
  const resetBtn = document.getElementById("reset");
  const logBtn = document.getElementById("log");
  const output = document.getElementById("output");

  // ===== 初期化 =====
  stamps.forEach(stamp => {
    const id = stamp.id;
    const pos = initialPositions[id];
    stamp.style.left = `${pos.left}%`;
    stamp.style.top = `${pos.top}%`;
    stamp.style.width = `${pos.width}%`;

    // サイズ変更ハンドル追加
    const handle = document.createElement("div");
    handle.className = "resize-handle";
    stamp.appendChild(handle);
  });

  // ===== ドラッグ移動 =====
  let activeStamp = null;
  let offsetX = 0, offsetY = 0;
  let mode = "move"; // "move" or "resize"
  let startWidth = 0;
  let startX = 0;
  let startY = 0;

  stamps.forEach(stamp => {
    const handle = stamp.querySelector(".resize-handle");

    // 位置移動
    stamp.addEventListener("mousedown", e => {
      if (e.target.classList.contains("resize-handle")) return;
      e.preventDefault();
      startMove(e, stamp);
    });
    stamp.addEventListener("touchstart", e => {
      if (e.target.classList.contains("resize-handle")) return;
      e.preventDefault();
      startMove(e.touches[0], stamp);
    });

    // サイズ変更
    handle.addEventListener("mousedown", e => {
      e.preventDefault();
      startResize(e, stamp);
    });
    handle.addEventListener("touchstart", e => {
      e.preventDefault();
      startResize(e.touches[0], stamp);
    });
  });

  function startMove(e, stamp) {
    mode = "move";
    activeStamp = stamp;
    const rect = container.getBoundingClientRect();
    const sRect = stamp.getBoundingClientRect();
    offsetX = e.clientX - sRect.left;
    offsetY = e.clientY - sRect.top;

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchmove", onDrag, { passive: false });
    document.addEventListener("touchend", endDrag);
  }

  function startResize(e, stamp) {
    mode = "resize";
    activeStamp = stamp;
    const rect = container.getBoundingClientRect();
    startWidth = stamp.getBoundingClientRect().width;
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchmove", onDrag, { passive: false });
    document.addEventListener("touchend", endDrag);
  }

  function onDrag(e) {
    if (!activeStamp) return;
    const event = e.touches ? e.touches[0] : e;
    const rect = container.getBoundingClientRect();

    if (mode === "move") {
      let left = ((event.clientX - rect.left - offsetX) / rect.width) * 100;
      let top = ((event.clientY - rect.top - offsetY) / rect.height) * 100;
      left = Math.max(0, Math.min(90, left));
      top = Math.max(0, Math.min(90, top));
      activeStamp.style.left = `${left}%`;
      activeStamp.style.top = `${top}%`;
    } else if (mode === "resize") {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const dist = Math.max(dx, dy);
      const deltaPercent = (dist / rect.width) * 100;
      let newWidth = startWidth / rect.width * 100 + deltaPercent;
      newWidth = Math.max(5, Math.min(50, newWidth));
      activeStamp.style.width = `${newWidth}%`;
    }
  }

  function endDrag() {
    activeStamp = null;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", endDrag);
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("touchend", endDrag);
  }

  // ===== 出力 =====
  logBtn.addEventListener("click", () => {
    const result = {};
    stamps.forEach(stamp => {
      const id = stamp.id;
      const left = parseFloat(stamp.style.left);
      const top = parseFloat(stamp.style.top);
      const width = parseFloat(stamp.style.width);
      result[id] = { left, top, width };
    });
    const text = JSON.stringify(result, null, 2);
    output.textContent = text;
    console.log("📋 現在のスタンプ位置・サイズ:\n", text);
  });

  // ===== リセット =====
  resetBtn.addEventListener("click", () => {
    stamps.forEach(stamp => {
      const pos = initialPositions[stamp.id];
      stamp.style.left = `${pos.left}%`;
      stamp.style.top = `${pos.top}%`;
      stamp.style.width = `${pos.width}%`;
    });
    output.textContent = "";
  });
});
