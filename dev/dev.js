const stamps = document.querySelectorAll(".stamp");
const sizeSlider = document.getElementById("size-slider");

// ドラッグ機能
stamps.forEach(stamp => {
  let isDragging = false;
  let offsetX, offsetY;

  stamp.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = stamp.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    stamp.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const board = document.querySelector(".stamp-board");
    const boardRect = board.getBoundingClientRect();
    let left = e.clientX - boardRect.left - offsetX;
    let top = e.clientY - boardRect.top - offsetY;

    left = Math.max(0, Math.min(left, boardRect.width - stamp.offsetWidth));
    top = Math.max(0, Math.min(top, boardRect.height - stamp.offsetHeight));

    stamp.style.left = left + "px";
    stamp.style.top = top + "px";
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      stamp.style.cursor = "grab";
    }
  });
});

// スライダーで全スタンプの大きさ変更
sizeSlider.addEventListener("input", () => {
  const sizePercent = sizeSlider.value + "%";
  stamps.forEach(stamp => {
    stamp.style.width = sizePercent;
  });
});

// JSON出力
document.getElementById("export").addEventListener("click", () => {
  const data = {};
  stamps.forEach(stamp => {
    data[stamp.id] = {
      left: stamp.style.left,
      top: stamp.style.top,
      width: stamp.style.width
    };
  });
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
});
