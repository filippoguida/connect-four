//Ex 1
function sum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

console.log(sum(5, 10));
console.log(sum(5, 10, 15)); //30;
console.log(sum(5, 10, 15, 100, 200)); //330

//-
//Ex 2
function waitThenRun(func) {
    setTimeout(func, 1500);
}

waitThenRun(function() {
    console.log("Hello!");
}); // logs 'Hello!' 1.5 seconds later

waitThenRun(function() {
    console.log("Goodbye!");
}); // logs 'Goodbye!' 1.5 seconds later

//-
//Ex 3
function fromOneMillion(n) {
    if (n <= 0 || isNaN(n)) {
        return "ERROR";
    } else {
        while (n < 1000000) {
            n *= 10;
        }
        return n;
    }
}

console.log(fromOneMillion(-1));
console.log(fromOneMillion(0));
console.log(fromOneMillion(NaN));
console.log(fromOneMillion(1));
console.log(fromOneMillion(10));
console.log(fromOneMillion(10000000));

//-
//Ex 4
function getTotaler() {
    var sum = 0;
    return function(n) {
        sum += n;
        return sum;
    };
}

var totaler = getTotaler();
console.log(totaler(1)); //1
console.log(totaler(2)); //3
console.log(totaler(5)); //8
