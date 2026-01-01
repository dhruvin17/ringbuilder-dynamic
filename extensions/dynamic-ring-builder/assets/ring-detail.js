function setupRingPageButtons() {
  // Hide quantity form if it exists
  const quantityForm = document.querySelector('[id^="Quantity-Form-"]');
  if (quantityForm) {
    quantityForm.style.display = "none";
  }

    // Get all matching buttons by ID pattern
    const buttons = document.querySelectorAll('button[name="add"]');

    if (buttons.length === 0) return;

    // 🔥 Grab dynamic values from Liquid dataset
    const root = document.getElementById("root");
    const dataset = root ? root.dataset : {};
    console.log("dataset......",dataset)

    buttons.forEach((existingButton) => {
      // Avoid replacing already replaced buttons
      if (!existingButton) return;

      const parent = existingButton.parentElement;

      const newButton = document.createElement("button");
      newButton.id = existingButton.id;
      newButton.className = existingButton.classList;
      newButton.style.cursor = "pointer";
      newButton.textContent = "Choose This Setting";

      parent.replaceChild(newButton, existingButton);

      newButton.addEventListener("click", function (event) {
        event.preventDefault();
        const productForm = event.target.closest("form");
       
        if (!productForm) {
          alert("Product form not found!");
          return;
        }

        const selectedVariantInput = productForm.querySelector(
          ".product-variant-id"
        );
        if (!selectedVariantInput) {
          alert("No variant selected!");
          return;
        }

        const selectedVariantId = selectedVariantInput.value;
        sessionStorage.setItem("ringId", selectedVariantId);

        const diamondId = sessionStorage.getItem("diamondId");

        window.location.href = diamondId
          ? `/pages/${dataset.completepage}`
          : `/pages/${dataset.diamondlist}`;
      });
    });
}

// Run on full load + bfcache restore
window.addEventListener("pageshow", function (event) {
  setupRingPageButtons();
});
