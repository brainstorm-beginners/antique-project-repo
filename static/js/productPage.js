document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.getElementById('copyButton');

    if (copyButton) {
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(window.location.href).then(function() {
            });
        });
    }
});


document.addEventListener('DOMContentLoaded', async () => {

            async function initMap() { 
                const { YMap, YMapDefaultSchemeLayer } = ymaps3;

                await ymaps3.ready;

                const map = new YMap(
                    document.getElementById('map'), 
                    {
                        location: {
                            center: [37.588144, 55.733842],
                            zoom: 10                        
                        }
                    }
                );

                map.addChild(new YMapDefaultSchemeLayer());
            }

            await initMap();
});
