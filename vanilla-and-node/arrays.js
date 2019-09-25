//Ex 1
function each(obj, callback) {
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            callback(obj[i], i);
        }
    } else if (typeof obj == "object") {
        for (var key in obj) {
            callback(obj[key], key);
        }
    }
}

each(
    {
        a: 1,
        b: 2
    },
    function(val, name) {
        console.log("The value of " + name + " is " + val);
    }
); // logs 'the value of a is 1' and 'the value of b is 2'

each(["a", "b"], function(val, idx) {
    console.log("The value of item " + idx + " is " + val);
}); // logs 'the value of item 0 is a' and 'the value of item 1 is b'

//-
//Ex2
function reverseArray(a) {
    var output = [];
    for (var i = a.length; i > 0; i--) {
        output.push(a[i - 1]);
    }
    return output;
}

console.log(reverseArray(["Goofy", "Pippo", "MickeyMouse", "Topolino"]));

//-
//Ex3
function getLessThanZero(a) {
    var output = [];
    for (var i = 0; i < a.length; i++) {
        if (a[i] < 0) {
            output.push(a[i]);
        }
    }
    return output;
}

console.log(getLessThanZero([1, 2, -1, -90, 10])); //[-1, -90]
console.log(getLessThanZero([1, 2])); //[]
