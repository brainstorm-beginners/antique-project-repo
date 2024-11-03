document.addEventListener('DOMContentLoaded', async () => {


    async function initMap() { 
        const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer } = ymaps3;

        await ymaps3.ready;

        const map = new YMap(
            document.getElementById('map'), 
            {
                location: {
                    center: [76.982018, 43.334709],
                    zoom: 14                            
                }
            }
        );

        map.addChild(new YMapDefaultSchemeLayer());
        map.addChild(new YMapDefaultFeaturesLayer())

        const markerElement = document.createElement('div');
        markerElement.className = 'marker-class';

        const image = document.createElement('img');
        image.src = '/static/icons/map-marker-alt.svg'; // Замените на URL вашего изображения
        image.alt = 'Marker Icon'; // Альтернативный текст для изображения
        image.style.width = '64px'; // Устанавливаем ширину изображения
        image.style.height = '64px';

        markerElement.appendChild(image);

        const marker = new YMapMarker(
        {
            coordinates: [76.982018, 43.334709],
            draggable: true,
        },
        markerElement
        );

        map.addChild(marker);
    }

    await initMap();

    
});