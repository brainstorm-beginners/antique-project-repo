document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.getElementById('copyButton');

    if (copyButton) {
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(window.location.href).then(function() {
            });
        });
    }
});

function checkScrollPosition() {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  const footer = document.querySelector('footer');
  const isLargeScreen = window.innerWidth > 768;

  // Если экран больше 768px, отображаем футер немедленно
  if (isLargeScreen || scrollPosition >= documentHeight) {
    footer.style.visibility = 'visible';  
    footer.style.height = '40px';         
    footer.style.opacity = '1';          
  } else {
    footer.style.visibility = 'hidden';   
    footer.style.height = '0px';         
    footer.style.opacity = '0';         
  }
}

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

    const slides = document.querySelectorAll('.slide');
    const indicatorsContainer = document.querySelector('.indicators');
    const sliderWrapper = document.querySelector('.sliderWrapper');
    let currentIndex = 0;
    let autoSlide; // Таймер для автоматического слайдшоу
    let autoSlideTimeout; // Таймер для перезапуска автоматического слайдшоу

    // Проверяем, больше ли одного изображения
    if (slides.length > 1) {
        // Очистка предыдущих индикаторов
        indicatorsContainer.innerHTML = '';

        // Создание индикаторов для каждого слайда
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        // Функция перехода к определенному слайду
        function goToSlide(index) {
            slides[currentIndex].classList.remove('active');
            indicatorsContainer.children[currentIndex].classList.remove('active');
            
            currentIndex = index;
            
            slides[currentIndex].classList.add('active');
            indicatorsContainer.children[currentIndex].classList.add('active');
            
            const offset = -currentIndex * 100;
            sliderWrapper.style.transform = `translateX(${offset}%)`;
        }

        // Функция автоматического переключения слайдов
        function startAutoSlide() {
            autoSlide = setInterval(() => {
                let nextIndex = (currentIndex + 1) % slides.length;
                goToSlide(nextIndex);
            }, 3000);
        }

        // Функция для перезапуска автоматического слайдшоу
        function restartAutoSlide() {
            clearInterval(autoSlide);
            clearTimeout(autoSlideTimeout);

            autoSlideTimeout = setTimeout(() => {
                startAutoSlide();
            }, 5000); // Перезапускаем авто-слайд через 5 секунд
        }

        // Запускаем автопереключение
        startAutoSlide();

        // Добавляем стрелки для ручного управления
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');

        prevButton.innerHTML = '←';
        nextButton.innerHTML = '→';

        prevButton.classList.add('sliderButton', 'prevButton');
        nextButton.classList.add('sliderButton', 'nextButton');

        prevButton.addEventListener('click', () => {
            goToSlide((currentIndex - 1 + slides.length) % slides.length);
            restartAutoSlide();  // Перезапускаем таймер авто-слайдшоу
        });

        nextButton.addEventListener('click', () => {
            goToSlide((currentIndex + 1) % slides.length);
            restartAutoSlide();  // Перезапускаем таймер авто-слайдшоу
        });

        document.querySelector('.sliderContainer').appendChild(prevButton);
        document.querySelector('.sliderContainer').appendChild(nextButton);

    } else {
        // Если только одно изображение, скрываем индикаторы и кнопки
        indicatorsContainer.style.display = 'none';
    }

    window.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);
    
    document.querySelectorAll('.socialNetworkList__item img').forEach(item => {
      item.addEventListener('click', event => {
          // Получаем данные о социальной сети и URL
          const network = event.currentTarget.getAttribute('data-network');
          const url = window.location.href;  // Текущий URL страницы
  
          // Вызываем функцию для нужной сети
          redirectToNetwork(network, url, productName);
      });
  });
  
  function redirectToNetwork(network, url, productName) {
      let shareUrl = '';
      
      switch (network) {
          case 'telegram':
              shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=Хочу%20поделиться%20товаром%20${encodeURIComponent(productName)}`;
              break;
          case 'vk':
              shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}`;
              break;
          case 'whatsapp':
              shareUrl = `https://wa.me/?text=Я%20хочу%20заказать%20товар%20%22${encodeURIComponent(productName)}%22.%20Вот%20ссылка%20на%20продукт%3A%20${encodeURIComponent(url)}`;
              break;
          case 'instagram':
              shareUrl = 'https://www.instagram.com/retro_antikvariat_almaty/?igsh=ZGM0YXQ0MTVrM3B6'; // Instagram делится по другому
              break;
          default:
              return;
      }
      
      // Перенаправляем на нужную страницу
      window.location.href = shareUrl;
  }  
    
    const mapIcon = document.querySelector('[data-map="true"]');
    const mapMenu = document.createElement('div');
    let closeTimeout;

    mapMenu.classList.add('mapMenu');
    mapMenu.innerHTML = `
        <a href="https://2gis.kz/" target="_blank">2GIS</a>
        <a href="https://yandex.kz/maps/" target="_blank">Яндекс Карты</a>
    `;

    document.body.appendChild(mapMenu);

    // Функция для запуска таймера на автоматическое закрытие
    function startCloseTimeout() {
        closeTimeout = setTimeout(() => {
            mapMenu.classList.remove('visible');
        }, 2000); // 2 секунды неактивности
    }

    // Функция для сброса таймера
    function resetCloseTimeout() {
        clearTimeout(closeTimeout);
        startCloseTimeout();
    }

    // Позиционируем меню над иконкой карты при клике и центрируем
    mapIcon.addEventListener('click', (event) => {
        event.preventDefault();

        // Показываем или скрываем меню
        mapMenu.classList.toggle('visible');

        // Позиционируем меню над иконкой карты с отступом
        const iconRect = mapIcon.getBoundingClientRect();
        mapMenu.style.left = `${iconRect.left + window.scrollX + iconRect.width / 2}px`;
        mapMenu.style.top = `${iconRect.top + window.scrollY - mapMenu.offsetHeight - 5}px`; // -5 для добавления отступа от иконки карты

        // Сброс таймера на закрытие при каждом открытии
        clearTimeout(closeTimeout);
        startCloseTimeout();
    });

    // Закрытие меню при клике за его пределами
    document.addEventListener('click', (event) => {
        if (!mapMenu.contains(event.target) && !mapIcon.contains(event.target)) {
            mapMenu.classList.remove('visible');
            clearTimeout(closeTimeout); // Сбрасываем таймер при ручном закрытии
        }
    });

    // Автоматическое закрытие меню при уходе курсора
    mapMenu.addEventListener('mouseleave', startCloseTimeout);

    // Останавливаем таймер, если пользователь вернулся на меню
    mapMenu.addEventListener('mouseenter', () => {
        clearTimeout(closeTimeout);
    });
  });
  