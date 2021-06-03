/* eslint-disable */

/* Catch <a> tag clicks */
document.body.addEventListener("click", (event) => {
  if (!event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  const url = event.target.getAttribute("href");
  // location.hash = url; // doesn't reload page
  location.href = url; // reloads page
  // location.replace(url); // reloads page
});

/* Handle/catch hash changes */
window.addEventListener("hashchange", () => {
  console.log(`hashchange: ${location.hash}`);
});
