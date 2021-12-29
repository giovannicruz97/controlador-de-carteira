import FinancialAsset from "./FinancialAsset";

export default class Product {
    private financialAsset: FinancialAsset;
    private desiredAllocationPercentage: number;
    private currentQuantity: number;

    public constructor({ financialAsset, desiredAllocationPercentage, currentQuantity }: { financialAsset: FinancialAsset; desiredAllocationPercentage: number; currentQuantity: number }) {
        this.financialAsset = financialAsset;
        this.desiredAllocationPercentage = desiredAllocationPercentage;
        this.currentQuantity = currentQuantity;
    }

    public getFinancialAsset(): FinancialAsset {
        return this.financialAsset;
    }

    public setFinancialAsset(financialAsset: FinancialAsset): void {
        this.financialAsset = financialAsset;
    }

    public getdesiredAllocationPercentage(): number {
        return this.desiredAllocationPercentage;
    }

    public setdesiredAllocationPercentage(desiredAllocationPercentage: number): void {
        this.desiredAllocationPercentage = desiredAllocationPercentage;
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