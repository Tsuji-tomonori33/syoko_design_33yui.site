const stamps = document.querySelectorAll('.stamp');
let dragging = null;
let offsetX, offsetY;

stamps.forEach(stamp => {
  const id = stamp.id;
  const saved = JSON.parse(localStorage.getItem(id));
  if (saved) {
    stamp.style.left = saved.left;
    stamp.style.top = saved.top;
  }

  stamp.addEventListener('mousedown', e => {
    dragging = stamp;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const board = document.querySelector('.stamp-board');
    const rect = board.getBoundingClientRect();
    const x = e.clientX - rect.left - offsetX;
    const y = e.clientY - rect.top - offsetY;
    dragging.style.left = `${x}px`;
    dragging.style.top = `${y}px`;
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    const id = dragging.id;
    localStorage.setItem(id, JSON.stringify({
      left: dragging.style.left,
      top: dragging.style.top
    }));
    dragging = null;
  });
});

document.getElementById('export').addEventListener('click', () => {
  const positions = {};
  stamps.forEach(stamp => {
    positions[stamp.id] = JSON.parse(localStorage.getItem(stamp.id));
  });
  localStorage.setItem('stampPositions', JSON.stringify(positions));
  document.getElementById('output').textContent = JSON.stringify(positions, null, 2);
});

document.getElementById('reset').addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});
