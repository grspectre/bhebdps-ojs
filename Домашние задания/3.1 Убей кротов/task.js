function addClickListener(event) {
    let id = '#lost';
    if (this.classList.contains('hole_has-mole')) {
        id = '#dead';
    }
    this.classList.remove('hole_has-mole');
    document.querySelector(id).textContent = (parseInt(document.querySelector(id).textContent) + 1).toString();
    if (parseInt(document.querySelector('#lost').textContent) === 5) {
        endGame();
    }
}

function endGame() {
    let score = document.querySelector('#dead').textContent;
    document.querySelector('#dead').textContent = '0';
    document.querySelector('#lost').textContent = '0';
    alert('Вы проиграли! Ваш счет ' + score + '!');

}

onload = (event) => {
    document.querySelectorAll('.hole').forEach((el) => {
        el.addEventListener('click', addClickListener);
    });
};