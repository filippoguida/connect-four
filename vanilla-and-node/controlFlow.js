//Ex 1
function logType(arg) {
    if (arg === undefined) {
        console.log("undefined!");
    } else if (arg === null) {
        console.log("null!");
    } else if (Number.isNaN(arg)) {
        console.log("not a number!");
    } else if (typeof arg == "number") {
        console.log("number!");
    } else if (typeof arg == "string") {
        console.log("string!");
    } else if (typeof arg == "boolean") {
        console.log("boolean!");
    } else if (typeof arg == "function") {
        console.log("function!");
    } else if (Array.isArray(arg)) {
        console.log("array!");
    } else if (typeof arg == "object") {
        console.log("object!");
    } else {
        //it will never happen
        console.log("I have no idea!");
    }
}

logType(undefined);
logType(null);
logType(false);
logType(0);
logType(NaN);
logType("stringa slacciata");
logType(function dummy() {});
logType({});
logType([]);

//-----
//Ex 2
var a = {
    Berlin: "Germany",
    Paris: "France",
    "New York": "USA"
};

var b = {};
for (var prop in a) {
    b[a[prop]] = prop;
}
console.log(b);

//-----
//Ex 3
var i = 10;
while (i > 0) {
    console.log(i);
    i--;
}

for (i = 10; i > 0; i--) {
    console.log(i);
}
