// can assume input to div() is always numbers
// and input to containsNumbers() is always a string

const functions = require('./project.js');



test('Testing div -- success', () => {
    const target = 10;
    const result = functions.div(20, 2);
    expect(target).toBe(result);
});

test('Testing div -- failure', () => {
    const target = 10;
    const result = functions.div(21, 2);
    expect(target).not.toBe(result);
});

test('Testing div -- division by zero', () => {
    const target = Infinity;
    const result = functions.div(1, 0);
    expect(target).toBe(result);
});

test('Testing div -- negative numbers', () => {
    const target = -5;
    const result = functions.div(10, -2);
    expect(target).toBe(result);
});

test('Testing div -- floating point numbers', () => {
    const target = 2.5;
    const result = functions.div(5, 2);
    expect(target).toBe(result);
});



test('Testing containsNumbers -- success', () => {
    const target = true;
    const result = functions.containsNumbers("abc123");
    expect(target).toBe(result);
});

test('Testing containsNumbers -- failure', () => {
    const target = false;
    const result = functions.containsNumbers("abcdef");
    expect(target).toBe(result);
});

test('Testing containsNumbers -- only numbers', () => {
    const target = true;
    const result = functions.containsNumbers("123456");
    expect(target).toBe(result);
});

test('Testing containsNumbers -- empty string', () => {
    const target = false;
    const result = functions.containsNumbers("");
    expect(target).toBe(result);
});

test('Testing containsNumbers -- punctuation', () => {
    const target = false;
    const result = functions.containsNumbers("abc!@#");
    expect(target).toBe(result);
});

test('Testing containsNumbers -- spaces', () => {
    const target = false;
    const result = functions.containsNumbers("abc def");
    expect(target).toBe(result);
});

test('Testing containsNumbers -- number at very end', () => {
    const target = true;
    const result = functions.containsNumbers("abcdef1");
    expect(target).toBe(result);
});

test('Testing containsNumbers -- number at very beginning', () => {
    const target = true;
    const result = functions.containsNumbers("1abcdef");
    expect(target).toBe(result);
});