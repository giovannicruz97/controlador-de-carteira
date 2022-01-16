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

    public calculateRebalancing({ contribution }: { contribution: number }): { ticker: string; currentAllocationPercentage: number; targetAllocationPercentage: number; quantity: number; operation: Operation, operationCost: number }[] {
        return this.products
            .map(product => {
                let currentAllocationPercentage = 0;
                if (product.getCurrentQuantity() > 0) currentAllocationPercentage = (product.getTotalPrice() / this.getTotalValue()) * 100;
                const targetAllocationInValueWithContribution = (this.getTotalValue() + contribution) * (product.getTargetAllocationPercentage() / 100);
                let targetQuantity = targetAllocationInValueWithContribution / product.getFinancialAsset().getPrice();
                if (product.getCurrentQuantity() > 0) targetQuantity = targetAllocationInValueWithContribution / product.getTotalPrice();
                let quantityNeededToTarget = Math.abs(Math.floor(product.getCurrentQuantity() - targetQuantity));
                if (product.getFinancialAsset().getType() === Type.STOCK_INVESTIMENT_FUND) quantityNeededToTarget = targetAllocationInValueWithContribution - product.getCurrentQuantity();
                const operation = currentAllocationPercentage > product.getTargetAllocationPercentage() ? Operation.SELL : Operation.BUY;
                const operationCost = quantityNeededToTarget * product.getFinancialAsset().getPrice();
                return { ticker: product.getFinancialAsset().getTicker(), targetAllocationPercentage: product.getTargetAllocationPercentage(), currentAllocationPercentage, quantity: quantityNeededToTarget, operation, operationCost };
            })
            .sort((a, b) => {
                return a.currentAllocationPercentage - b.currentAllocationPercentage;
            });
    }
}