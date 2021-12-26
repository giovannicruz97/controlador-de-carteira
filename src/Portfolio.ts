import Product from "./Product";

export default class Portfolio {
    private products: Product[];
    private totalValue: number;

    public constructor({ products, totalValue }: { products: Product[]; totalValue: number }) {
        this.products = products;
        this.totalValue = totalValue;
    }

    public getTotalValue(): number {
        return this.totalValue;
    }

    public setTotalValue(totalValue: number): void {
        this.totalValue = totalValue;
    }

    public getProducts(): Product[] {
        return this.products;
    }

    public setProducts(products: Product[]): void {
        this.products = products;
    }
}