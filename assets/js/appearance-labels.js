// Blowfish builds its appearance script at one shared path. Keep its dynamic
// button labels in the current page's language, including after system changes.
window.addEventListener("DOMContentLoaded", () => {
  const darkLabel = {{ i18n "footer.dark_appearance" | jsonify }};
  const lightLabel = {{ i18n "footer.light_appearance" | jsonify }};
  const updateLabels = () => {
    const label = document.documentElement.classList.contains("dark") ? lightLabel : darkLabel;
    for (const id of ["appearance-switcher", "appearance-switcher-mobile"]) {
      const button = document.getElementById(id);
      if (button) {
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
      }
    }
  };
  updateLabels();
  new MutationObserver(updateLabels).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
});
