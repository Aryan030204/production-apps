import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./utils/store.js";

// Scroll-reveal
const setupReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        if (entry.isIntersecting) {
          target.classList.add("revealed");
          target.classList.add("animate-pop-in");
          if (target.id === "features-grid") {
            Array.from(target.children).forEach((child) => {
              child.classList.add("animate-fade-up");
              child.style.opacity = 1;
            });
          }
          if (target.id === "stories-list") {
            Array.from(target.children).forEach((child, idx) => {
              child.classList.add("animate-fade-up");
              child.style.opacity = 1;
              child.style.animationDelay = `${idx * 80}ms`;
            });
          }
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  const attach = () => {
    const revealEls = document.querySelectorAll(".reveal:not(.revealed)");
    revealEls.forEach((el) => observer.observe(el));
  };

  // Initial attach
  attach();

  // Watch for route/page content updates
  const mo = new MutationObserver(() => {
    attach();
    const storiesList = document.getElementById("stories-list");
    if (storiesList) {
      Array.from(storiesList.children).forEach((child, idx) => {
        if (child.style && child.style.opacity !== "1") {
          child.classList.add("animate-fade-up");
          child.style.opacity = 1;
          child.style.animationDelay = `${idx * 80}ms`;
        }
      });
    }
  });
  mo.observe(document.getElementById("root"), { childList: true, subtree: true });
};
const rootEl = document.getElementById("root");
createRoot(rootEl).render(
  <>
    <Provider store={Store}>
      <App />
    </Provider>
  </>
);

// Initialize after first paint
window.requestAnimationFrame(() => {
  setupReveal();
});
