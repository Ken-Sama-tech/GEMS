document.addEventListener('DOMContentLoaded', function () {

    class CurrentPage {
        constructor(navLinkSelector) {
            this.navLinkSelector = navLinkSelector;
        }

        addActiveClassToCurrentPage() {
            const currentPageLinks = document.querySelectorAll(this.navLinkSelector);

            currentPageLinks.forEach(link => {
                if (link.href === window.location.href) {
                    link.classList.add('active');
                    document.title = link.textContent.toUpperCase();
                }
            });
        }
    }

    const currentPage = new CurrentPage('.nav-link');

    currentPage.addActiveClassToCurrentPage();
});