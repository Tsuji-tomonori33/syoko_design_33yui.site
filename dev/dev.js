const stamps = document.querySelectorAll(".stamp");

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

    // ボード内に制限
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

// JSON出力
document.getElementById("export").addEventListener("click", () => {
  const data = {};
  stamps.forEach(stamp => {
    data[stamp.id] = {
      left: stamp.style.left,
      top: stamp.style.top
    };
  });
  const output = document.getElementById("output");
  output.textContent = JSON.stringify(data, null, 2);
});
