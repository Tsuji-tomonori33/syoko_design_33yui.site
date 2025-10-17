// === スタンプ状態をロード ===
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

loadStamps();

// === リセットボタン ===
document.getElementById("reset-button").addEventListener("click", () => {
  if (confirm("スタンプをすべてリセットしますか？")) {
    for (let i = 1; i <= 5; i++) {
      localStorage.removeItem("stamp" + i);
    }
    location.reload();
  }
});
