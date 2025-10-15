function loadStamps() {
  let complete = true;
  for (let i = 1; i <= 5; i++) {
    const img = document.getElementById("stamp" + i);
    if (localStorage.getItem("stamp" + i) === "get") {
      img.src = "images/stamps/stamp" + i + "_got.png";
    } else {
      img.src = "images/stamps/stamp" + i + ".png";
      complete = false;
    }
  }
  if (complete) {
    document.getElementById("complete-message").style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", loadStamps);

document.getElementById("reset").addEventListener("click", () => {
  if (confirm("スタンプをすべてリセットしますか？")) {
    localStorage.clear();
    location.reload();
  }
});
