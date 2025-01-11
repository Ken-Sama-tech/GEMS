document.addEventListener('DOMContentLoaded', function () {

    //add active class to current page link
    const currentPage = {
        addActiveClassToCurrentPage: function () {
            const currentPageLink = document.querySelectorAll('.nav-link');

            currentPageLink.forEach(link => {
                if (link.href === window.location.href) {
                    link.classList.add('active');
                    document.title = link.textContent.toUpperCase();
                }
            });
        }
    }
    currentPage.addActiveClassToCurrentPage();
});