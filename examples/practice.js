/* eslint-disable */

/**
 * TODO: modify router.js to support
 * 1. onLeave callback
 * 2. unsubscribe function
 */

const render = (content) =>
  (document.getElementById("root").innerHTML = `<h2>${content}</h2>`);

const createLogger = (content, shouldRender = true) => (...args) => {
  console.log(`LOGGER: ${content} args=${JSON.stringify(args)}`);
  if (shouldRender) {
    render(content);
  }
};

const router = Router();

const unsubscribeAll = router.on(/.*/, createLogger("/.*"));
router.on(
  (pathname) => pathname === "/contacts",
  createLogger("/contacts"),
  createLogger("leaving /contacts", false)
);
router.on("/about", createLogger("/about"));
router.on("/about/us", createLogger("/about/us"));

document.body.addEventListener("click", (event) => {
  if (!event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  let url = event.target.getAttribute("href");
  router.go(url);
  unsubscribeAll();
});
