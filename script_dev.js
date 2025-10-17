// スタンプ要素を取得
const stamps = document.querySelectorAll(".stamp");
let currentStamp = null;
let offsetX, offsetY;

// ロード時に保存された位置を反映
window.addEventListener("load", () => {
  stamps.forEach(stamp => {
    const id = stamp.id;
    const pos = localStorage.getItem(id);
    if (pos) {
      const { left, top } = JSON.parse(pos);
      stamp.style.left = left;
      stamp.style.top = top;
    } else {
      // デフォルト位置
      stamp.style.left = Math.random() * 60 + 20 + "%";
      stamp.style.top = Math.random() * 60 + 20 + "%";
    }
  });
});

// ドラッグ処理
stamps.forEach(stamp => {
  stamp.addEventListener("mousedown", e => {
    currentStamp = stamp;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  document.addEventListener("mousemove", e => {
    if (!currentStamp) return;
    const rect = currentStamp.parentElement.getBoundingClientRect();
    const x = e.clientX - rect.left - offsetX;
    const y = e.clientY - rect.top - offsetY;
    currentStamp.style.left = `${x}px`;
    currentStamp.style.top = `${y}px`;
  });

  document.addEventListener("mouseup", () => {
    if (currentStamp) {
      const id = currentStamp.id;
      localStorage.setItem(id, JSON.stringify({
        left: currentStamp.style.left,
        top: currentStamp.style.top
      }));
      currentStamp = null;
    }
  });
});

// リセットボタン
document.getElementById("reset").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

// 座標出力
document.getElementById("export").addEventListener("click", () => {
  const output = {};
  stamps.forEach(stamp => {
    const pos = localStorage.getItem(stamp.id);
    if (pos) output[stamp.id] = JSON.parse(pos);
  });
  document.getElementById("output").textContent = JSON.stringify(output, null, 2);
});
