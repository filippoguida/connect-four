const EventEmitter = require("events");

module.exports.Countdown = function Countdown(count) {
    for (let i = count; i >= 0; i--) {
        setTimeout(
            timeLeft => {
                this.emit("secondElapsed", timeLeft);
            },
            (count - i) * 1000,
            i
        );
    }
};
module.exports.Countdown.prototype = EventEmitter.prototype;
