function viewTooltip(ev) {
    ev.preventDefault();
    document
        .querySelectorAll('.tooltip')
        .forEach((it) => {
            it.remove();
        });
    let div = document.createElement('div');
    div.classList
        .add('tooltip', 'tooltip_active')
    ;
    div.style.left = ev.clientX + 'px';
    div.style.top = ev.clientY + 'px';
    div.innerText = ev.currentTarget.getAttribute('title');
    document.querySelector('body').appendChild(div);
    setTimeout(function (el) {
        el.remove();
    }, 2000, div);
}


window.addEventListener('load', () => {
    document
        .querySelectorAll('.has-tooltip')
        .forEach((it) => {
            it.addEventListener('click', viewTooltip);
        });
    ;
});