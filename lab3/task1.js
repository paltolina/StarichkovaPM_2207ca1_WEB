function counter(n) {
    var intervalId = setInterval(function() {
        console.log(n);
        n--;
        if (n < 0) {
            clearInterval(intervalId);
        }
    }, 1000);
}

function createCounter(n) {
    var counterObj = {
        count: n,
        intervalId: null,
        start: function() {
            var self = this;
            this.intervalId = setInterval(function() {
                console.log(self.count);
                self.count--;
                if (self.count < 0) {
                    clearInterval(self.intervalId);
                }
            }, 1000);
        },
        pause: function() {
            clearInterval(this.intervalId);
        },
        stop: function() {
            clearInterval(this.intervalId);
            this.count = n;
        }
    };
    return counterObj;
}

// Пример использования
counter(5); // Запуск счетчика с числом 5

var myCounter = createCounter(10);
myCounter.start(); // Запуск счетчика с числом 10
setTimeout(function() {
    myCounter.pause(); // Приостановка счетчика
}, 5000);
setTimeout(function() {
    myCounter.start(); // Возобновление счетчика
}, 8000);
setTimeout(function() {
    myCounter.stop(); // Остановка счетчика и сброс числа
}, 12000);
