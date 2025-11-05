const stampsContainer = document.getElementById("stamps");
const output = document.getElementById("output");
const zoomSlider = document.getElementById("zoom-slider");

let selectedStamp = null;

const stampData = {
  stamp1: { left: 11.5, top: 19.95, size: 15 },
  stamp2: { left: 64.67, top: 23.84, size: 15 },
  stamp3: { left: 26, top: 42.31, size: 15 },
  stamp4: { left: 65.17, top: 53.28, size: 15 },
  stamp5: { left: 13.83, top: 75.19, size: 15 },
};

// === スタンプ生成 ===
Object.keys(stampData).forEach(id => {
  const wrapper = document.createElement("div");
  wrapper.className = "stamp";
  wrapper.id = id;
  wrapper.style.left = stampData[id].left + "%";
  wrapper.style.top = stampData[id].top + "%";
  wrapper.style.width = stampData[id].size + "%";

  const img = document.createElement("img");
  img.src = `../images/stamps/${id}.png`;
  img.draggable = false;
  img.style.width = "100%";
  img.style.height = "auto";

  const resizer = document.createElement("div");
  resizer.className = "resizer";

  wrapper.appendChild(img);
  wrapper.appendChild(resizer);
  stampsContainer.appendChild(wrapper);

  makeDraggable(wrapper);
  makeResizable(wrapper, resizer);

  wrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    selectStamp(wrapper);
  });
});

function selectStamp(stamp) {
  document.querySelectorAll(".stamp").forEach(s => s.classList.remove("selected"));
  stamp.classList.add("selected");
  selectedStamp = stamp;
  updateOutput();
}

// === ドラッグ移動 ===
function makeDraggable(el) {
  let offsetX, offsetY;
  el.addEventListener("mousedown", startDrag);
  el.addEventListener("touchstart", startDrag);

  function startDrag(e) {
    if (e.target.classList.contains("resizer")) return;
    e.preventDefault();
    const rect = el.getBoundingClientRect();
    const containerRect = stampsContainer.getBoundingClientRect();
    offsetX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    offsetY = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", drag);
    document.addEventListener("touchend", stopDrag);
  }

  function drag(e) {
    const containerRect = stampsContainer.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - containerRect.left - offsetX;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - containerRect.top - offsetY;
    const leftPercent = (x / containerRect.width) * 100;
    const topPercent = (y / containerRect.height) * 100;

    el.style.left = `${leftPercent}%`;
    el.style.top = `${topPercent}%`;
    updateOutput();
  }

  function stopDrag() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", stopDrag);
  }
}

// === サイズ変更 ===
function makeResizable(el, resizer) {
  let startX, startWidth;

  resizer.addEventListener("mousedown", startResize);
  resizer.addEventListener("touchstart", startResize);

  function startResize(e) {
    e.preventDefault();
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    startWidth = parseFloat(el.style.width);

    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
    document.addEventListener("touchmove", resize);
    document.addEventListener("touchend", stopResize);
  }

  function resize(e) {
    const moveX = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
    const containerRect = stampsContainer.getBoundingClientRect();
    const deltaPercent = (moveX / containerRect.width) * 100;
    el.style.width = `${Math.max(5, startWidth + deltaPercent)}%`;
    updateOutput();
  }

  function stopResize() {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
    document.removeEventListener("touchmove", resize);
    document.removeEventListener("touchend", stopResize);
  }
}

// === ズーム ===
zoomSlider.addEventListener("input", () => {
  const scale = zoomSlider.value / 100;
  document.getElementById("card-container").style.transform = `scale(${scale})`;
});

// === 出力更新 ===
function updateOutput() {
  const data = {};
  document.querySelectorAll(".stamp").forEach(stamp => {
    data[stamp.id] = {
      left: parseFloat(stamp.style.left),
      top: parseFloat(stamp.style.top),
      size: parseFloat(stamp.style.width),
    };
  });
  output.textContent = JSON.stringify(data, null, 2);
}
updateOutput();

// === コピー ===
document.getElementById("export").addEventListener("click", () => {
  navigator.clipboard.writeText(output.textContent);
  alert("📋 座標をコピーしました！");
});

// 背景クリックで選択解除
document.getElementById("card-container").addEventListener("click", () => {
  document.querySelectorAll(".stamp").forEach(s => s.classList.remove("selected"));
  selectedStamp = null;
});
