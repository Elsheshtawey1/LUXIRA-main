document.addEventListener("DOMContentLoaded", async function () {
  async function fetchData() {
    try {
      const response = await fetch("https://orientonline.info/api/products");
      const result = await response.json();
      const products = result.products;

      const grids = {
        offersGrid: products.slice(0, 3),
        recommendedGrid: products.slice(3, 6),
        exploreGrid: products.slice(6, 9),
      };

      Object.keys(grids).forEach((gridId) => {
        let grid = document.getElementById(gridId);
        grid.innerHTML = "";
        grids[gridId].forEach((product) => {
          let productDiv = document.createElement("div");
          productDiv.classList.add("card");

          let productImage = document.createElement("img");
          productImage.src = product.img
            ? `https://orientonline.info/${product.img}`
            : "https://via.placeholder.com/150";
          productImage.alt = product.name;
          productImage.classList.add("product-image");
          productImage.onerror = () =>
            (productImage.src = "https://via.placeholder.com/150");

          let productName = document.createElement("h2");
          productName.textContent = product.name;

          let productInfo = document.createElement("div");
          productInfo.classList.add("info");

          let productPrice = document.createElement("span");
          productPrice.textContent = `$${product.price}`;

          let addToCartButton = document.createElement("button");
          addToCartButton.textContent = "Add To Cart";
          addToCartButton.classList.add("btn");

          productInfo.appendChild(productPrice);
          productDiv.appendChild(productImage);
          productDiv.appendChild(productName);
          productDiv.appendChild(productInfo);
          productDiv.appendChild(addToCartButton);

          grid.appendChild(productDiv);
        });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchData();
});
