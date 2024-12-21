// إضافة العناصر إلى سلة التسوق
document.querySelectorAll(".add_to_cart, .buy-now").forEach(button => {
  button.addEventListener("click", function() {
    const product = {
      id: this.dataset.id,
      title: this.dataset.title,
      image: this.dataset.img,
      price: this.dataset.price,
    };

    // استرجاع السلة الحالية أو إنشاء سلة جديدة إذا كانت فارغة
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // إضافة المنتج إلى السلة
    cart.push(product);

    // حفظ السلة في localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

const CartItems = document.querySelector(".cart-items");

function displayCartItems() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  CartItems.innerHTML = ""; // مسح المحتوى القديم قبل إضافة الجديد
  items.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart_item";
    cartItem.innerHTML = `
      <p class="cart_id">${item.id}</p>
      <p class="cart_title">${item.title}</p>
      <img src="${item.image}" alt="${item.title}" class="cart_img" />
      <p class="cart_price">${item.price}</p>
      <button class="cart_delete">Delete</button>
    `;
    CartItems.appendChild(cartItem);
  });
}

displayCartItems();



document.addEventListener("click", function(e) {
  // التحقق إذا كان الزر الذي تم الضغط عليه هو زر الحذف
  if (e.target && e.target.classList.contains("cart_delete")) {
    // الحصول على ID المنتج من العنصر الذي تم الضغط عليه
    const itemId = e.target.parentElement.querySelector(".cart_id").textContent;

    // استرجاع السلة من localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // إزالة العنصر الذي له نفس الـ ID من السلة
    cart = cart.filter(item => item.id !== itemId);

    // تحديث السلة في localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // إعادة تحميل العناصر في صفحة الحقيبة
    CartItems.innerHTML = "";
    displayCartItems();
  }
});


const heartIcons = document.querySelectorAll('.heart-icon');

heartIcons.forEach((icon) => {
  icon.addEventListener('click', function () {
    const productId = this.getAttribute('data-product-id');
    const productTitle = this.closest('.product-item').querySelector('.product-title').textContent;
    const productPrice = this.closest('.product-item').querySelector('.product-price').textContent;
    const productImage = this.closest('.product-item').querySelector('.product-image').src;

    const favoriteProduct = {
      id: productId,
      title: productTitle,
      price: productPrice,
      image: productImage
    };

    // الحصول على قائمة المنتجات المفضلة من localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // إضافة المنتج إلى المفضلة (إذا لم يكن موجودًا مسبقًا)
    if (!favorites.some(product => product.id === productId)) {
      favorites.push(favoriteProduct);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Product added to favorites!');
    } else {
      alert('Product is already in favorites.');
    }
  });
});


const favoritesContainer = document.querySelector('.favorites-container');

function displayFavorites() {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favoritesContainer.innerHTML = ''; // مسح المحتوى الحالي

  favorites.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.className = 'favorite-item';
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="favorite-product-image" />
      <h2 class="favorite-product-title">${product.title}</h2>
      <p class="favorite-product-price">${product.price}</p>
      <button class="remove-favorite" data-product-id="${product.id}">Remove</button>
    `;
    favoritesContainer.appendChild(productElement);
  });
}

// استدعاء الدالة لعرض المنتجات المفضلة عند تحميل الصفحة
displayFavorites();

// التعامل مع إزالة المنتجات من المفضلة
favoritesContainer.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('remove-favorite')) {
    const productId = e.target.getAttribute('data-product-id');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(product => product.id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites(); // إعادة تحميل المفضلة بعد الحذف
  }
});
