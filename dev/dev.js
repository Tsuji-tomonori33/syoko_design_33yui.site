const stampsContainer = document.getElementById("stamps");
const output = document.getElementById("output");
const zoomSlider = document.getElementById("zoom-slider");
const sizeSlider = document.getElementById("size-slider");

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
  const img = document.createElement("img");
  img.src = `../images/stamps/${id}.png`;
  img.id = id;
  img.className = "stamp";
  img.style.left = stampData[id].left + "%";
  img.style.top = stampData[id].top + "%";
  img.style.width = stampData[id].size + "%";
  stampsContainer.appendChild(img);

  makeDraggable(img);
  img.addEventListener("click", () => selectStamp(img));
});

function selectStamp(img) {
  document.querySelectorAll(".stamp").forEach(s => s.classList.remove("selected"));
  img.classList.add("selected");
  selectedStamp = img;
  sizeSlider.value = parseFloat(img.style.width);
}

// === サイズ変更 ===
sizeSlider.addEventListener("input", () => {
  if (selectedStamp) {
    selectedStamp.style.width = sizeSlider.value + "%";
    updateOutput();
  }
});

// === ドラッグ操作 ===
function makeDraggable(element) {
  let offsetX, offsetY;

  element.addEventListener("mousedown", startDrag);
  element.addEventListener("touchstart", startDrag);

  function startDrag(e) {
    e.preventDefault();
    const rect = element.getBoundingClientRect();
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

    element.style.left = leftPercent + "%";
    element.style.top = topPercent + "%";

    updateOutput();
  }

  function stopDrag() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", stopDrag);
  }
}

// === ズーム ===
zoomSlider.addEventListener("input", () => {
  const scale = zoomSlider.value / 100;
  document.getElementById("card-container").style.transform = `scale(${scale})`;
});

// === 出力 ===
function updateOutput() {
  const data = {};
  document.querySelectorAll(".stamp").forEach(stamp => {
    data[stamp.id] = {
      left: parseFloat(stamp.style.left),
      top: parseFloat(stamp.style.top),
      size: parseFloat(stamp.style.width)
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
