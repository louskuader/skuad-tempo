document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector(".scroll-container");

  function updateHighlightedCard() {
    const cards = document.querySelectorAll(".cards-list > div"); // card-individual e card-residencial
    const viewportCenter = window.innerWidth / 2;

    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(viewportCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

    cards.forEach(card => {
      const isActive = card === closestCard;

      const bg = card.querySelector(".card-bg-individual, .card-bg-residencial");
      const border = card.querySelector(".card-border-individual, .card-border-residencial");
      const list = card.querySelector(".card-list-individual, .card-list-residencial");

      if (bg) bg.style.backgroundColor = isActive ? "#fbc103" : "#dfdfdf";
      if (border) border.style.borderColor = isActive ? "#fbc103" : "#dfdfdf";
      if (list) list.classList.toggle("visible", isActive);
    });

    // Botões
    const btnIndividual = document.querySelector(".btn-individual");
    const btnResidencial = document.querySelector(".btn-residencial");

    if (closestCard.classList.contains("card-individual")) {
      btnIndividual.classList.add("visible");
      btnResidencial.classList.remove("visible");
    } else if (closestCard.classList.contains("card-residencial")) {
      btnIndividual.classList.remove("visible");
      btnResidencial.classList.add("visible");
    }
  }

  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", () => {
      requestAnimationFrame(updateHighlightedCard);
    });

    updateHighlightedCard(); // executa no início
  }
});
