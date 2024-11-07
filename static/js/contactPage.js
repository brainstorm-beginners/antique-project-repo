function checkScrollPosition() {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  const footer = document.querySelector('footer');
  const isLargeScreen = window.innerWidth > 768;

  console.log(scrollPosition, documentHeight)

  if (isLargeScreen || scrollPosition + 1 >= documentHeight) {
    footer.style.visibility = 'visible';  
    footer.style.height = '40px';         
    footer.style.opacity = '1';          
  } else {
    footer.style.visibility = 'hidden';   
    footer.style.height = '0px';         
    footer.style.opacity = '0';         
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.querySelector('.mobileMenu');
  const mobileMenuButtonIcon = document.querySelector('.mobileMenuButtonIcon');
  const menuIcon = '../static/icons/menuIconLightGrey.png';
  const closeIcon = '../static/icons/closeMobileMenuIcon.png';

  window.addEventListener('scroll', checkScrollPosition);
  window.addEventListener('resize', checkScrollPosition);

  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
    mobileMenuButtonIcon.src = mobileMenuButtonIcon.src.includes('menuIconLightGrey.png') ? closeIcon : menuIcon;
  });

  window.addEventListener("DOMContentLoaded", async () => {
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
  });

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
      map.addChild(new YMapDefaultFeaturesLayer());

      const markerElement = document.createElement('div');
      markerElement.className = 'marker-class';

      const image = document.createElement('img');
      image.src = '/static/icons/map-marker-alt.svg';
      image.alt = 'Marker Icon';
      image.style.width = '48px'; 
      image.style.height = '48px';
      image.style.transform = 'translate(-50%, -100%)';

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
