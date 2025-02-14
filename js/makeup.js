document.addEventListener("DOMContentLoaded", async function () {
    async function fetchData() {
        try {
            const response = await fetch("https://orientonline.info/api/products");
            const result = await response.json();
            const products = result.products;

            let productsGrid = document.getElementById("productsGrid");

            if (!productsGrid) {
                console.error("Element with ID 'productsGrid' not found!");
                return;
            }

            productsGrid.innerHTML = ""; // تفريغ المنتجات السابقة

            products.forEach((product) => {
                // إنشاء العنصر الرئيسي للمنتج
                let productDiv = document.createElement("div");
                productDiv.classList.add("product-card");

                // إنشاء صورة المنتج
                let productImage = document.createElement("img");
                productImage.src = product.img ? `https://orientonline.info/${product.img}` : "https://via.placeholder.com/150";
                productImage.alt = product.name;
                productImage.classList.add("product-image");

                // التحقق من تحميل الصورة
                productImage.onerror = function () {
                    productImage.src = "https://via.placeholder.com/150";
                };

                // اسم المنتج
                let productName = document.createElement("h2");
                productName.textContent = product.name;
                productName.classList.add("product-name");

                // وصف المنتج
                let productDescription = document.createElement("p");
                productDescription.textContent = product.description;
                productDescription.classList.add("product-description");

                // سعر المنتج
                let productPrice = document.createElement("p");
                productPrice.textContent = `$${product.price}`;
                productPrice.classList.add("product-price");

                // زر الإضافة إلى السلة
                let addToCartButton = document.createElement("button");
                addToCartButton.textContent = "Add to Cart";
                addToCartButton.classList.add("add-to-cart");

                // تجميع العناصر داخل العنصر الرئيسي
                productDiv.appendChild(productImage);
                productDiv.appendChild(productName);
                productDiv.appendChild(productDescription);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(addToCartButton);

                // إضافة المنتج إلى الشبكة
                productsGrid.appendChild(productDiv);
            });

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchData();
});
