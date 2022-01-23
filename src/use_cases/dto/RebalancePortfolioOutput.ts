export default class RebalancePortfolioOutput {
    public name: string;
    public ticker: string;
    public currentAllocationPercentage: number;
    public targetAllocationPercentage: number;
    public operation: string;
    public quantity: number;
    public operationCost: number;

    public constructor({ name, ticker, currentAllocationPercentage, targetAllocationPercentage, operation, quantity, operationCost }: { name: string; ticker: string; currentAllocationPercentage: number; targetAllocationPercentage: number; operation: string; quantity: number; operationCost: number }) {
        this.name = name;
        this.ticker = ticker;
        this.currentAllocationPercentage = currentAllocationPercentage;
        this.operation = operation;
        this.targetAllocationPercentage = targetAllocationPercentage;
        this.quantity = quantity;
        this.operationCost = operationCost;
    }
}