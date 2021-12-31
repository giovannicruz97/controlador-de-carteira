export default class RebalancePortfolioInput {
    public ticker: string;
    public currentQuantity: number;
    public targetAllocationPercentage: number;

    public constructor({ ticker, currentQuantity, targetAllocationPercentage }: { ticker: string; currentQuantity: number; targetAllocationPercentage: number }) {
        this.ticker = ticker;
        this.currentQuantity = currentQuantity;
        this.targetAllocationPercentage = targetAllocationPercentage;
    }
}