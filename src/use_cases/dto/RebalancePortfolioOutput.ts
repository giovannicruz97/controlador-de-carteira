export default class RebalancePortfolioOutput {
    public ticker: string;
    public currentAllocationPercentage: number;
    public targetAllocationPercentage: number;
    public operation: string;
    public quantity: number;

    public constructor({ ticker, currentAllocationPercentage, targetAllocationPercentage, operation, quantity }: { ticker: string; currentAllocationPercentage: number; targetAllocationPercentage: number; operation: string; quantity: number; }) {
        this.ticker = ticker;
        this.currentAllocationPercentage = currentAllocationPercentage;
        this.operation = operation;
        this.targetAllocationPercentage = targetAllocationPercentage;
        this.quantity = quantity;
    }
}