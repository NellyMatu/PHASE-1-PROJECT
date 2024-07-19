const api_url = "https://phase-1-backend-rho.vercel.app/clothes";
const popularProducts = document.getElementById("popular-products");

window.onload = () => {
  console.log('Fetching data from API:', api_url);
  fetch(api_url)
    .then(response => {
      console.log('API Response:', response);
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      if (!data || data.length === 0) {
        console.error('No products found in the database.');
        return;
      }

      popularProducts.innerHTML = ''; // Clear any existing content

      data.forEach(product => {
        const { id, name, price, description, image, stock, sold } = product;

        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('product-id', id);

        let remainingStock = stock - sold;

        productCard.innerHTML = `
          <div class="product-card_container">
            <div class="product-card_img">
              <img src="${image}" alt="${name}">
            </div>
            <div class="product-card_description">
              <div class="product-card_text">${name}</div>
              <div class="product-card_price">${20.48.toFixed(2)} $</div>
              <div class="product-card_info">${description}</div>
              <div class="product-card_stock">Stock: <span id="stock-${id}">${remainingStock}</span></div>
              <button class="product-card_btn" id="buy-${id}">Buy Now</button>
            </div>
          </div>
        `;

        popularProducts.appendChild(productCard);

        document.getElementById(`buy-${id}`).addEventListener("click", () => {
          if (remainingStock > 0) {
            remainingStock--;
            document.getElementById(`stock-${id}`).innerText = remainingStock;
          } else {
            alert('Out of stock!');
          }
        });
      });
    })
    .catch(error => {
      console.log('Error fetching the products:', error);
    });
};
