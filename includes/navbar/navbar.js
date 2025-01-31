document.addEventListener('DOMContentLoaded', function () {

    class NavbarEffects {
        constructor(element, className) {
            this.element = element;
            this.className = className;
        }

        addActiveClassToCurrentPage() {
            const currentPageLinks = document.querySelectorAll(this.element);

            currentPageLinks.forEach(link => {
                if (link.href === window.location.href) {
                    link.classList.add('is-active');
                    document.title = link.textContent.toUpperCase();
                }
            });
        }

        showHamburgerBar() {
            const bar = document.querySelector(this.element);
            const navbar = document.getElementById('navbar');

            bar.addEventListener('click', () => {
                navbar.classList.toggle('d-none');

            });
        }
    }

    const currentPage = new NavbarEffects('.nav-link', 'is-active');

    currentPage.addActiveClassToCurrentPage();

    const showBurger = new NavbarEffects('#hamb-bar-container');

    showBurger.showHamburgerBar();
});