import Product from "./Product";

export default class Portfolio {
    private products: Product[];
    private totalValue: number;

    public constructor({ products }: { products: Product[] }) {
        this.products = products;
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

    public calculateRebalancing(): { ticker: string; difference: number; operation: string }[] {
        return this.products.map(product => {
            const difference = (product.getTotalPrice() / this.getTotalValue()) * 100;
            const operation = difference > product.getdesiredAllocationPercentage() ? 'sell' : 'buy';
            return { ticker: product.getFinancialAsset().getTicker(), difference, operation };
        });
    }
}