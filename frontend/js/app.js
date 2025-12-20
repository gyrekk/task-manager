// Czekamy, aż HTML się załaduje (dobra praktyka)
document.addEventListener("DOMContentLoaded", () => {
  // 1. Pobieramy wszystkie przyciski menu i wszystkie widoki
  const buttons = document.querySelectorAll(".menu-btn");
  const views = document.querySelectorAll(".view-section");

  // 2. Do każdego przycisku dodajemy nasłuchiwanie (Event Listener)
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // A. Pobieramy ID widoku z atrybutu data-view (np. "tasks")
      const targetId = button.getAttribute("data-view");

      // B. Ukrywamy wszystkie widoki i zabieramy klasę active przyciskom
      views.forEach((view) => view.classList.remove("active"));
      buttons.forEach((btn) => btn.classList.remove("active"));

      // C. Pokazujemy właściwy widok
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add("active");
      }

      // D. Podświetlamy kliknięty przycisk
      button.classList.add("active");
    });
  });
});
