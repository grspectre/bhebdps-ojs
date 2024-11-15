function extractPropertiesFromEl(el) {
    const defColor = '#000';
    const defSpeed = 1000;
    let color = el.dataset.color === undefined?defColor:el.dataset.color;
    let speed = el.dataset.speed === undefined?defSpeed:el.dataset.speed;
    return {'color': color, 'speed': parseInt(speed)};
}

function rotateAdv(el) {
    const activeClass = 'rotator__case_active';
    let it = el.querySelector("."+activeClass);
    if (it === null) {
        it = el.querySelector(':nth-child(1)');
        if (it === null) {
            return;
        }
        it.classList.add(activeClass);
    } else {
        let idx = Array.from(el.children).indexOf(it);
        it.classList.remove(activeClass);
        let sel = ':nth-child('+(idx + 2)+')';
        it = el.querySelector(sel);
        if (it === null) {
            it = el.querySelector(':nth-child(1)');
        }
        it.classList.add(activeClass);
    }

    let props = extractPropertiesFromEl(it);
    it.style.color = props.color;
    clearTimeout(el.timerId);
    el.timerId = setTimeout(rotateAdv, props.speed, el);
}

window.addEventListener('load', (ev) => {
    document.querySelectorAll('.rotator').forEach((item) => {
        rotateAdv(item);
    });
});
