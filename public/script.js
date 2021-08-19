const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.method = "POST";
  form.action = "/";
  form.submit();
  form.reset();
  alert("saved");
});
