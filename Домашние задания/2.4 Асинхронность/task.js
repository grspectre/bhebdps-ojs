class AlarmClock {
    alarmCollection;
    intervalId;

    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback) {
        if (typeof time !== 'string' || typeof callback !== 'function' || time.search(/\d{2}:\d{2}/) !== 0) {
            throw new Error('Отсутствуют обязательные аргументы');
        }
        for (let item in this.alarmCollection) {
            if (item.time === time) {
                console.warn('Уже присутствует звонок на это же время');
                break
            }
        }
        this.alarmCollection.push({
            'callback': callback,
            'time': time,
            'canCall': true,
        });
    }

    removeClock(time) {
        if (typeof time !== 'string' || time.search(/\d{2}:\d{2}/) !== 0) {
            throw new Error('Отсутствуют обязательные аргументы');
        }
        this.alarmCollection = this.alarmCollection.filter((item) => time !== item.time);
    }

    getCurrentFormattedTime() {
        let d = new Date();
        let h = d.getHours().toString().padStart(2, '0');
        let m = d.getMinutes().toString().padStart(2, '0');
        return h+':'+m;
    }

    start() {
        if (this.intervalId !== null) {
            return;
        }
        this.intervalId = setInterval(() => {
            this.alarmCollection.forEach((item) => {
                if (item.time === this.getCurrentFormattedTime() && item.canCall) {
                    item.callback();
                    item.canCall = false;
                }
            });
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    resetAllCalls() {
        this.alarmCollection.forEach((item) => {
            item.canCall = true;
        });
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}