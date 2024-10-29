window.addEventListener("DOMContentLoaded", () => {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.querySelector('.mobileMenu');
    const mobileMenuButtonIcon = document.querySelector('.mobileMenuButtonIcon');
    const menuIcon = '../static/icons/menuIconLightGrey.png';
    const closeIcon = '../static/icons/closeMobileMenuIcon.png';

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';

        if (mobileMenuButtonIcon.src.includes('menuIconLightGrey.png')) {
            mobileMenuButtonIcon.src = closeIcon;
        } else {
            mobileMenuButtonIcon.src = menuIcon;
        }
    });

    document.querySelector(".categoriesList")
  .addEventListener('wheel', function(event) {
    if (event.deltaMode == event.DOM_DELTA_PIXEL) {
      var modifier = 1;
    } else if (event.deltaMode == event.DOM_DELTA_LINE) {
      var modifier = parseInt(getComputedStyle(this).lineHeight);
    } else if (event.deltaMode == event.DOM_DELTA_PAGE) {
      var modifier = this.clientHeight;
    }
    if (event.deltaY != 0) {
      this.scrollLeft += modifier * event.deltaY;
      event.preventDefault();
    }
  });
});
