document.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const activeItem = document.querySelector('.pagination .active');
        activeItem.classList.remove('active');
        this.parentElement.classList.add('active');
    });
});