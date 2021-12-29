export default class RebalancePortfolioInput {
    public ticker: string;
    public currentQuantity: number;
    public desiredAllocationPercentage: number;

    public constructor({ ticker, currentQuantity, desiredAllocationPercentage }: { ticker: string; currentQuantity: number; desiredAllocationPercentage: number }) {
        this.ticker = ticker;
        this.currentQuantity = currentQuantity;
        this.desiredAllocationPercentage = desiredAllocationPercentage;
    }
}