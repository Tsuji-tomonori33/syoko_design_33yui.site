const stamps = document.querySelectorAll(".stamp");
const board = document.getElementById("board");
const output = document.getElementById("output");
const exportBtn = document.getElementById("exportBtn");

stamps.forEach(stamp => {
  let offsetX, offsetY, isDragging = false;

  stamp.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - stamp.getBoundingClientRect().left;
    offsetY = e.clientY - stamp.getBoundingClientRect().top;
    stamp.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const boardRect = board.getBoundingClientRect();
    let x = e.clientX - boardRect.left - offsetX;
    let y = e.clientY - boardRect.top - offsetY;

    // 移動制限（ボード内）
    x = Math.max(0, Math.min(boardRect.width - stamp.offsetWidth, x));
    y = Math.max(0, Math.min(boardRect.height - stamp.offsetHeight, y));

    stamp.style.left = `${x}px`;
    stamp.style.top = `${y}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    stamp.style.zIndex = 1;
  });
});

// JSON出力ボタン
exportBtn.addEventListener("click", () => {
  const data = {};
  stamps.forEach(stamp => {
    data[stamp.id] = {
      left: stamp.style.left || "0px",
      top: stamp.style.top || "0px"
    };
  });
  const json = JSON.stringify(data, null, 2);
  output.textContent = json;
});
