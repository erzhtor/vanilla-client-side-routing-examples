/* eslint-disable */

document.body.addEventListener("click", (ev) => {
  if (!ev.target.matches("a")) {
    return;
  }
  ev.preventDefault();
  let url = ev.target.getAttribute("href");
  history.pushState({ foo: "bar" }, url, url);
  // history.replaceState({ foo: "bar" }, url, url);
});
