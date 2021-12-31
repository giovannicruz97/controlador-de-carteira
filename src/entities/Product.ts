import FinancialAsset from "./FinancialAsset";

export default class Product {
    private financialAsset: FinancialAsset;
    private targetAllocationPercentage: number;
    private currentQuantity: number;

    public constructor({ financialAsset, targetAllocationPercentage, currentQuantity }: { financialAsset: FinancialAsset; targetAllocationPercentage: number; currentQuantity: number }) {
        this.financialAsset = financialAsset;
        this.targetAllocationPercentage = targetAllocationPercentage;
        this.currentQuantity = currentQuantity;
    }

    public getFinancialAsset(): FinancialAsset {
        return this.financialAsset;
    }

    public setFinancialAsset(financialAsset: FinancialAsset): void {
        this.financialAsset = financialAsset;
    }

    public getTargetAllocationPercentage(): number {
        return this.targetAllocationPercentage;
    }

    public setTargetAllocationPercentage(targetAllocationPercentage: number): void {
        this.targetAllocationPercentage = targetAllocationPercentage;
    }

    public getcurrentQuantity(): number {
        return this.currentQuantity;
    }

    public setcurrentQuantity(currentQuantity: number): void {
        this.currentQuantity = currentQuantity;
    }

    public getTotalPrice(): number {
        return this.getcurrentQuantity() * this.getFinancialAsset().getPrice();
    }
}