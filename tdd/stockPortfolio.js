
// StockPortfolio class
// - list of ticker symbols (stock names)
// - list of number of shares for each ticker symbol

class stockPortfolio {
    constructor() {
        this.tickerSymbols = [];
        this.numberOfShares = [];
    }

    purchaseStock(symbol, shares) {
        if (shares <= 0) {
            throw new Error('Number of shares must be positive');
        }
        const index = this.tickerSymbols.indexOf(symbol);
        if (index === -1) {
            this.tickerSymbols.push(symbol);
            this.numberOfShares.push(shares);
        } else {
            this.numberOfShares[index] += shares;
        }
    }

    sellStock(symbol, shares) {
        if (shares < 0) {
            throw new Error('Number of shares to sell must be positive');
        }
        const index = this.tickerSymbols.indexOf(symbol);
        if (index === -1) {
            throw new Error('Symbol not in portfolio');
        }
        if (this.numberOfShares[index] < shares) {
            throw new Error('Not enough shares to sell');
        }
        this.numberOfShares[index] -= shares;
        if (this.numberOfShares[index] === 0) {
            this.tickerSymbols.splice(index, 1);
            this.numberOfShares.splice(index, 1);
        }
    }

    companyCount() {
        return this.tickerSymbols.length;
    }

    shareCount(symbol) {
        const index = this.tickerSymbols.indexOf(symbol);
        if (index === -1) {
            return 0;
        }
        return this.numberOfShares[index];
    }
}

module.exports = { stockPortfolio };