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

  const subscribe = (match, callback) => {
    listeners.push([match, callback]);
    handleListener([match, callback]);
  };

  const unsubscribe = (match) => {
    const index = listeners.findIndex((route) => route.match === match);
    if (index) {
      listeners.splice(index, 1);
    }
  };

  const go = (url, state) => {
    history.pushState(state, url, url);
    listeners.forEach(handleListener);
  };

  window.addEventListener("popstate", handleAllListeners);

  return { subscribe, unsubscribe, go };
}

const createLogger = (route) => (...args) => {
  console.log(`Route Handler 2: route="${route}" args=${JSON.stringify(args)}`);
  document.getElementById("root").innerHTML = `<h2>${route}</h2>`;
};

const router = new Router();
router.subscribe(/.+/, createLogger("/*"));
router.subscribe("/about", createLogger("/about"));
router.subscribe(
  (pathname) => pathname === "/contacts",
  createLogger("/contacts")
);

router.go("/foo");
router.unsubscribe("/foo");
router.go("/foo");

document.body.addEventListener("click", (ev) => {
  if (!ev.target.matches("a")) {
    return;
  }
  ev.preventDefault();
  let url = ev.target.getAttribute("href");
  router.go(url);
});
