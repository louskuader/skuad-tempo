document.addEventListener("DOMContentLoaded", function () {
  // Executa só se for mobile
  if (!window.matchMedia("(max-width: 768px)").matches) {
    console.log("📵 Script ignorado (não é mobile)");
    return;
  }

  console.log("📱 Script mobile rodando!");

  const scrollContainer = document.querySelector(".scroll-container");

  function updateHighlightedCard() {
    const cards = document.querySelectorAll(".cards-list > div");
    const viewportCenter = window.innerWidth / 2;

    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(viewportCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

    cards.forEach((card) => {
      const isActive = card === closestCard;

      const bg = card.querySelector(".card-bg-individual, .card-bg-residencial, .card-bg-legacy");
      const border = card.querySelector(".card-border-individual, .card-border-residencial, .card-border-legacy");
      const list = card.querySelector(".card-list-individual, .card-list-residencial, .card-list-legacy");

      if (bg) bg.style.backgroundColor = isActive ? "#fbc103" : "#dfdfdf";
      if (border) border.style.borderColor = isActive ? "#fbc103" : "#dfdfdf";
      if (list) list.classList.toggle("visible", isActive);
    });

    const btnIndividual = document.querySelector(".btn-individual");
    const btnResidencial = document.querySelector(".btn-residencial");
    const btnLegacy = document.querySelector(".btn-legacy");

    // Oculta todos os botões
    btnIndividual?.classList.remove("visible");
    btnResidencial?.classList.remove("visible");
    btnLegacy?.classList.remove("visible");

    // Exibe o botão correspondente ao card visível
    if (closestCard?.classList.contains("card-individual")) {
      btnIndividual?.classList.add("visible");
    } else if (closestCard?.classList.contains("card-residencial")) {
      btnResidencial?.classList.add("visible");
    } else if (closestCard?.classList.contains("card-legacy")) {
      btnLegacy?.classList.add("visible");
    }
  }

  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", () => {
      requestAnimationFrame(updateHighlightedCard);
    });

    updateHighlightedCard();
  }
});

