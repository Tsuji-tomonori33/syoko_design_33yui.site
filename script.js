window.addEventListener('DOMContentLoaded', () => {
  const positions = JSON.parse(localStorage.getItem('stampPositions')) || {};
  for (const id in positions) {
    const el = document.getElementById(id);
    if (el && positions[id]) {
      el.style.left = positions[id].left;
      el.style.top = positions[id].top;
    }
  }
});

document.getElementById('reset').addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});
