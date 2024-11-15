window.addEventListener('load', (ev) => {
    document.querySelectorAll('.menu__link').forEach((item) => {
        if (item.closest('li').querySelector('ul.menu_sub')) {
            const subMenu = item.closest('li').querySelector('ul.menu_sub');
            item.addEventListener('click', (ev) => {
                ev.target.closest('ul.menu_main').querySelectorAll('ul.menu_sub.menu_active').forEach((it) => {
                    it.classList.remove('menu_active');
                });
                subMenu.classList.add('menu_active');
                ev.preventDefault();
            })
        }
    });
});
