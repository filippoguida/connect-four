const fn = require('./fn');

test('a string as first argument', () => {
    expect(
        fn('Funky Chicken')
    ).toBe('nekcihC yknuF');
});

test('neither a string nor an array as first argument', () => {
    expect(
        fn(90210)
    ).toBe(null);
});

test('an array as first argument', () => {
    expect(
        fn(['Funky Chicken', 90320])
    ).toEqual([
        'nekcihC yknuF',
        null
    ]);
});
