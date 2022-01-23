import { Operation } from './Operation';
import Product from "./Product";
import { Type } from './Type';

export default class Portfolio {
    private products: Product[];
    private totalValue: number;

    public constructor({ products }: { products: Product[] }) {
        this.products = products;
        this.validateProductsTotalPercentage();
        this.totalValue = 0;
        products.forEach(product => this.totalValue += product.getTotalPrice());
    }

    public getTotalValue(): number {
        return this.totalValue;
    }

    public getProducts(): Product[] {
        return this.products;
    }

    public setProducts(products: Product[]): void {
        this.products = products;
    }

    public validateProductsTotalPercentage(): void {
        let totalPercentage = 0;
        this.products.forEach(product => totalPercentage += product.getTargetAllocationPercentage());
        totalPercentage = Math.floor(totalPercentage);
        if (totalPercentage !== 100) throw new Error('The sum of the percentages of the products in the portfolio is greater than 100%')
    }

    public calculateRebalancing({ contribution }: { contribution: number }): { name: string; ticker: string; currentAllocationPercentage: number; targetAllocationPercentage: number; quantity: number; operation: Operation, operationCost: number }[] {
        return this.products
            .map(product => {
                const name = product.getFinancialAsset().getName();
                const ticker = product.getFinancialAsset().getTicker();
                const portfolioTotalValue = this.getTotalValue() + contribution;
                const targetAllocationPercentage = product.getTargetAllocationPercentage();
                const targetAllocationInValue = portfolioTotalValue * (targetAllocationPercentage / 100);
                const financialAssetPrice = product.getFinancialAsset().getPrice();
                const currentQuantity = product.getCurrentQuantity();
                let targetQuantity = targetAllocationInValue / product.getTotalPrice();
                if (currentQuantity === 0) targetQuantity = targetAllocationInValue / financialAssetPrice;
                let quantityNeededToTarget = Math.floor(Math.abs(currentQuantity - targetQuantity));
                if (product.getFinancialAsset().getType() === Type.STOCK_INVESTIMENT_FUND) quantityNeededToTarget = targetAllocationInValue - currentQuantity;
                if (currentQuantity === 0) quantityNeededToTarget = Math.floor(targetQuantity);
                const operationCost = quantityNeededToTarget * financialAssetPrice;
                const currentAllocationPercentage = (product.getTotalPrice() / portfolioTotalValue) * 100;
                const operation = currentAllocationPercentage <= targetAllocationPercentage ? Operation.BUY : Operation.SELL;
                return {
                    name,
                    ticker,
                    targetAllocationPercentage,
                    currentAllocationPercentage,
                    quantity: quantityNeededToTarget,
                    operation,
                    operationCost
                };
            })
            .sort((a, b) => {
                return a.currentAllocationPercentage - b.currentAllocationPercentage;
            });
    }
}