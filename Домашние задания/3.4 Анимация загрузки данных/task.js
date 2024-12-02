class Currency {
    url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
    currency_key = 'currency';
    loader_id = 'loader';
    loader_active = 'loader_active';

    addToStore(key, data) {
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(data));
    }

    getFromStore(key) {
        let data = localStorage.getItem(key);
        if (data === null) {
            return null;
        }
        return JSON.parse(data);
    }

    setLoader() {
        const el = document.getElementById(this.loader_id);
        if (!el.classList.contains(this.loader_active)) {
            el.classList.add(this.loader_active);
        }
    }

    removeLoader() {
        const el = document.getElementById(this.loader_id);
        if (el.classList.contains(this.loader_active)) {
            el.classList.remove(this.loader_active);
        }
    }

    getRenderedDIV(code, value) {
        let divEl = document.createElement('div');
        divEl.classList.add('item');
        divEl.innerHTML += `<div class="item__code">${code}</div>
        <div class="item__value">${value}</div>
        <div class="item__currency">руб.</div>`;
        return divEl;
    }

    render() {
        let data = this.getFromStore(this.currency_key);
        if (data === null) {
            return;
        }
        const itemsEl = document.querySelector('#items');
        for (let key in data) {
            itemsEl.appendChild(this.getRenderedDIV(data[key].CharCode, data[key].Value));
        }
    }

    getData() {
        this.setLoader();
        const promise = fetch(this.url);
        const self = this;
        promise.then(
            (response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        self.addToStore(self.currency_key, data.response.Valute)
                    });
                    self.render();
                }
                self.removeLoader();
            }, (reason) => {
                self.removeLoader();
            }
        );
    }

      process() {
        this.render(); // render data if exists
        this.getData(); // get new data
    }
}

window.addEventListener('load', function (ev) {
    (new Currency()).process();
});