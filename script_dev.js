const stamps = document.querySelectorAll('.stamp');
let dragging = null;
let offsetX = 0, offsetY = 0;

stamps.forEach(stamp => {
  // 初期座標ロード
  const saved = JSON.parse(localStorage.getItem(stamp.id));
  if (saved) {
    stamp.style.position = 'absolute';
    stamp.style.left = saved.left;
    stamp.style.top = saved.top;
  } else {
    stamp.style.position = 'absolute';
  }

  // ドラッグ開始
  stamp.addEventListener('mousedown', e => {
    dragging = stamp;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    stamp.style.cursor = 'grabbing';
  });
});

// ドラッグ中
document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const board = document.querySelector('.stamp-board');
  const rect = board.getBoundingClientRect();
  let x = e.clientX - rect.left - offsetX;
  let y = e.clientY - rect.top - offsetY;

  x = Math.max(0, Math.min(rect.width - dragging.offsetWidth, x));
  y = Math.max(0, Math.min(rect.height - dragging.offsetHeight, y));

  dragging.style.left = x + 'px';
  dragging.style.top = y + 'px';
});

// ドラッグ終了
document.addEventListener('mouseup', () => {
  if (!dragging) return;
  localStorage.setItem(dragging.id, JSON.stringify({
    left: dragging.style.left,
    top: dragging.style.top
  }));
  dragging.style.cursor = 'grab';
  dragging = null;
});

// 座標出力
document.getElementById('export').addEventListener('click', () => {
  const positions = {};
  stamps.forEach(stamp => {
    positions[stamp.id] = JSON.parse(localStorage.getItem(stamp.id));
  });
  localStorage.setItem('stampPositions', JSON.stringify(positions));
  document.getElementById('output').textContent = JSON.stringify(positions, null, 2);
});

// リセット
document.getElementById('reset').addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});
