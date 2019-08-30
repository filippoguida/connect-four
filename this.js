//Ex 1
function Rectangle(w, h) {
    this.w = w;
    this.h = h;
}
Rectangle.prototype.getArea = function() {
    return this.w * this.h;
};

function Square(n) {
    Rectangle.call(this, n, n);
}
Square.prototype.getArea = Rectangle.prototype.getArea;

var square = new Square(4);
square.getArea(); //16

var rect = new Rectangle(4, 5);
rect.getArea(); //20

//-
//Ex2
function invertCase(str) {
    var newStr = "";
    for (var i = 0; i < str.length; i++) {
        if (str[i] == str[i].toUpperCase()) {
            newStr += str[i].toLowerCase();
        } else {
            newStr += str[i].toUpperCase();
        }
    }
    return newStr;
}

var s = invertCase("Hello World!");
console.log(s);

//-
//Ex 3
function Countdown(n) {
    this.start = function() {
        if (n < 0) {
            return;
        } else {
            var self = this;
            setTimeout(function() {
                console.log(n);
                n--;
                self.start();
            }, 1000);
        }
    };
}

var countdown = new Countdown(5);
countdown.start();
