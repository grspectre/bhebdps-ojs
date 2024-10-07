class PrintEditionItem {
    name;
    releaseDate;
    pagesCount;
    type;
    _state;

    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }

    fix() {
        this.state = this.state * 1.5;
    }

    /**
     * @param {integer} value
     */
    set state(value) {
        if (value < 0) {
            value = 0;
        }
        if (value > 100) {
            value = 100;
        }
        this._state = value;
    }

    get state() {
        return this._state;
    }
}

class Book extends PrintEditionItem {
    author;

    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = 'book';
    }
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = 'magazine';
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'novel';
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'fantastic';
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'detective';
    }
}

class Library {
    name;
    books = [];

    constructor(name) {
        this.name = name;
    }

    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
        }
    }

    findBookBy(type, value) {
        for (let idx in this.books) {
            let item = this.books[idx];
            if (item[type] === value) {
                return item;
            }
        }
        return null;
    }

    giveBookByName(name) {
        console.log(this.books);
        for (let idx in this.books) {
            let item = this.books[idx];
            if (item.name === name) {
                console.log(item.name);
                return this.books.splice(idx, idx + 1).pop();
            }
        }
        return null;
    }
}

class Student {
    name;
    marks;

    constructor(name) {
        this.name = name;
        this.marks = {};
    }

    addMark(mark, subject) {
        if (mark < 2 || mark > 5) {
            return;
        }
        if (!(subject in this.marks)) {
            this.marks[subject] = [];
        }
        this.marks[subject].push(mark);
    }

    getAverageBySubject(subject) {
        if (!(subject in this.marks)) {
            return 0;
        }
        return this.marks[subject].reduce(function (sum, value) {
            return sum + value;
        }, 0) / this.marks[subject].length;
    }

    getAverage() {
        let summary = [];
        for (let it of Object.keys(this.marks)) {
            summary.push(...this.marks[it]);
        }
        if (summary.length === 0) {
            return 0;
        }
        return summary.reduce((acc, it) => acc += it, 0)/summary.length;
    }
}