var x = Math.random() * 999 + 1;

function timesTwo(n) {
    return n * 2;
}

var doubleX = timesTwo(x);

var numbers = [x, doubleX];

for (var i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

var numbers = {};
numbers["y"] = doubleX;
