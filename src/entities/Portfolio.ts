import Product from "./Product";

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
        this.products.forEach(product => totalPercentage += product.getdesiredAllocationPercentage());
        if (totalPercentage !== 100) throw new Error('The sum of the percentages of the products in the portfolio is greater than 100%')
    }

    public calculateRebalancing(): { ticker: string; difference: number; operation: string }[] {
        return this.products.map(product => {
            const difference = (product.getTotalPrice() / this.getTotalValue()) * 100;
            const operation = difference > product.getdesiredAllocationPercentage() ? 'sell' : 'buy';
            return { ticker: product.getFinancialAsset().getTicker(), difference, operation };
        });
    }
}