function updateHighlightedCard() {
  const cards = document.querySelectorAll(".cards-xp > div");

  let closestCard = null;
  let closestDistance = Infinity;
  const viewportCenter = window.innerWidth / 2;

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

    const bg = card.querySelector(".div-card-item-individual, .div-card-item-residencial");
    const border = card.querySelector(".div-card-item-infos, .div-card-item-infos-residencial");
    const list = card.querySelector("[class*='holder-XP-']");

    if (bg) bg.style.backgroundColor = isActive ? "#fbc103" : "#dfdfdf";
    if (border) border.style.borderColor = isActive ? "#fbc103" : "#dfdfdf";
    if (list) list.classList.toggle("visible", isActive);
  });

  const btnIndividual = document.querySelector(".btn-xp-2.individual");
  const btnResidencial = document.querySelector(".btn-xp-2.residencial");

  if (closestCard?.classList.contains("div-plano-individual")) {
    btnIndividual?.classList.add("visible");
    btnResidencial?.classList.remove("visible");
  } else if (closestCard?.classList.contains("div-plano-residencial")) {
    btnIndividual?.classList.remove("visible");
    btnResidencial?.classList.add("visible");
  }
}

const holder = document.querySelector(".holder-cards-mobile");
if (holder) {
  holder.addEventListener("scroll", () => {
    requestAnimationFrame(updateHighlightedCard);
  });
}
window.addEventListener("load", updateHighlightedCard);
