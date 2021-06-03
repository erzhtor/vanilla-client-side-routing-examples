/* eslint-disable */

// IMPLEMENTATION
function Router() {
  let listeners = [];
  let currentPath = location.pathname;
  let previousPath = null;

  const isMatch = (match, path) =>
    (match instanceof RegExp && match.test(path)) ||
    (typeof match === "function" && match(path)) ||
    (typeof match === "string" && match === path);

  const handleListener = ({ match, onEnter, onLeave }) => {
    const args = { currentPath, previousPath, state: history.state };

    isMatch(match, currentPath) && onEnter(args);
    isMatch(match, previousPath) && onLeave && onLeave(args);
  };

  const handleAllListeners = () => listeners.forEach(handleListener);

  const generateId = () => {
    const getRandomNumber = () =>
      Math.floor(Math.random() * listeners.length * 1000);
    const doesExist = (id) => listeners.find((listener) => listener.id === id);

    let id = getRandomNumber();
    while (doesExist(id)) {
      id = getRandomNumber();
    }
    return id;
  };

  const unsubscribe = (id) => {
    listeners = listeners.filter((listener) => listener[0] !== id);
  };

  const on = (match, onEnter, onLeave) => {
    const id = generateId();

    const listener = { id, match, onEnter, onLeave };
    listeners.push(listener);
    handleListener(listener);

    return () => unsubscribe(id);
  };

  const go = (url, state) => {
    previousPath = currentPath;
    history.pushState(state, url, url);
    currentPath = location.pathname;

    handleAllListeners();
  };

  window.addEventListener("popstate", handleAllListeners);

  return { on, go };
}

// USAGE
const createLogger = (title, attach = true) => (...args) => {
  console.log(`${title}, args=${JSON.stringify(args)}`);
  if (attach) {
    document.getElementById("root").innerHTML = `<h2>${title}</h2>`;
  }
};

const router = Router();

const unsubscribeAll = router.on(/.*/, createLogger("/.*"));
const unsubscribeContacts = router.on(
  (pathname) => pathname === "/contacts",
  createLogger("/contacts"),
  createLogger("leaving /contacts", false)
);
const unsubscribeAbout = router.on("/about", createLogger("/about"));
const unsubscribeAboutUs = router.on("/about/us", createLogger("/about/us"));

document.body.addEventListener("click", (event) => {
  if (!event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  let url = event.target.getAttribute("href");
  router.go(url);
  unsubscribeAll();
});
