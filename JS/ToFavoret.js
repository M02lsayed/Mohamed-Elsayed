// عند الضغط على أيقونة القلب
document.querySelectorAll('.heart_icon').forEach(function (icon) {
  icon.addEventListener('click', function () {
    this.classList.toggle('active');
    
    // الحصول على بطاقة المنتج
    const productCard = this.closest('.card');
    const productId = productCard.getAttribute('data-id'); // معرف المنتج
    
    // التحقق من البيانات
    const productTitle = productCard.querySelector('.card_titel')?.innerText || "Unknown";
    const productImage = productCard.querySelector('img')?.src || "";
    
    // استرجاع المفضلة من localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (this.classList.contains('active')) {
      // إذا لم يكن المنتج موجودًا في المفضلة، نضيفه
      if (!favorites.find(product => product.id === productId)) {
        const productData = {
          id: productId,
          name: productTitle,
          image: productImage,
        };
        favorites.push(productData);
      }
    } else {
      // إذا تم إلغاء التفعيل، نحذفه من المفضلة
      favorites = favorites.filter(product => product.id !== productId);
    }
    
    // تحديث localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // تحديث صفحة المفضلة
    updateFavoritesPage();
  });
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
  document.querySelectorAll('.remove-favorite').forEach(button => {
    button.addEventListener('click', function () {
      const productId = this.getAttribute('data-id');
      removeProductFromFavorites(productId);
    });
  });

  // تحديث حالة القلوب
  updateHeartIcons();
}

// إزالة المنتج من المفضلة
function removeProductFromFavorites(productId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(product => product.id !== productId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoritesPage();
}

// تحديث حالة القلوب عند التحميل
function updateHeartIcons() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  document.querySelectorAll('.heart_icon').forEach(icon => {
    const productCard = icon.closest('.card');
    const productId = productCard.getAttribute('data-id');
    
    // إذا كان المنتج في المفضلة، اجعل القلب باللون الأحمر
    if (favorites.some(product => product.id === productId)) {
      icon.classList.add('active'); // تفعيل القلب
    } else {
      icon.classList.remove('active'); // إلغاء التفعيل
    }
  });
}

// تحديث الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function () {
  updateFavoritesPage();
  updateHeartIcons();
});
