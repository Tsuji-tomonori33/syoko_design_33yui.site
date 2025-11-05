const stampIds = ["stamp1", "stamp2", "stamp3", "stamp4", "stamp5"];

const stampPositions = 
{
  "stamp1": {
    "left": 12.833333333333332,
    "top": 20.65982458726415
  },
  "stamp2": {
    "left": 66.16666666666666,
    "top": 24.6692585495283
  },
  "stamp3": {
    "left": 27.333333333333332,
    "top": 43.01849941037736
  },
  "stamp4": {
    "left": 66.5,
    "top": 54.339254127358494
  },
  "stamp5": {
    "left": 15,
    "top": 75.89548938679245
  }
  "stamp1": { "left": 11.5, "top": 19.95227741745283 },
  "stamp2": { "left": 64.66666666666666, "top": 23.843786851415093 },
  "stamp3": { "left": 26, "top": 42.31095224056604 },
  "stamp4": { "left": 65.16666666666666, "top": 53.277933372641506 },
  "stamp5": { "left": 13.833333333333334, "top": 75.18794221698113 }
};

function applyStampPositions() {
  const bg = document.querySelector(".background");
  if (!bg.complete) {
    bg.onload = applyStampPositions;
    return;
  }

  const bgWidth = bg.clientWidth;
  const bgHeight = bg.clientHeight;

  stampIds.forEach(id => {
    const stamp = document.getElementById(id);
    const pos = stampPositions[id];

    const leftPx = (pos.left / 100) * bgWidth;
    const topPx = (pos.top / 100) * bgHeight;

    stamp.style.left = `${leftPx}px`;
    stamp.style.top = `${topPx}px`;

    if (localStorage.getItem(id) === "get") {
      stamp.style.display = "block";
      stamp.style.opacity = 1;
    } else {
      stamp.style.display = "none";
      stamp.style.opacity = 0;
    }
  });

  checkCompletion();
}

function checkCompletion() {
  const allGot = stampIds.every(id => localStorage.getItem(id) === "get");
  const msg = document.getElementById("complete-message");
  msg.style.display = allGot ? "block" : "none";
}

document.getElementById("reset-button").addEventListener("click", () => {
  if (confirm("スタンプを全てリセットしますか？")) {
    stampIds.forEach(id => localStorage.removeItem(id));
    location.reload();
  }
});

window.addEventListener("resize", applyStampPositions);
window.addEventListener("load", applyStampPositions);
