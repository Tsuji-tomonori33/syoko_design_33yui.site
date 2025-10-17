window.addEventListener('DOMContentLoaded', () => {
  const positions = JSON.parse(localStorage.getItem('stampPositions')) || {};
  for (const id in positions) {
    const el = document.getElementById(id);
    if (el && positions[id]) {
      el.style.position = 'absolute';
      el.style.left = positions[id].left;
      el.style.top = positions[id].top;
    }
  }
  loadStamps();
});

function loadStamps() {
  let allGot = true;
  for (let i = 1; i <= 5; i++) {
    const stamp = document.getElementById("stamp" + i);
    const got = localStorage.getItem("stamp" + i) === "get";
    if (got) {
      stamp.classList.add("got");
      stamp.querySelector("img").src = `images/stamps/stamp${i}_got.png`;
    } else {
      allGot = false;
    }
  }

  if (allGot) {
    document.getElementById("complete-message").style.display = "block";
  }
}

document.getElementById("reset-button").addEventListener("click", () => {
  if (confirm("スタンプをすべてリセットしますか？")) {
    for (let i = 1; i <= 5; i++) {
      localStorage.removeItem("stamp" + i);
    }
    location.reload();
  }
});
