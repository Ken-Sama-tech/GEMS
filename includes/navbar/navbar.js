document.addEventListener('DOMContentLoaded', function () {

    class Navbar {
        constructor(element, className) {
            this.element = element;
            this.className = className;
        }

        addActiveClassToCurrentPage() {
            const currentPageLinks = document.querySelectorAll('.nav-link');

            currentPageLinks.forEach(link => {
                if (link.href === window.location.href) {
                    link.classList.add(this.className);
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

    const currentPage = new Navbar('.nav-link', 'is-active');
    currentPage.addActiveClassToCurrentPage();

    const showBurger = new Navbar('#hamb-bar-container');
    showBurger.showHamburgerBar(() => {
        console.log(this.className)

    });
});