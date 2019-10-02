module.exports = function fn(a) {
    if (typeof a === "string") {
        return a
            .split("")
            .reverse()
            .join("");
    } else if (Array.isArray(a)) {
        a.forEach((r, i, a) => (a[i] = fn(r)));
        return a;
    }
    return null;
};
