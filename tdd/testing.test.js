// REFLECTION:
/* I was able to follow the test-first approach for this assignment. 
I've done test-driven development to some extent for previous 
projects, but I've never done it so deliberately and consciously. 
After the first couple iterations of the cycle, it started 
feeling a bit tedious, and so I experimented with trying to write
multiple tests at a time and then implementing them (grouping the
increments). While it saved me a lot of switching back and forth, 
it was harder to remember what I had and hadn't implemented. */


const functions = require('./stockPortfolio.js');

const portfolio = new functions.stockPortfolio();

// Tests to write:
// - create stockPortfolio class
test('Testing stockPortfolio class creation', () => {
    expect(portfolio).toBeInstanceOf(functions.stockPortfolio);
});
// - stockPortfolio instance has empty ticker symbols and number of shares collection
test('Testing stockPortfolio instance has empty ticker symbols and number of shares collection', () => {
    expect(portfolio.tickerSymbols).toEqual([]);
    expect(portfolio.numberOfShares).toEqual([]);
});
// - purchaseStock adds shares to new symbol
test('Testing purchaseStock adds shares to symbol', () => {
    portfolio.purchaseStock('AAPL', 10);
    expect(portfolio.tickerSymbols).toContain('AAPL');
    expect(portfolio.numberOfShares[portfolio.tickerSymbols.indexOf('AAPL')]).toBe(10);
});
// - purchaseStock adds shares to existing symbol
test('Testing purchaseStock adds more shares to existing symbol', () => {
    portfolio.purchaseStock('AAPL', 5);
    expect(portfolio.numberOfShares[portfolio.tickerSymbols.indexOf('AAPL')]).toBe(15);
});
// - can't purchase a negative number of shares
test('Testing purchaseStock does not allow negative number of shares', () => {
    expect(() => {
        portfolio.purchaseStock('AAPL', -5);
    }).toThrow();
});
// - can't purchase zero shares
test('Testing purchaseStock does not allow zero shares', () => {
    expect(() => {
        portfolio.purchaseStock('AAPL', 0);
    }).toThrow();
});
// - sellStock removes shares from symbol
test('Testing sellStock removes shares from symbol', () => {
    portfolio.sellStock('AAPL', 5);
    expect(portfolio.numberOfShares[portfolio.tickerSymbols.indexOf('AAPL')]).toBe(10);
});
// - sellStock throws error if symbol not in portfolio
test('Testing sellStock throws error if symbol not in portfolio', () => {
    expect(() => {
        portfolio.sellStock('GOOGL', 5);
    }).toThrow();
});
// - can't sell a negative number of shares
test('Testing sellStock does not allow negative number of shares', () => {
    expect(() => {
        portfolio.sellStock('AAPL', -5);
    }).toThrow();
});
// - companyCount returns number of unique ticker symbols in portfolio
test('Testing companyCount returns number of unique ticker symbols in portfolio', () => {
    portfolio.purchaseStock('GOOGL', 8);
    expect(portfolio.tickerSymbols.length).toBe(2);
});
// - if all shares of a stock are sold, the stock is removed from the portfolio
test('Testing if all shares of a stock are sold, the stock is removed from the portfolio', () => {
    portfolio.sellStock('AAPL', 10);
    expect(portfolio.tickerSymbols).not.toContain('AAPL');
});
// - shareCount returns number of shares for a given ticker symbol
test('Testing shareCount returns number of shares for a given ticker symbol', () => {
    expect(portfolio.numberOfShares[portfolio.tickerSymbols.indexOf('GOOGL')]).toBe(8);
});
// - shareCount returns zero for a ticker symbol not in the portfolio
test('Testing shareCount returns zero for a ticker symbol not in the portfolio', () => {
    expect(portfolio.tickerSymbols.indexOf('MSFT')).toBe(-1);
});
// - sellStock throws error if not enough shares to sell
test('Testing sellStock throws error if not enough shares to sell', () => {
    expect(() => {
        portfolio.purchaseStock('AAPL', 5);
        portfolio.sellStock('AAPL', 20);
    }).toThrow();
});