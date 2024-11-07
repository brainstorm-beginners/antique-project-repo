window.addEventListener("DOMContentLoaded", async () => {
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.querySelector('.mobileMenu');
  const mobileMenuButtonIcon = document.querySelector('.mobileMenuButtonIcon');
  const menuIcon = '../static/icons/menuIconLightGrey.png';
  const closeIcon = '../static/icons/closeMobileMenuIcon.png';

  mobileMenuButton.addEventListener('click', () => {
      mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
      mobileMenuButtonIcon.src = mobileMenuButtonIcon.src.includes('menuIconLightGrey.png') ? closeIcon : menuIcon;
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
