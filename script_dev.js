const stamps = document.querySelectorAll('.stamp');
let dragging = null;
let offsetX, offsetY;

// 位置初期化
stamps.forEach(stamp => {
  const saved = JSON.parse(localStorage.getItem(stamp.id));
  if (saved) {
    stamp.style.position = 'absolute';
    stamp.style.left = saved.left;
    stamp.style.top = saved.top;
  }

  // ドラッグ開始
  stamp.addEventListener('mousedown', e => {
    dragging = stamp;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  // ドラッグ中
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const board = document.querySelector('.stamp-board');
    const rect = board.getBoundingClientRect();
    const x = e.clientX - rect.left - offsetX;
    const y = e.clientY - rect.top - offsetY;
    dragging.style.left = `${x}px`;
    dragging.style.top = `${y}px`;
  });

  // ドラッグ終了
  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    localStorage.setItem(dragging.id, JSON.stringify({
      left: dragging.style.left,
      top: dragging.style.top
    }));
    dragging = null;
  });
});

// 座標をまとめて出力（完全版用）
document.getElementById('export').addEventListener('click', () => {
  const positions = {};
  stamps.forEach(stamp => {
    const pos = JSON.parse(localStorage.getItem(stamp.id));
    if (pos) positions[stamp.id] = pos;
  });
  localStorage.setItem('stampPositions', JSON.stringify(positions));
  document.getElementById('output').textContent = JSON.stringify(positions, null, 2);
});

// 開発版リセット
document.getElementById('reset').addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});
