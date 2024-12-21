// عناصر التحكم في الكمية
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const quantityInput = document.getElementById("quantity");

// زر المفضلة
const favoriteBtn = document.getElementById("favorite");
const favoriteSvg = favoriteBtn.querySelector("svg");

// تقليل الكمية
decreaseBtn.addEventListener("click", () => {
  let currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity > 1) {
    quantityInput.value = currentQuantity - 1;
    toggleRedBackground(decreaseBtn); // تغيير خلفية زر "-"
  }
});

// زيادة الكمية
increaseBtn.addEventListener("click", () => {
  let currentQuantity = parseInt(quantityInput.value);
  quantityInput.value = currentQuantity + 1;
  toggleRedBackground(increaseBtn); // تغيير خلفية زر "+"
});

// تغيير خلفية الأزرار إلى الأحمر
function toggleRedBackground(button) {
  button.classList.add("red-background");
  setTimeout(() => {
    button.classList.remove("red-background");
  }, 500); // إزالة اللون الأحمر بعد نصف ثانية
}

// تحديث حالة زر المفضلة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const productCard = favoriteBtn.closest('.container_product');
  const productId = productCard.getAttribute('data-id');

  // استرجاع المفضلة من localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // التحقق إذا كان المنتج في المفضلة وتحديث حالة الزر
  const isFavorite = favorites.some(product => product.id === productId);
  if (isFavorite) {
    favoriteSvg.classList.add('active'); // تفعيل الزر إذا كان المنتج مضاف للمفضلة
  } else {
    favoriteSvg.classList.remove('active'); // إزالة التفعيل إذا لم يكن في المفضلة
  }
});

// تغيير حالة زر المفضلة
favoriteBtn.addEventListener("click", () => {
  favoriteSvg.classList.toggle("active");

  // الحصول على تفاصيل المنتج
  const productCard = favoriteBtn.closest('.container_product');
  const productId = productCard.getAttribute('data-id');
  const productTitle = productCard.querySelector('h2')?.innerText || "Unknown";
  const productImage = productCard.querySelector('img.main_image')?.src || "";

  // استرجاع المفضلة من localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // إذا كان الزر مفعلاً، أضف المنتج إلى المفضلة
  if (favoriteSvg.classList.contains('active')) {
    if (!favorites.find(product => product.id === productId)) {
      const productData = { id: productId, name: productTitle, image: productImage };
      favorites.push(productData); // إضافة المنتج إلى المفضلة
    }
  } else {
    // إذا تم إلغاء التفعيل، نحذف المنتج من المفضلة
    favorites = favorites.filter(product => product.id !== productId);
  }

  // تحديث localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // تحديث صفحة المفضلة
  updateFavoritesPage();
});

// تحديث صفحة المفضلة
function updateFavoritesPage() {
  const favoritesContainer = document.querySelector('.Products');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // تفريغ المحتوى القديم
  favoritesContainer.innerHTML = '';

  // إنشاء العناصر الخاصة بالمنتجات المفضلة
  favorites.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product-card'); // إضافة كلاس لكل منتج
    productElement.style.display = "block"; // التأكد من عدم وجود display مختلف
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <button class="remove-favorite" data-id="${product.id}">Remove</button>
    `;
    favoritesContainer.appendChild(productElement);
  });

  // إضافة حدث لإزالة المنتج من المفضلة
  addRemoveFavoriteEvent();
}

// إضافة حدث حذف المنتج من المفضلة
function addRemoveFavoriteEvent() {
  document.querySelectorAll('.remove-favorite').forEach(button => {
    button.addEventListener('click', function () {
      const productId = this.getAttribute('data-id');
      removeProductFromFavorites(productId);
    });
  });
}

// إزالة المنتج من المفضلة
function removeProductFromFavorites(productId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(product => product.id !== productId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoritesPage(); // تحديث الصفحة بعد الحذف
}

// تحديث صفحة المفضلة عند التحميل
document.addEventListener('DOMContentLoaded', updateFavoritesPage);
