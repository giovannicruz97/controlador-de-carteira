export default class RebalancePortfolioOutput {
    public ticker: string;
    public difference: number;
    public operation: string;

    public constructor({ ticker, difference, operation }: { ticker: string; difference: number; operation: string }) {
        this.ticker = ticker;
        this.difference = difference;
        this.operation = operation;
    }
}