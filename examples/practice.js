/* eslint-disable */

/**
 * TODO: modify router.js to support
 * 1. onLeave callback
 * 2. unsubscribe function
 */

const createLogger = (title, attach = true) => (...args) => {
  console.log(`${title}, args=${JSON.stringify(args)}`);
  if (attach) {
    document.getElementById("root").innerHTML = `<h2>${title}</h2>`;
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
