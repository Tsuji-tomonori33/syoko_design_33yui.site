document.addEventListener("DOMContentLoaded", () => {
  let complete = true;

  for (let i = 1; i <= 5; i++) {
    const stamp = document.getElementById(`stamp${i}`);
    if (stamp) {
      if (localStorage.getItem(`stamp${i}`) === "get") {
        stamp.src = `images/stamps/stamp${i}_got.png`;
      } else {
        complete = false;
      }
    }
  }

  if (complete) {
    document.getElementById("complete-message").style.display = "block";
  }
});
