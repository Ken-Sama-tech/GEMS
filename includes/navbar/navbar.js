document.addEventListener('DOMContentLoaded', function () {

    class AddClassList {
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
    }

    const currentPage = new AddClassList('.nav-link', 'is-active');

    currentPage.addActiveClassToCurrentPage();
});