/* eslint-disable */

function Router() {
  const listeners = [];

  const handleListener = ([match, callback]) => {
    const { pathname } = location;
    const doesMatch =
      (match instanceof RegExp && match.test(pathname)) ||
      (typeof match === "function" && match(pathname)) ||
      (typeof match === "string" && match === pathname);
    doesMatch && callback({ pathname, state: history.state });
  };

  const handleAllListeners = () => listeners.forEach(handleListener);

  const on = (match, callback) => {
    listeners.push([match, callback]);
    handleListener([match, callback]);
  };

  const go = (url, state) => {
    history.pushState(state, url, url);
    handleAllListeners();
  };

  window.addEventListener("popstate", handleAllListeners);

  return { on, go };
}

const createLogger = (route) => (...args) => {
  console.log(`Route Handler 1: route="${route}" args=${JSON.stringify(args)}`);
  document.getElementById("root").innerHTML = `<h2>${route}</h2>`;
};

const router = Router();
router.on(/.*/, createLogger("/*"));
router.on((pathname) => pathname === "/contacts", createLogger("/contacts"));
router.on("/about", createLogger("/about"));

document.body.addEventListener("click", (ev) => {
  if (!ev.target.matches("a")) {
    return;
  }
  ev.preventDefault();
  let url = ev.target.getAttribute("href");
  router.go(url);
});
