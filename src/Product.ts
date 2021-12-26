import FinancialAsset from "./FinancialAsset";

export default class Product {
    private financialAsset: FinancialAsset;
    private desiredAllocation: number;
    private currentAllocation: number;

    public constructor({ financialAsset, desiredAllocation, currentAllocation }: { financialAsset: FinancialAsset; desiredAllocation: number; currentAllocation: number }) {
        this.financialAsset = financialAsset;
        this.desiredAllocation = desiredAllocation;
        this.currentAllocation = currentAllocation;
    }

    public getFinancialAsset(): FinancialAsset {
        return this.financialAsset;
    }

    public setFinancialAsset(financialAsset: FinancialAsset): void {
        this.financialAsset = financialAsset;
    }

    public getDesiredAllocation(): number {
        return this.desiredAllocation;
    }

    public setDesiredAllocation(desiredAllocation: number): void {
        this.desiredAllocation = desiredAllocation;
    }

    public getCurrentAllocation(): number {
        return this.currentAllocation;
    }

    public setCurrentAllocation(currentAllocation: number): void {
        this.currentAllocation = currentAllocation;
    }
}