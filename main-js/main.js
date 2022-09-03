document.getElementById("serch").addEventListener(
  "keypress",
  (fildValue = (e) => {
    if (e.key === "Enter") {
      isLoding(true);
      lodData(e.target.value);
      e.target.value = "";
    }
  })
);
document.getElementById("serch-btn").addEventListener("click", () => {
  isLoding(true);
  const serceFild = document.getElementById("serch");
  const serceFildValue = serceFild.value;
  lodData(serceFildValue);
  serceFild.value = "";
});
lodData("apple");
