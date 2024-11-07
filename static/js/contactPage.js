function setSelectedCategory(categoryName) {
    localStorage.setItem("selectedCategory", categoryName);
  }
  
  function getSelectedCategory() {
    return localStorage.getItem("selectedCategory");
  }
  
  // Функция выделения выбранной категории
  function highlightSelectedCategory() {
    const selectedCategory = getSelectedCategory();
    const categories = document.querySelectorAll(".category, .subcategory, .category__dropdown");
    categories.forEach((category) => {
      if (category.textContent.trim() === selectedCategory) {
        category.classList.add("selected");
      } else {
        category.classList.remove("selected");
      }
    });
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.querySelector('.mobileMenu');
    const mobileMenuButtonImg = document.querySelector('.mobileMenuButtonIcon');

    // Получаем значения атрибутов data-* из HTML
    const openMobileMenuIcon = mobileMenuButtonImg.getAttribute('data-open-icon');
    const closeMobileMenuIcon = mobileMenuButtonImg.getAttribute('data-close-icon');

    // Изначально устанавливаем иконку как иконку открытого меню
    mobileMenuButtonImg.src = openMobileMenuIcon;

    mobileMenuButton.addEventListener('click', () => {
        // Показываем или скрываем меню
        mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';

        // Переключаем иконку, исходя из текущего состояния меню
        if (mobileMenuButtonImg.src.endsWith(openMobileMenuIcon)) {
            mobileMenuButtonImg.src = closeMobileMenuIcon;
        } else {
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
          const urlCategoryName = categoryName.toLowerCase().replace(" ", "_");
          window.location.href = `/api/v1/${urlCategoryName}`;
        }
      });
    });
  
    // Подсвечиваем выбранную категорию при загрузке страницы
    highlightSelectedCategory();
  });
  

document.addEventListener('DOMContentLoaded', async () => {


    async function initMap() { 
        const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer } = ymaps3;

        await ymaps3.ready;

        const map = new YMap(
            document.getElementById('map'), 
            {
                location: {
                    center: [76.982152, 43.335142],
                    zoom: 17,                         
                }
            }
        );

        map.addChild(new YMapDefaultSchemeLayer());
        map.addChild(new YMapDefaultFeaturesLayer())

        const markerElement = document.createElement('div');
        markerElement.className = 'marker-class';

        const image = document.createElement('img');
        image.src = '/static/icons/map-marker-alt.svg';
        image.alt = 'Marker Icon';
        image.style.width = '48px'; 
        image.style.height = '48px';
        image.style.transform = 'translate(-50%, -100%)'

        markerElement.appendChild(image);

        const marker = new YMapMarker(
        {   
            coordinates: [76.982152, 43.335142],
            draggable: false,
        },
        markerElement
    );

        map.addChild(marker);
    
    }

    await initMap();

    
});