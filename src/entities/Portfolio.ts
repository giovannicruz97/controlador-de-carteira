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

    public calculateRebalancing({ contribution }: { contribution: number }): { ticker: string; currentAllocationPercentage: number; targetAllocationPercentage: number; quantity: number; operation: Operation }[] {
        return this.products
            .map(product => {
                const currentAllocationPercentage = (product.getTotalPrice() / this.getTotalValue()) * 100;
                const targetAllocationInValueWithContribution = (this.getTotalValue() + contribution) * (product.getTargetAllocationPercentage() / 100);
                const targetQuantity = targetAllocationInValueWithContribution / product.getTotalPrice();
                let quantity = Math.floor(product.getCurrentQuantity() - targetQuantity);
                if (product.getFinancialAsset().getType() === Type.STOCK_INVESTIMENT_FUND) quantity = targetAllocationInValueWithContribution - product.getCurrentQuantity();
                const operation = currentAllocationPercentage > product.getTargetAllocationPercentage() ? Operation.SELL : Operation.BUY;
                return { ticker: product.getFinancialAsset().getTicker(), targetAllocationPercentage: product.getTargetAllocationPercentage(), currentAllocationPercentage, quantity, operation };
            })
            .sort((a, b) => {
                return a.currentAllocationPercentage - b.currentAllocationPercentage;
            });
    }
}