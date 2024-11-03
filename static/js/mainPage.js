function setSelectedCategory(categoryName) {
  localStorage.setItem("selectedCategory", categoryName);
}

function renderPagination() {
        const paginationContainer = document.getElementById("pagination-pages");
        paginationContainer.innerHTML = ''; // Очистим старые страницы

        // Определяем начальную и конечную страницу для отображения
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 5);

        // Генерируем кнопки страниц
        for (let page = startPage; page <= endPage; page++) {
            const button = document.createElement("button");
            button.className = "pagination__page";
            button.innerText = page.toString();
            button.onclick = () => changePage(page);

            // Добавляем активный класс для текущей страницы
            if (page === currentPage) {
                button.classList.add("active");
            }
            paginationContainer.appendChild(button);
        }
    }

function changePage(newPage) {
    if (newPage < 1 || newPage > totalPages) return;  // Проверка допустимого диапазона

    currentPage = newPage;
    renderPagination();
    window.location.href = `?page=${newPage}`;  // Переход на новую страницу
}

window.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.querySelector('.mobileMenu');
    const mobileMenuButtonImg = document.querySelector('.mobileMenuButtonIcon');

    // Убедимся, что иконка открытого меню совпадает с изначальной
    mobileMenuButtonImg.src = openMobileMenuIcon;

    mobileMenuButton.addEventListener('click', () => {
        // Показываем или скрываем меню
        mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';

        // Переключаем иконку, исходя из текущего состояния меню
        if (mobileMenuButtonImg.src === openMobileMenuIcon) {
            mobileMenuButtonImg.src = closeMobileMenuIcon;
        } else {
          console.log("OUR VARIABLE:" + openMobileMenuIcon);
          console.log("SRC:" + mobileMenuButtonImg.src);
            mobileMenuButtonImg.src = openMobileMenuIcon;
        }
    });

  const dropdownCategories = document.querySelectorAll(".category__dropdown");
  const categories = document.querySelectorAll(".category, .subcategory, .category__dropdown");

  // Открытие и закрытие подкатегорий при клике
  dropdownCategories.forEach((category) => {
    category.addEventListener("click", function (event) {
      event.stopPropagation(); // Останавливаем всплытие события
      const subcategoriesMenu = category.querySelector(".subcategoriesMenu");

      if (subcategoriesMenu.style.display === "block") {
        subcategoriesMenu.style.display = "none";
        category.classList.remove("open");
      } else {
        document.querySelectorAll(".subcategoriesMenu").forEach((menu) => {
          menu.style.display = "none";
          menu.parentElement.classList.remove("open");
        });
        
        subcategoriesMenu.style.display = "block";
        category.classList.add("open");
      }
    });
  });

  // Клик на обычную категорию или подкатегорию для перехода по URL и выделения
  categories.forEach((category) => {
    category.addEventListener("click", function () {
      // Проверяем, имеет ли категория подкатегории
      if (!category.classList.contains("category__dropdown")) {
        const categoryName = category.textContent.trim();

        // Сохраняем выбранную категорию
        setSelectedCategory(categoryName);

        // Переход на URL с категорией
        const slug = category.getAttribute("data-slug");
        if (slug) {
          window.location.href = `/home/category/${slug}`;
        }
      }
    });
  });

  const mobileDropdownCategories = document.querySelectorAll(".mobileCategory__dropdown");
  const mobileCategories = document.querySelectorAll(".mobileCategory, .mobileSubcategory, .mobileCategory__dropdown");

  // Открытие и закрытие подкатегорий на мобильном разрешении при клике
  mobileDropdownCategories.forEach((mobileCategory) => {
    mobileCategory.addEventListener("click", function (event) {
      event.stopPropagation(); // Останавливаем всплытие события
      const mobileSubcategoriesMenu = mobileCategory.querySelector(".mobileSubcategoriesMenu");

      if (mobileSubcategoriesMenu.style.display === "flex") {
        document.querySelectorAll(".mobileSubcategoriesMenu").forEach((menu) => {
          menu.style.display = "none";
          menu.parentElement.classList.remove("open");
        });
      } else {
        document.querySelectorAll(".mobileSubcategoriesMenu").forEach((menu) => {
          menu.style.display = "flex";
          menu.parentElement.classList.add("open");
        });
      }
    });
  });

  // Клик на обычную категорию или подкатегорию на мобильном разрешении для перехода по URL и выделения
  mobileCategories.forEach((mobileCategory) => {
    mobileCategory.addEventListener("click", function () {
      // Проверяем, имеет ли категория подкатегории
      if (!mobileCategory.classList.contains("mobileCategory__dropdown")) {
        const mobileCategoryName = mobileCategory.textContent.trim();

        // Сохраняем выбранную категорию
        setSelectedCategory(mobileCategoryName);

        // Переход на URL с категорией
        const slug = mobileCategory.getAttribute("data-slug");
        if (slug) {
          window.location.href = `/home/category/${slug}`;
        }
      }
    });
  });

  renderPagination();
});
